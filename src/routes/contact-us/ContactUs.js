import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { LINK_COLOR } from 'constants/styles'
import t from 'helpers/translate'
import withHistory from 'helpers/withHistory'
import toast from 'helpers/toast'
import formValidate from 'helpers/formValidate'
import { getStateLoading } from 'helpers/get'
import { sendFeedbackAction } from './actions'
import { Button, GREY } from 'components/Button'
import { TextField, TextAreaField } from 'components/FormComponents'
import Title from 'components/Title'
import Container from 'components/Container'
import T from 'components/T'
import TW from 'components/TW'
import ReCAPTCHA from 'react-google-recaptcha'

const CAPTCHA_SITE_KEY = '6Ldj2KsUAAAAANbRab1PFLtp44wM7TC-8MINrFRs'
const CAPTCHA_TEST_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

const mapStateToProps = state => ({
  formValues: getFormValues('ContactForm')(state),
  ...getStateLoading('feedback', 'feedback', state)
})

const withStyles = compose(
  withHistory,
  connect(mapStateToProps, {
    formValidate,
    sendFeedbackAction
  }),
  reduxForm({
    form: 'ContactForm'
  }),
  withHandlers({
    onSubmit: ({ formValues, ...props }) => () => {
      props.sendFeedbackAction(formValues)
        .then(() => {
          toast({
            title: 'Отправлено',
            message: 'Ваше сообщение отправлено'
          })
        })
        .catch(error => props.formValidate('ContactForm', error))
    }
  }),
  injectSheet({
    wrapper: {
      margin: '55px 0 85px'
    },
    content: {
      maxWidth: '600px',
      width: '100%'
    },
    description: {
      color: LINK_COLOR,
      fontSize: '15px',
      lineHeight: '25px',
      whiteSpace: 'pre-line'
    },
    form: {
      marginTop: '40px',
      '& > div': {
        marginBottom: '40px'
      }
    },
    buttons: {
      textAlign: 'right',
      '& button': {
        minWidth: '180px',
        '&:first-child': {
          marginRight: '20px'
        }
      }
    }
  })
)

const ContactUs = props => {
  const {
    classes,
    history,
    handleSubmit,
    feedbackLoading,
    ...restProps
  } = props

  const [accessGranted, setAccessGranted] = useState(false)

  const onCancel = () => history.goBack()

  const onSubmit = () => {
    if (accessGranted) restProps.onSubmit()
  }

  const onChangeCaptcha = value => {
    if (value) return setAccessGranted(true)
    return setAccessGranted(false)
  }

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.content}>
          <Title isStatic={true} text={'contact_form_title'}/>
          <div className={classes.description}>
            <T>contact_form_description</T>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <TW>
              {lang => (
                <Field
                  name={'fullName'}
                  component={TextField}
                  label={t('contact_form_name', lang)}
                  placeholder={t('contact_form_name_placeholder', lang)}
                  required={true}
                />
              )}
            </TW>
            <TW>
              {lang => (
                <Field
                  name={'email'}
                  component={TextField}
                  label={'Email'}
                  placeholder={t('contact_form_email_placeholder', lang)}
                  required={true}
                />
              )}
            </TW>
            <TW>
              {lang => (
                <Field
                  name={'message'}
                  component={TextAreaField}
                  label={t('contact_form_message', lang)}
                  placeholder={t('contact_form_message_placeholder', lang)}
                  required={true}
                />
              )}
            </TW>
            <ReCAPTCHA
              sitekey={CAPTCHA_TEST_KEY}
              onChange={onChangeCaptcha}
            />
            <div className={classes.buttons}>
              <Button
                type={'medium'}
                text={'button_cancel'}
                color={GREY}
                onClick={onCancel}
              />
              <Button
                type={'medium'}
                text={'button_send'}
                submitType={'submit'}
                disabled={!accessGranted}
                loading={feedbackLoading}
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

ContactUs.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  handleSubmit: PropTypes.func,
  feedbackLoading: PropTypes.bool
}

export default withStyles(ContactUs)
