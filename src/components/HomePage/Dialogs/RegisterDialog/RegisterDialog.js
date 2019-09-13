import React from 'react'
import fp from 'lodash/fp'
import { compose, withHandlers, withState } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { animationStyle } from 'constants/styles'
import { EMP_FORM } from 'constants/backend'
import formValidate from 'helpers/formValidate'
import withHistory from 'helpers/withHistory'
import { normalizePhone } from 'helpers/normalizeNumber'
import { getStateLoading } from 'helpers/get'
import t from 'helpers/translate'
import { applicantRegister, employerRegister } from './actions'
import styles from './styles'
import {
  Checkbox,
  CustomDateField,
  PhoneTextField,
  SearchFieldConfig,
  TextField
} from 'components/FormComponents'
import Dialog from 'components/Dialog'
import T from 'components/T'
import TW from 'components/TW'
import { Button } from 'components/Button'
import Title from 'components/Title'
import Label from 'components/FormComponents/FieldLabel'
import TitleTab from 'components/Title/TitleTab'

const TIMEOUT = 800
const LOGIN_TIME = 100

const mapStateToProps = state => ({
  values: getFormValues('RegisterForm')(state),
  ...getStateLoading('register', 'register', state)
})

const enhance = compose(
  withHistory,
  reduxForm({
    form: 'RegisterForm',
    enableReinitialize: true
  }),
  connect(mapStateToProps, {
    employerRegister,
    applicantRegister,
    formValidate
  }),
  withState('tab', 'setTab', ({ history }) => {
    const historyState = history.location.state
    const stateRegTab = fp.get('regTab', historyState)
    return stateRegTab || 'employer'
  }),
  withHandlers({
    onSubmited: ({ values, tab, ...props }) => () => {
      const isEmployer = tab === 'employer'
      if (isEmployer) {
        return props.employerRegister(values)
          .then(() => props.onSuccessReg(true))
          .then(() => setTimeout(() => props.handleClose(), TIMEOUT))
          .catch(errr => {
            props.setSubmitFailed('RegisterForm', ['title'])
            return props.formValidate('RegisterForm', errr)
          })
      }
      return props.applicantRegister(values)
        .then(() => props.onSuccessReg(true))
        .then(() => setTimeout(() => props.handleClose(), TIMEOUT))
        .catch(errr => {
          return props.formValidate('RegisterForm', errr)
        })
    }
  }),
  injectSheet(styles)
)

const tabs = [
  {
    value: 'employer',
    label: 'register_employer_tab'
  },
  {
    value: 'applicant',
    label: 'register_applicant_tab'
  }
]

const onOpenLogin = (onLogin, onClose) => {
  onLogin()
  setTimeout(onClose, LOGIN_TIME)
}

const RegisterDialog = props => {
  const {
    open,
    handleClose,
    handleSubmit,
    classes,
    registerLoading,
    tab,
    onSubmit,
    onLoginOpen,
    setTab
  } = props

  const isApp = tab === 'applicant'

  const credentials = (
    <React.Fragment>
      <div className={classes.email}>
        <Field
          placeholder={'Email'}
          name={'username'}
          component={TextField}
          required={true}
          label={'Email'}
          autoComplete={'off'}
        />
      </div>
      <div className={classes.field}>
        <TW>
          {lang => (
            <Field
              placeholder={t('register_password', lang)}
              name={'password'}
              component={TextField}
              required={true}
              type={'password'}
              label={t('login_password', lang)}
            />
          )}
        </TW>
      </div>
    </React.Fragment>
  )
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      handleClose={handleClose}
      width={756}>
      <form autoComplete="off" onSubmit={handleSubmit(() => onSubmit(tab))} className={classes.dialogBody}>
        <Title text={'register_title'} isStatic={true} medium={true} margin={'0 0 12px'}/>
        <TitleTab onChange={setTab} type={'medium'} tabs={tabs} value={tab}/>
        {isApp && (
          <div style={animationStyle}>
            <div className={classes.field}>
              <TW>
                {lang => (
                  <Field
                    label={t('register_app_name', lang)}
                    required={true}
                    name={'fullName'}
                    component={TextField}
                  />
                )}
              </TW>
            </div>
            <div className={classes.contacts}>
              <TW>
                {lang => (
                  <React.Fragment>
                    <Field
                      label={t('register_app_birthdate', lang)}
                      required={true}
                      name={'birthdate'}
                      component={CustomDateField}
                    />
                    <Field
                      required={true}
                      label={t('register_app_phone', lang)}
                      name={'phone'}
                      normalize={normalizePhone}
                      component={TextField}
                    />
                  </React.Fragment>
                )}
              </TW>
            </div>
            {credentials}
          </div>
        )}
        {!isApp && (
          <div style={animationStyle}>
            <TW>
              {lang => (
                <div className={classes.organization}>
                  <Label label={t('register_emp_form', lang)}/>
                  <div className={classes.name}>
                    <Field
                      required={true}
                      name={'form'}
                      margin={'0 10px 0 0'}
                      isStatic={true}
                      items={EMP_FORM}
                      component={SearchFieldConfig}
                      width={'124px'}
                    />
                    <Field
                      name={'title'}
                      placeholder={t('register_emp_title', lang)}
                      component={TextField}
                      width={'436px'}
                    />
                  </div>
                </div>
              )}
            </TW>

            <div>
              <TW>
                {lang => (
                  <Field
                    name={'isRecruiter'}
                    className={classes.itemMargin}
                    component={Checkbox}
                    required={true}
                    label={t('register_emp_recruiter', lang)}
                  />
                )}
              </TW>
            </div>

            <TW>
              {lang => (
                <div className={classes.contacts}>
                  <Field
                    name={'contactPerson'}
                    component={TextField}
                    placeholder={t('main_full_name', lang)}
                    required={true}
                    label={t('register_emp_contact_person', lang)}
                  />
                  <Field
                    name={'phone'}
                    component={PhoneTextField}
                    required={true}
                    normalize={normalizePhone}
                    label={t('register_emp_contact_number', lang)}
                  />
                </div>
              )}
            </TW>
            {credentials}
          </div>
        )}
        <div className={classes.field}>
          <Button
            submitType={'submit'}
            type={'medium'}
            loading={registerLoading}
            text={'register_button'}
            fullWidth
          />
        </div>
        <div className={classes.policy}>
          <TW>{lang => t('register_terms_of_use', lang)}</TW>
        </div>
        <div className={classes.signUp}>
          <T>register_have_account_button</T> <span onClick={() => onOpenLogin(onLoginOpen, handleClose)}><T>menu_signin</T></span>
        </div>
      </form>
    </Dialog>
  )
}

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  loading: PropTypes.bool,
  registerLoading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLoginOpen: PropTypes.func.isRequired
}

export default enhance(RegisterDialog)
