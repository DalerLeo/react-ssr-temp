import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import Radio from 'antd/lib/radio'
import RadioButton from '../Radio'
import Label from '../FieldLabel/FieldLabel2'

const enhance = compose(
  injectSheet({
    radioGroup: {
      fontFamily: 'inherit',
      width: '100%'
    },

    radio: {
      display: 'block',
      lineHeight: 'normal',
      marginBottom: '18px',
      marginRight: '0',
      marginLeft: '18px',
      '&:last-child': {
        marginBottom: '0'
      }
    }

  })
)

const RadioGroup = ({ input, className, classes, label, block, children, items, ...props }) => {
  if (items) {
    return (
      <React.Fragment>
        <Label label={label}/>
        <Radio.Group
          className={classNames(classes.radioGroup, className)}
          {...input}
          {...props}>
          {loMap(items, item => (
            <RadioButton
              key={item.value || item.id}
              value={item.value || item.id}
              label={item.label || item.name}
              className={block ? classes.radio : ''}
            />
          ))}
        </Radio.Group>
      </React.Fragment>
    )
  }
  return (
    <Radio.Group className={classNames(classes.radioGroup, className)}
      {...input} {...props}>
      <Label label={label}/>
      {children}
    </Radio.Group>
  )
}

RadioGroup.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array,
  block: PropTypes.bool,
  label: PropTypes.string
}

export default enhance(RadioGroup)
