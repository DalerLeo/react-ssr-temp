import loMap from 'lodash/map'
import fp from 'lodash/fp'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { hexToRgb } from 'helpers'
import {
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import t from 'helpers/translate'
import T from 'components/T'
import TW from 'components/TW'
import Container from 'components/Container'
import Title from 'components/Title'
import { Button, GREY } from 'components/Button'
import ApplicantForm from './components/ApplicantForm'
import EmployerForm from './components/EmployerForm'
import ConfirmDelete from './components/ConfirmDelete'
import { TextField } from 'components/FormComponents'

const borderStyle = `1px solid ${hexToRgb('#979797', '0.3')}`
const styles = {
  wrapper: {
    paddingTop: '50px',
    maxWidth: '760px',
    paddingBottom: '75px'
  },
  settingWrap: {
    padding: '30px 80px 0 50px',
    background: '#F9FAFB',
    marginBottom: '20px'
  },
  name: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start'),
    '& > div:last-child': {
      width: 'calc(100% - 124px)'
    }
  },
  fieldOne: {
    marginBottom: '30px'
  },
  field: {
    marginBottom: '30px',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start'),
    '& > div': {
      width: 'calc(50% - 15px)'
    },
    '& > div:first-child': {
      marginRight: '30px',
      marginBottom: '0'
    }
  },
  passwordField: {
    ...crossBrowserify('alignItems', 'baseline')
  },
  birthdate: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between')
  },
  authField: {
    padding: '30px 0 0'
  },
  hint: {
    ...crossBrowserify('alignSelf', 'flex-end'),
    color: LABEL_COLOR,
    fontSize: '13px',
    lineHeight: '1.54',
    marginBottom: '15px'
  },
  actButton: {
    borderTop: borderStyle,
    padding: '30px 0'

    //    TextAlign: 'right'
  },
  picTitle: {
    marginBottom: '16px',
    fontSize: '15px',
    fontWeight: '500'
  },
  contacts: {
    padding: '30px 0',
    borderTop: borderStyle,
    borderBottom: borderStyle
  },
  itemMargin: {
    margin: '10px 0 0 11px'
  },
  managerWrap: {
    extend: 'actButton'
  },
  manager: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },
  managerContact: {
    color: MAIN_COLOR,
    marginTop: '7px'
  },
  line: {
    borderTop: borderStyle
  },
  deleteAccount: {
    cursor: 'pointer',
    color: '#8798ad',
    fontWeight: '500',
    display: 'inline-block',
    marginLeft: '50px'
  }
}

const enhance = compose(
  reduxForm({
    form: 'SettingForm',
    enableReinitialize: true,
    validate: (values) => {
      const error = {}
      const password = fp.get('password', values)
      const passwordConfirm = fp.get('passwordConfirm', values)
      if (password && !passwordConfirm) error.passwordConfirm = 'Это поле обязательно'
      else if (password && password !== passwordConfirm) error.passwordConfirm = 'Пароли не совпадают'
      return error
    }
  }),
  injectSheet(styles)
)

const Setting = ({ isEmployer, ...props }) => {
  const {
    classes,
    formErrors,
    handleSubmit,
    userData,
    history,
    blockUserDialog,
    employerUpdateLoading,
    applicantUpdateLoading
  } = props

  useEffect(() => {
    if (!fp.isEmpty(formErrors)) {
      const currentScrollVal = window.scrollY
      const offsetVal = 200
      const inputsOffsets = loMap(formErrors, (value, field) => {
        const inputElement = fp.first(document.getElementsByName(field))
        return inputElement ? inputElement.getBoundingClientRect().top : null
      })
      const maximalOffset = fp.min(inputsOffsets)
      window.scrollTo({
        top: currentScrollVal + maximalOffset - offsetVal,
        behavior: 'smooth'
      })
    }
  }, [formErrors])

  const authFields = (
    <div className={classes.authField}>
      <Title medium isStatic={true} margin="0 0 15px 0" text='main_auth_data'/>
      <div className={classes.field}>
        <Field
          component={TextField}
          name={'email'}
          label2={'Email'}
        />
        <div className={classes.hint}><T>company_email_hint</T></div>
      </div>
      <TW>
        {lang => (
          <div className={classNames(classes.field, classes.passwordField)}>
            <Field
              component={TextField}
              name={'password'}
              type={'password'}
              label2={t('login_password', lang)}
            />
            <Field
              component={TextField}
              type={'password'}
              name={'passwordConfirm'}
              label2={t('login_password_confirm', lang)}
            />
          </div>
        )}
      </TW>
    </div>
  )

  return (
    <Container>
      <div className={classes.wrapper}>
        <Title isStatic={true} margin={'0 0 20px'} text={'menu_my_settings'}/>
        <form onSubmit={handleSubmit}>
          <div className={classes.settingWrap}>
            {isEmployer
              ? <EmployerForm
                userData={userData}
                classes={classes}
                authFields={authFields}
              />
              : <ApplicantForm
                classes={classes}
                authFields={authFields}
              />}
            <div className={classes.actButton}>
              <Button
                style={{ marginRight: '25px', padding: '0 64px' }}
                text={'button_cancel'}
                type={'medium'}
                bordered={true}
                color={GREY}
                onClick={() => history.goBack()}
              />
              <Button
                style={{ padding: '0 60px' }}
                text={'button_save_changes'}
                type={'medium'}
                submitType={'submit'}
                loading={employerUpdateLoading || applicantUpdateLoading}
              />
            </div>
          </div>
          <div
            className={classes.deleteAccount}
            onClick={blockUserDialog.handleOpen}>
            <span>Удалить аккаунт</span>
          </div>
        </form>
      </div>

      <ConfirmDelete
        open={blockUserDialog.open}
        handleClose={blockUserDialog.handleClose}
        handleSubmit={blockUserDialog.handleSubmit}
      />
    </Container>
  )
}

Setting.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  userData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isEmployer: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  blockUserDialog: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  employerUpdateLoading: PropTypes.bool,
  applicantUpdateLoading: PropTypes.bool
}

export default enhance(Setting)
