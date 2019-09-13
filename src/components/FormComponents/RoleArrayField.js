import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import TextField from './TextField'
import SearchFieldConfig from './SearchFieldConfig'
import * as API from '../../constants/api'
import hexToRgb from '../../helpers/hexToRgb'
import { crossBrowserify, fallbacksStyle } from '../../constants/styles'
const LABEL_COLOR = '#2d2d2d'

const enhance = compose(
  injectSheet({
    wrapper: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '15px',
      color: LABEL_COLOR
    },
    flex: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'baseliine')
    },
    role: {
      extend: 'flex',
      '& $label': {
        margin: '24px 0 10px'
      },
      '& > div:first-child': {
        width: 'calc(100% - 200px)',
        marginRight: '28px'
      },
      '& > div:last-child': {
        width: '172px'
      }
    },
    addRole: {
      backgroundColor: '#c2c2c2',
      lineHeight: '37px',
      padding: '0 13px',
      display: 'inline-block',
      marginTop: '17px',
      cursor: 'pointer',
      transition: 'all 300ms',
      '&:hover': {
        backgroundColor: hexToRgb('#c2c2c2', '0.80')
      },
      '& span': {
        verticalAlign: 'sub',
        fontSize: '18px',
        paddingRight: '5px'
      }
    }
  })
)

const RoleArrayField = (props) => {
  const { classes, fields } = props
  const handleTouchTap = () => {
    return fields.push({})
  }
  return (
    <div>
      {fields.map((role, index) => {
        return (
          <div key={index}>
            <div className={classes.role}>
              <div>
                <div className={classes.label}>Название</div>
                <Field
                  name={`${role}.text`}
                  component={TextField}
                  type={'text'}
                />
              </div>
              <div>
                <div className={classes.label}>Роль</div>
                <Field
                  name={`${role}.role`}
                  component={SearchFieldConfig}
                  api={API.REGIONS_LIST}
                />
              </div>
            </div>
          </div>
        )
      })}
      <div
        className={classes.addRole}
        onClick={() => handleTouchTap()}>
        <span>+</span> Добавить роль
      </div>
    </div>
  )
}

export default enhance(RoleArrayField)
