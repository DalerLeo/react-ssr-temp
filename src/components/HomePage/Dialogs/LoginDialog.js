import React, { useState } from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import {
  fallbacksStyle,
  crossBrowserify,
  BLACK_COLOR,
  MAIN_COLOR, COLOR_RED
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import t from 'helpers/translate'
import Dialog from 'components/Dialog'
import { Button } from 'components/Button'
import { TextField, Checkbox } from 'components/FormComponents'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'

const enhance = compose(
  reduxForm({
    form: 'LoginForm',
    enableReinitialize: true
  }),

  injectSheet({
    dialog: {
      '& .ant-modal-body': {
        background: hexToRgb('#F6F7F9', '0.6')
      }
    },
    dialogBody: {
      margin: 'auto',
      lineHeight: '1',
      padding: '50px 100px 35px'
    },

    field: {
      marginTop: '30px',
      '&:last-child': {
        //        MarginBottom: '0'
      }
    },

    label: {
      color: hexToRgb(BLACK_COLOR, '0.95'),
      fontSize: '12px',
      marginBottom: '13px'
    },

    actionButtons: {
      fontSize: '16px'
    },

    loginButton: {
      fontSize: '12px',
      fontWeight: '500',
      height: '45px',
      marginTop: '40px'
    },
    checkbox: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginTop: '18px'
    },
    forgotPass: {
      color: '#8A8A8A',
      cursor: 'pointer',
      lineHeight: 'normal'
    },
    or: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('alignItems', 'center')
    },
    error: {
      ...crossBrowserify('borderRadius', '4px'),
      background: hexToRgb(COLOR_RED, '0.2'),
      color: COLOR_RED,
      fontSize: '13px',
      fontWeight: '500',
      marginTop: '20px',
      padding: '7px 20px'
    },
    registerButton: {
      fontSize: '14px',
      textAlign: 'center',
      marginTop: '30px',
      '& > a': {
        fontWeight: '500',
        color: MAIN_COLOR,
        fontSize: 'inherit'
      }
    },
    line: {
      height: '1px',
      width: '100%',
      background: '#E0E2E7'
    }
  })
)

const LoginDialog = props => {
  const {
    open,
    handleClose,
    handleSubmit,
    error,
    submitFailed,
    onReset,
    classes,
    loading,
    onLogin,
    onRegisterOpen
  } = props
  const [forgot, setForgot] = useState(false)
  const onSubmit = handleSubmit(() => forgot ? onReset() : onLogin())

  return (
    <Dialog
      open={open}
      className={classes.dialog}
      handleClose={handleClose}
      width={760}>
      <form onSubmit={onSubmit} className={classes.dialogBody}>
        <Title
          isStatic={true}
          medium={true}
          text={forgot ? 'login_reset_pass_title' : 'login_auth_title'}
        />
        {false && (
          <div className={classes.or}>
            <div className={classes.line}/>
            <div style={{ padding: '0 30px' }}>ИЛИ</div>
            <div className={classes.line}/>
          </div>
        )}
        <div className={classes.fields}>
          <div className={classes.field}>
            <Field
              label={'Email'}
              name={'username'}
              component={TextField}
              autoComplete={forgot ? 'off' : 'on'}
            />
          </div>
          {!forgot && (
            <React.Fragment>
              <div className={classes.field}>
                <TW>
                  {lang => (
                    <Field
                      label={t('login_password', lang)}
                      name={'password'}
                      type={'password'}
                      component={TextField}
                      showPassword={true}
                    />
                  )}
                </TW>
              </div>
              {(error && submitFailed) && (
                <div className={classes.error}><T>login_error_text</T></div>
              )}
              <div className={classes.checkbox}>
                <TW>
                  {lang => (
                    <Field
                      name={'remember'}
                      label={t('login_remember', lang)}
                      component={Checkbox}
                    />
                  )}
                </TW>
                <span className={classes.forgotPass} onClick={() => setForgot(true)}>
                  <T>login_forgot_pass</T>
                </span>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className={classes.actionButtons}>
          <Button
            text={forgot ? 'button_send' : 'menu_signin'}
            loading={loading }
            className={classes.loginButton}
            submitType={'submit'}
            fullWidth
          />
          {!forgot &&
          <div className={classes.registerButton}>
            <T>menu_not_registered</T>
            <a onClick={onRegisterOpen}> <T>menu_sign_up</T></a>
          </div>}
        </div>
      </form>
    </Dialog>
  )
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
  classes: PropTypes.object,
  error: PropTypes.any,
  submitFailed: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onRegisterOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default enhance(LoginDialog)
