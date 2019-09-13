import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import CloseIcon from 'react-icons/lib/md/close'
import { Field } from 'redux-form'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import { SOCIAL_LIST } from 'constants/backend'
import t from 'helpers/translate'
import SearchFieldConfig from './SearchFieldConfig'
import TextField from './TextField'
import Label from './FieldLabel/FieldLabel2'

const enhance = compose(
  injectSheet({
    flex: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'baseline')
    },
    contact: {
      marginBottom: '20px',
      position: 'relative',
      extend: 'flex',
      ...crossBrowserify('alignItems', 'center'),
      '&:last-child': {
        marginBottom: '0'
      }
    },
    socialTitle: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between')
    },
    addBtn: {
      cursor: 'pointer',
      color: MAIN_COLOR,
      fontWeight: '500',
      display: 'block',
      textAlign: 'center',
      marginBottom: '15px'
    }
  })
)

const deleteStyle = {
  color: '#B1B9C9',
  marginLeft: '20px',
  width: 'auto',
  cursor: 'pointer'
}

const ContactsArrayField = (props) => {
  const { classes, fields, lang } = props
  const handleTouchTap = () => {
    return fields.push({})
  }

  const onRemove = (index) => fields.remove(index)
  return (
    <React.Fragment>
      <div className={classes.socialTitle}>
        <Label label={t('applicant_alt_communicate', lang)}/>
        <span onClick={handleTouchTap} className={classes.addBtn}>{t('button_simple_add', lang)}</span>
      </div>
      {fields.map((item, index) => {
        return (
          <div key={index} className={classes.contact}>
            <Field
              isStatic={true}
              name={`${item}.key`}
              component={SearchFieldConfig}
              items={SOCIAL_LIST}
              width={'236px'}
              margin={'0 14px 0 0'}
              onlySelect={true}
            />
            <Field
              name={`${item}.name`}
              component={TextField}
              width={'338px'}
            />
            <div onClick={() => onRemove(index)} style={deleteStyle}>
              <CloseIcon style={{ width: '22px', height: '22px' }}/>
            </div>
          </div>
        )
      })}
    </React.Fragment>
  )
}

ContactsArrayField.propTypes = {
  lang: PropTypes.string,
  classes: PropTypes.object,
  fields: PropTypes.object.isRequired
}
export default enhance(ContactsArrayField)
