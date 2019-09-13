import fp from 'lodash/fp'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { Field, change } from 'redux-form'
import { MONTH_LIST } from 'constants/backend'
import { dateObjectFormat } from 'helpers/customDate'
import { Label2, TextField, SearchFieldConfig } from 'components/FormComponents'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'

const parseDateFormat = ({ input, formName, dispatch }) => {
  const inputValue = fp.get('value', input)
  const inputName = fp.get('name', input)
  if (fp.isString(inputValue) && inputValue) {
    const objectDate = dateObjectFormat(inputValue)
    return dispatch(change(formName, inputName, objectDate))
  }
  return null
}

const enhance = compose(
  connect(),
  injectSheet({
    container: {
      ...fallbacksStyle('display', 'flex')
    },
    input: {
      '&:not(:last-child)': {
        marginRight: '10px'
      }
    },
    day: {
      width: '70px'
    },
    month: {
      ...crossBrowserify('flexGrow', '1')
    },
    year: {
      width: '100px'
    }
  })
)

const CustomDateField = props => {
  const { classes, label, input, type, meta, dispatch } = props
  const inputValue = fp.get('value', input)
  const inputName = fp.get('name', input)
  const formName = fp.get('form', meta)

  useEffect(() => {
    parseDateFormat({ input, formName, dispatch })
  }, [inputValue])

  return (
    <div>
      <Label2 label={label}/>
      <div className={classes.container}>
        {type === 'default' &&
        <div className={classNames(classes.input, classes.day)}>
          <Field
            name={`${inputName}.day`}
            component={TextField}
            maxLength={2}
            parse={(value) => {
              const maxDays = 31
              const numberVal = parseInt(value, 10)
              const isNumber = !fp.isNaN(numberVal)
              if (isNumber) {
                if (numberVal > maxDays) return maxDays
                return numberVal
              }
              return ''
            }}
          />
        </div>}
        <div className={classNames(classes.input, classes.month)}>
          <Field
            name={`${inputName}.month`}
            component={SearchFieldConfig}
            placeholder={'Месяц'}
            items={MONTH_LIST}
            isStatic={true}
          />
        </div>
        <div className={classNames(classes.input, classes.year)}>
          <Field
            name={`${inputName}.year`}
            component={TextField}
            placeholder={'Год'}
            maxLength={4}
          />
        </div>
      </div>
    </div>
  )
}

CustomDateField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  dispatch: PropTypes.func,
  type: PropTypes.oneOf(['default', 'month']),
  label: PropTypes.string
}

CustomDateField.defaultProps = {
  type: 'default'
}

export default enhance(CustomDateField)
