import {
  FIELD_BORDER_STYLE
} from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import Label from 'components/FormComponents/FieldLabel'
import RenderOrNull from 'components/Utils/RenderOrNull'
import Label2 from 'components/FormComponents/FieldLabel/FieldLabel2'
import DatePicker from 'antd/lib/date-picker'

const { MonthPicker } = DatePicker
import locale from 'antd/lib/date-picker/locale/en_US'

const enhance = compose(
  injectSheet({
    wrapper: {},
    fullWidth: {
      width: '100%'
    },
    dateWrap: {
      width: '100%',
      '& .ant-calendar-picker-container': {
        fontFamily: '\'Montserrat\', sans-serif'
      },
      '& .ant-calendar-picker-input': {
        border: FIELD_BORDER_STYLE,
        borderRadius: '4px'
      },
      '& .anticon-calendar:before, .anticon-close-circle:before': {
        content: '""'
      },
      '& .anticon-calendar:after': {
        content: '""'
      },
      '& input': {
        height: '45px'
      }
    },
    errorText: {
      paddingTop: '3px',
      fontSize: '13px',
      color: '#dc6b8a',
      left: '0'
    },
    errorBorder: {
      borderColor: '#fa2279'
    }
  })
)
const dateFormat = 'YYYY/MM'
const DateField = (props) => {
  const {
    input,
    classes,
    label,
    label2,
    required,
    width,
    meta: { error, touched, submitFailed },
    errorText
  } = props
  return (
    <div className={classes.wrapper}>
      <RenderOrNull value={label2}>
        <Label required={required} label={label} />
      </RenderOrNull>
      <RenderOrNull value={label2}>
        <Label2 label={label2} />
      </RenderOrNull>
      <MonthPicker
        month={true}
        value={input.value}
        onChange={input.onChange}
        placeholder="дд/мм/гг"
        format={dateFormat}
        locale={locale}
        className={classes.dateWrap}
      />

      {(error || submitFailed) && touched && <span className={classes.errorText}>{error || errorText}</span>}
    </div>
  )
}

DateField.propTypes = {
  input: PropTypes.object.isRequired,
  classes: PropTypes.object,
  meta: PropTypes.object.isRequired,
  required: PropTypes.bool,
  label: PropTypes.object,
  label2: PropTypes.string,
  width: PropTypes.string,
  errorText: PropTypes.string
}

export default enhance(DateField)
