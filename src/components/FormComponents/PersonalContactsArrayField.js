import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import CloseIcon from 'react-icons/lib/md/close'
import { Field } from 'redux-form'
import TextField from './TextField'
import Label from './FieldLabel/FieldLabel2'
import { crossBrowserify, fallbacksStyle, MAIN_COLOR } from '../../constants/styles'

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
      },
      '& > div': {
        width: '50%',
        '&:first-child': {
          marginRight: '15px'
        }
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
const deleteStyle = { color: '#B1B9C9', marginLeft: '20px', width: 'auto', cursor: 'pointer' }
const PersonalContactsArrayField = (props) => {
  const { classes, fields } = props
  const handleTouchTap = () => {
    return fields.push({})
  }

  const onRemove = (index) => fields.remove(index)
  return (
    <React.Fragment>
      <div className={classes.socialTitle}>
        <Label label={'Контактное лицо'}/>
        <span onClick={handleTouchTap} className={classes.addBtn}>Добавить</span>
      </div>
      {fields.map((lang, index) => {
        return (
          <div key={index} className={classes.contact}>
            <Field
              name={`${lang}.name`}
              component={TextField}
              isStatic={true}
            />
            <Field
              name={`${lang}.phone`}
              component={TextField}
              isStatic={true}
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

PersonalContactsArrayField.propTypes = {
  classes: PropTypes.object,
  fields: PropTypes.object.isRequired
}
export default enhance(PersonalContactsArrayField)
