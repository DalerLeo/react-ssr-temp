import {
  compose,
  setDisplayName,
  mapPropsStream,
  createEventHandler,
  withState,
  pure
} from 'recompose'
import { connect } from 'react-redux'
import { getFormValues, getFormSubmitErrors } from 'redux-form'
import fp from 'lodash/fp'
import Setting from './Setting'
import * as actionTypes from 'constants/actionTypes'
import { getItemStateData, getStateLoading, isEmployer } from 'helpers/get'
import toast from 'helpers/toast'
import formValidate from 'helpers/formValidate'
import withHistory from 'helpers/withHistory'
import setCookie from 'helpers/setCookie'
import {
  logoutAction,
  userInfoWithTokenFetch
} from 'routes/user/actions'
import {
  applicantUpdateAction,
  employerUpdateAction,
  userBlockAction
} from './actions'

const DAY = 2
const MONTH = 1
const YEAR = 0

const removeTokenFromStore = () => {
  setCookie('token', '')
  return dispatch => {
    dispatch({ type: `${actionTypes.USER_INFO}_CLEAR` })
    dispatch({ type: `${actionTypes.LOGIN}_CLEAR` })
  }
}

const mapDispatchToProps = {
  formValidate,
  applicantUpdateAction,
  employerUpdateAction,
  userInfoWithTokenFetch,
  userBlockAction,
  logoutAction,
  removeTokenFromStore
}

const mapStateToProps = (state) => {
  return {
    ...getItemStateData('user', 'user', state),
    ...getStateLoading('employer.item', 'employerUpdate', state),
    ...getStateLoading('applicant.update', 'applicantUpdate', state),
    formValues: getFormValues('SettingForm')(state),
    formErrors: getFormSubmitErrors('SettingForm')(state)
  }
}

export default compose(
  withHistory,
  withState('openBlockDialog', 'setOpenBlockDialog', false),
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    const { handler: onSubmit, stream: onSubmit$ } = createEventHandler()
    const { handler: onBlockUser, stream: onBlockUser$ } = createEventHandler()

    onSubmit$
      .withLatestFrom(props$)
      .subscribe(([value, props]) => {
        const values = fp.get('formValues', props)
        const id = fp.get('userDetail.data.id', props)
        if (isEmployer((fp.get('userDetail.data', props)))) {
          return props.employerUpdateAction(values, id)
            .then(() => {
              toast()
              props.userInfoWithTokenFetch()
            })
            .catch(errr => {
              return props.formValidate('SettingForm', errr)
            })
        }
        return props.applicantUpdateAction(values, id)
          .then(() => {
            toast()
            props.userInfoWithTokenFetch()
          })
          .catch(errr => {
            return props.formValidate('SettingForm', errr)
          })
      })

    onBlockUser$
      .withLatestFrom(props$)
      .subscribe(([comment, { userData, history, ...props }]) => {
        const userId = fp.get('id', userData)
        const userType = fp.get('userType', userData)
        return props.userBlockAction({ comment, [userType]: userId })
          .then(() => props.removeTokenFromStore())
          .then(() => history.push('/'))
      })

    return props$.combineLatest(props => {
      const {
        userDetail,
        openBlockDialog,
        setOpenBlockDialog
      } = props

      const data = userDetail.data
      const foundationDate = fp.split('-')(fp.get('foundationDate', data))
      const employerInitial = {
        logo: fp.get('logo', data),
        form: fp.get('form', data),
        title: fp.get('title', data),
        isRecruiter: fp.get('isRecruiter', data),
        bankRequisites: fp.get('bankRequisites', data),
        contactPerson: fp.get('contactPerson', data),
        trademark: fp.get('trademark', data),
        industry: fp.get('industry.id', data),
        foundationDate: foundationDate[YEAR],
        staffSize: fp.get('staffSize', data),
        address: fp.get('address', data),
        phone: fp.get('phone', data),
        extraPhone: fp.get('extraPhone', data),
        siteUrl: fp.get('siteUrl', data),
        username: fp.get('username', data),
        description: fp.get('description', data)
      }

      const birthdate = fp.split('-')(fp.get('data.birthdate', userDetail))
      const otherContacts = fp.get('data.otherContacts', userDetail) && fp.flow(
        fp.get('data.otherContacts'),
        JSON.parse
      )(userDetail)

      const initialValues = {
        name: fp.get('data.fullName', userDetail),
        phone: fp.get('data.phone', userDetail),
        extraPhone: fp.get('data.extraPhone', userDetail),
        maritalStatus: fp.get('data.maritalStatus', userDetail),
        livingPlace: fp.get('data.livingPlace.id', userDetail),
        email: fp.get('data.email', userDetail),
        searchWorkStatus: fp.flow(
          fp.get('data.searchWorkStatus.id'),
          fp.toString
        )(userDetail),
        gender: fp.get('data.gender', userDetail),
        photo: fp.get('data.photo', userDetail),
        day: birthdate[DAY],
        month: birthdate[MONTH],
        year: birthdate[YEAR],
        otherContacts
      }

      const blockUserDialog = {
        open: openBlockDialog,
        handleOpen: () => setOpenBlockDialog(true),
        handleClose: () => setOpenBlockDialog(false),
        handleSubmit: onBlockUser
      }
      return {
        ...props,
        initialValues: isEmployer(data) ? employerInitial : initialValues,
        onSubmit,
        isEmployer: isEmployer(data),
        blockUserDialog
      }
    })
  }),
  setDisplayName('SettingContainer'),
  pure
)(Setting)
