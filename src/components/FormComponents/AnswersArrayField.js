import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import CloseIcon from 'react-icons/lib/md/close'
import { Field } from 'redux-form'
import SearchFieldConfig from './SearchFieldConfig'
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
      '& > div:first-child': {
        width: '100%'
      },
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
const deleteStyle = { color: '#B1B9C9', marginLeft: '20px', width: 'auto', cursor: 'pointer' }
const AnswerArrayField = (props) => {
  const { classes, fields } = props
  const handleTouchTap = () => {
    return fields.push('')
  }

  const onRemove = (index) => fields.remove(index)
  return (
    <React.Fragment>
      <div className={classes.socialTitle}>
        <Label label={'Вариант ответа'}/>
        <span onClick={handleTouchTap} className={classes.addBtn}>Добавить</span>
      </div>
      {fields.map((ans, index) => {
        return (
          <div key={index} className={classes.contact}>
            <Field
              name={ans}
              component={TextField}
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

AnswerArrayField.propTypes = {
  classes: PropTypes.object,
  fields: PropTypes.object.isRequired
}
export default enhance(AnswerArrayField)
