import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import injectSheet from 'react-jss'
import {
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import { hexToRgb } from 'helpers'
import t from 'helpers/translate'
import Container from 'components/Container'
import Title from 'components/Title'
import TW from 'components/TW'
import { TextField } from 'components/FormComponents'
import { Button, GREY } from 'components/Button'

const styles = {
  wrapper: {
    paddingTop: '50px',
    maxWidth: '760px',
    paddingBottom: '75px'
  },
  settingWrap: {
    padding: '30px 80px 0 50px',
    background: '#F9FAFB',
    marginBottom: '40px'
  },
  name: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-end'),
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
    ...crossBrowserify('alignItems', 'flex-end'),
    '& > div': {
      width: 'calc(50% - 15px)'
    },
    '& > div:first-child': {
      marginRight: '30px',
      marginBottom: '0'
    }
  },
  birthdate: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between')
  },
  authField: {
    padding: '30px 0 0'
  },
  hint: {
    color: LABEL_COLOR,
    fontSize: '13px',
    linHeight: '1.54'
  },
  actButton: {
    borderTop: `1px solid ${hexToRgb('#979797', '0.29')}`,
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
    borderTop: '1px solid #979797',
    borderBottom: '1px solid #979797'
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
  }

}

const enhance = compose(
  reduxForm({
    form: 'StaffForm',
    enableReinitialize: true
  }),
  injectSheet(styles)
)

const ApplicantForm = enhance(({ classes, lang }) => {
  return (
    <React.Fragment>
      <Title
        medium
        isStatic={true}
        margin="0 0 15px 0"
        text='register_app_personal'
      />
      <div className={classes.field}>
        <Field
          component={TextField}
          name={'fullName'}
          label2={t('main_full_name', lang)}
        />
        <Field
          component={TextField}
          name={'phone'}
          label2={t('register_app_phone', lang)}
        />
      </div>
      <div style={{ marginTop: '26px' }}/>
      <Field
        component={TextField}
        name={'position'}
        label2={t('resume_position_select', lang)}
      />
      <div className={classes.authField}>
        <Title medium isStatic={true} margin="0 0 15px 0" text='main_auth_data'/>
        <div className={classes.field}>
          <Field
            component={TextField}
            name={'email'}
            label2={'Email'}
          />
          <div className={classes.hint}>
            {t('company_email_hint', lang)}
          </div>
        </div>
        <div className={classes.field}>
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
      </div>
    </React.Fragment>
  )
})

const StaffCreate = props => {
  const { classes, handleSubmit, history, isUpdate, initialValues } = props
  return (
    <Container>
      <div className={classes.wrapper}>
        <Title
          isStatic={true}
          text={isUpdate ? 'emp_edit_staff' : 'emp_new_staff'}
          margin={'0 0 20px'}
        />
        <form onSubmit={handleSubmit}>
          <div className={classes.settingWrap}>
            <TW>
              {lang => <ApplicantForm lang={lang} initialValues={initialValues}/>}
            </TW>
            <div className={classes.actButton}>
              <Button
                onClick={() => history.goBack()}
                style={{ marginRight: '25px', padding: '0 64px' }}
                text={'button_cancel'}
                type={'medium'}
                bordered={true}
                color={GREY}
              />
              <Button
                style={{ padding: '0 60px' }}
                text={isUpdate ? 'button_simple_save' : 'button_simple_create'}
                type={'medium'}
                submitType={'submit'}
              />
            </div>
          </div>
        </form>
      </div>
    </Container>
  )
}

StaffCreate.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object.isRequired,
  isUpdate: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isEmployer: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default enhance(StaffCreate)
