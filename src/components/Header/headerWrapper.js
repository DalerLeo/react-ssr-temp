import {
  compose,
  withState,
  lifecycle,
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import { reset, getFormValues } from 'redux-form'
import injectSheet from 'react-jss'
import fp from 'lodash/fp'
import sprintf from 'sprintf'
import { APPLICANT_ITEM_URL, EMPLOYER_ITEM_URL } from 'constants/routes'
import queryToParams from 'helpers/queryToParams'
import setChatDialog from 'helpers/setChatDialog'
import withHistory from 'helpers/withHistory'
import formValidate from 'helpers/formValidate'
import {
  loginAction,
  userInfoFetch,
  logoutAction,
  userResetPassword as resetPassword
} from 'routes/user/actions'
import {
  employerRegister,
  applicantRegister
} from 'components/HomePage/Dialogs/RegisterDialog/actions'
import { setAppLanguageAction } from 'routes/action-common'
import styles from './styles'

const ZERO = 0
const TIMEOUT = 800
const VISIBLE_ON_SCROLLED = 300

const closeHistoryLoginDialog = (history) => {
  const historyStateOpenLogin = fp.get(['location', 'state', 'openLoginDialog'], history)
  if (historyStateOpenLogin) {
    history.replace({
      pathname: history.location.pathname,
      search: history.location.search,
      state: { openLoginDialog: false }
    })
  }
}

export default (headRef) => {
  const listener = () => {
    const doc = document.documentElement
    const top =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || ZERO)
    const onScroll = fp.includes('results', document.location.pathname) || document.location.pathname === '/'
    if (onScroll && headRef.current && top > VISIBLE_ON_SCROLLED) {
      headRef.current.style.opacity = '1'
      headRef.current.style.visibility = 'visible'
    } else if (!onScroll && headRef.current) {
      headRef.current.style.opacity = '1'
      headRef.current.style.visibility = 'visible'
    } else if (headRef.current) {
      headRef.current.style.opacity = '0'
      headRef.current.style.visibility = 'hidden'
    }
  }

  return compose(
    withHistory,
    connect(
      state => {
        return {
          loginForm: fp.get('form.LoginForm.values', state),
          isAuth: fp.get('login.data.token', state) || '',
          userData: fp.get('user.data', state) || {},
          authLoading: fp.get('login.loading', state),
          searchText: fp.get('form.MainSearchForm.values.search', state) || '',
          regValues: getFormValues('RegisterForm')(state)
        }
      },
      {
        formValidate,
        loginAction,
        reset,
        userInfoFetch,
        logoutAction,
        employerRegister,
        applicantRegister,
        resetPassword,
        setChatDialog,
        setAppLanguageAction
      }
    ),
    withState('loginOpen', 'setLoginOpen', false),
    withState('regOpen', 'setRegOpen', false),
    withState('successOpen', 'setSuccessOpen', false),
    mapPropsStream(props$ => {
      const { handler: onLogin, stream: onLogin$ } = createEventHandler()
      const { handler: onRegister, stream: onRegister$ } = createEventHandler()
      const { handler: onLoginOpen, stream: onLoginOpen$ } = createEventHandler()
      const { handler: onLoginClose, stream: onLoginClose$ } = createEventHandler()
      const { handler: onReset, stream: onReset$ } = createEventHandler()
      const { handler: onSearch, stream: onSearch$ } = createEventHandler()

      onSearch$
        .withLatestFrom(props$)
        .subscribe(([value, { history, searchText, ...props }]) => {
          history.replace({
            pathname: '/results',
            search: queryToParams({ type: 'vacancy', text: searchText })
          })
        })

      onLoginOpen$
        .withLatestFrom(props$)
        .subscribe(([value, props]) => {
          props.reset('LoginForm')
          return props.setLoginOpen(true)
        })

      onLoginClose$
        .withLatestFrom(props$)
        .subscribe(([value, props]) => {
          closeHistoryLoginDialog(props.history)
          return props.setLoginOpen(false)
        })

      onLogin$
        .withLatestFrom(props$)
        .subscribe(([val, props]) => {
          const values = fp.get('loginForm', props)
          return props
            .loginAction(values)
            .then(({ value }) => {
              closeHistoryLoginDialog(props.history)
              return props.userInfoFetch(value.token)
            })
            .then(({ value }) => {
              const path = fp.get('username', value)
                ? sprintf(EMPLOYER_ITEM_URL, 'stats')
                : sprintf(APPLICANT_ITEM_URL, 'resume')
              return props.history.push(path)
            })
            .then(() => {
              props.setLoginOpen(false)
            })
            .catch(errr => {
              return props.formValidate('LoginForm', errr)
            })
        })

      onReset$
        .withLatestFrom(props$)
        .subscribe(([val, props]) => {
          const values = fp.get('loginForm.username', props)
          return props
            .resetPassword(values)
            .then(() => props.setSuccessOpen(false))
            .then(() => setTimeout(() => props.setLoginOpen(false), TIMEOUT))
            .catch(errr => {
              return props.formValidate('LoginForm', errr)
            })
        })

      onRegister$
        .withLatestFrom(props$)
        .subscribe(([tab, { regValues, ...props }]) => {
          const isEmployer = tab === 'employer'
          if (isEmployer) {
            return props.employerRegister(regValues)
              .then(() => props.setSuccessOpen(true))
              .then(() => setTimeout(() => props.setRegOpen(false), TIMEOUT))
              .catch(errr => {
                return props.formValidate('RegisterForm', errr)
              })
          }
          return props.applicantRegister(regValues)
            .then(() => props.setSuccessOpen(true))
            .then(() => setTimeout(() => props.setRegOpen(false), TIMEOUT))
            .catch(errr => {
              return props.formValidate('RegisterForm', errr)
            })
        })

      return props$.combineLatest(props => ({
        ...props,
        onRegister,
        onLogin,
        onLoginOpen,
        onLoginClose,
        onReset,
        onSearch
      }))
    }),
    lifecycle({
      componentDidMount () {
        if (typeof window !== 'undefined') window.addEventListener('scroll', listener)
      },
      componentDidUpdate () {
        /* eslint-disable no-undef */
        if (typeof window !== 'undefined') {
          let event = new Event('scroll')
          window.dispatchEvent(event)
        }
      },
      componentWillUnmount () {
        if (typeof window !== 'undefined') window.removeEventListener('scroll', listener)
      }
    }),
    injectSheet(styles)
  )
}
