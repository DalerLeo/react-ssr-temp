import React from 'react'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import SearchFieldConfig from 'components/FormComponents/SearchFieldConfig'
import TextField from 'components/FormComponents/TextField/index'
import Radio from 'components/FormComponents/Radio/index'
import * as API from 'constants/api'
import { Field } from 'redux-form'
import RadioGroup from '../../../components/FormComponents/RadioGroup/index'
import hexToRgb from '../../../helpers/hexToRgb'
import SocialLogin from '../../../components/SocialLogin/SocialLogin'
import { Button } from 'components/Button'
const LABEL_COLOR = '#2d2d2d'
const enhace = compose(
  injectSheet({
    flex: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'baseliine')
    },
    field: {},
    label: {
      fontSize: '15px',
      color: LABEL_COLOR
    },
    upperField: {
      extend: 'flex',
      '& $label': {
        wordSpacing: '1500px',
        marginBottom: '18px'
      },
      '& > div:first-child': {
        width: '135px',
        marginRight: '28px'
      },
      '& > div:last-child': {
        width: 'calc(100% - 163px)'
      }
    },
    radio: {
      marginTop: '18px',
      '& > span:last-child': { paddingLeft: '15px' }
    },
    radioTerms: {
      marginTop: '50px',
      '& > span:last-child': { paddingLeft: '15px' }
    },
    contacts: {
      extend: 'flex',
      '& $label': {
        margin: '24px 0 10px'
      },
      '& > div:first-child': {
        width: '212px',
        marginRight: '43px'
      },
      '& > div:last-child': {
        width: 'calc(100% - 260px)'
      }
    },
    contactLabel: {
      marginTop: '55px',
      fontSize: '17px',
      fontWeigh: '600',
      color: LABEL_COLOR
    },
    bottom: {
      extend: 'flex'
    },
    reg: {
      marginTop: '50px',
      fontSize: '12px',
      color: hexToRgb('#0e0e0e', '0.61')
    },
    social: {
      margin: '0',
      '& > div:last-child': {
        marginTop: '7px'
      }
    },
    regBtn: {
      padding: '10px 29px 10px 38px',
      marginLeft: '54px',
      fontSize: '15px',
      fontWeight: '600',
      height: 'auto'
    },
    phone: {
      ...fallbacksStyle('display', 'flex'),
      '& > div': {
        '&:first-child': {
          width: '53px',
          marginRight: '7px',
          marginBottom: '0'
        },
        '&:nth-child(2)': {
          width: '61px',
          marginRight: '7px'
        },
        '&:last-child': {
          width: 'calc(100% - 128px)'
        }
      }
    }
  }),
)

const UserForm = props => {
  const { classes } = props
  return (
    <div>
      <div className={classes.upperField}>
        <div>
          <div className={classes.label}>Форма организации</div>
          <Field
            name={'field'}
            component={SearchFieldConfig}
            api={API.REGIONS_LIST}
          />
        </div>
        <div>
          <div className={classes.label}>Название организации</div>
          <Field
            name={'field'}
            component={TextField}
            type={'text'}
          />
          <Field name={'isHr'} component={RadioGroup}>
            <Radio className={classes.radio} label={'Кадровое агенство'} value={'yes'}/>
          </Field>
        </div>
      </div>
      <div className={classes.contactLabel}>Контактное лицо</div>
      <div className={classes.contacts}>
        <div>
          <div className={classes.label}>Имя </div>
          <Field
            name={'name'}
            component={TextField}
            type={'text'}
          />
          <div className={classes.label}>Фамилия</div>
          <Field
            name={'secondName'}
            component={TextField}
            type={'text'}

          />
        </div>
        <div>
          <div className={classes.label}>E-mail</div>
          <Field
            name={'email'}
            component={TextField}
            type={'text'}
          />
          <div className={classes.label}>Телефон</div>
          <div className={classes.phone}>
            <Field
              name={'code'}
              component={SearchFieldConfig}
              type={'text'}
            />
            <Field
              name={'isp'}
              component={TextField}
              type={'text'}
            />
            <Field
              name={'phone'}
              component={TextField}
              type={'text'}
            />
          </div>
        </div>
      </div>
      <Field name={'terms'} component={RadioGroup}>
        <Radio className={classes.radioTerms} label={'Условия использования сайта'} value={'yes'}/>
      </Field>
      <div className={classes.reg}>Регистрация с помощью</div>
      <div className={classes.bottom}>
        <SocialLogin className={classes.social}/>
        <Button className={classes.regBtn} text={'Зарегистрировать компанию'}/>
      </div>
    </div>
  )
}

export default enhace(UserForm)
