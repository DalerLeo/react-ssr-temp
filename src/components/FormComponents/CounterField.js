import {
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE,
  MAIN_COLOR,
  ZERO,
  ONE
} from 'constants/styles'
import fp from 'lodash/fp'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Minus from 'icons/Minus'
import Plus from 'icons/Plus'

const MAX_COUNT = 100
const enhance = compose(
  withHandlers({
    handleChange: ({ input }) => ({ target }) => {
      const number = fp.toNumber(target.value)
      if (fp.isNaN(number)) input.onChange(input.value)
      else if (number < MAX_COUNT) {
        if (number === ZERO) input.onChange(ONE)
        else input.onChange(number)
      } else input.onChange(MAX_COUNT)
    },
    onSubstract: ({ input }) => () => {
      const value = fp.toNumber(input.value)
      if (value > ONE) {
        input.onChange(value - ONE)
      }
    },
    onAdd: ({ input }) => () => {
      const value = fp.toNumber(input.value)
      if (value < MAX_COUNT) input.onChange(value + ONE)
    }
  }),
  injectSheet({
    wrapper: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      background: 'white',
      borderRadius: '6px',
      border: FIELD_BORDER_STYLE,
      height: '42px',
      width: '100px'
    },
    controller: {
      ...crossBrowserify('transition', 'all 300ms'),
      color: '#C6CBD4',
      cursor: 'pointer',
      padding: '11px 10px',
      '&:hover': {
        color: MAIN_COLOR
      },
      '& svg': {
        fontSize: '12px'
      }
    },
    input: {
      border: 'none',
      color: '#202124',
      outline: 'none',
      textAlign: 'center',
      height: '100%',
      width: '34px'
    }
  })
)

const CounterField = props => {
  const { classes, className, input, ...defaultProps } = props

  useEffect(() => {
    input.onChange(ONE)
  }, [input])

  return (
    <div className={classNames(classes.wrapper, className)}>
      <nav className={classes.controller} onClick={defaultProps.onSubstract}>
        <Minus />
      </nav>
      <input
        {...input}
        onChange={defaultProps.handleChange}
        className={classes.input}
      />
      <nav className={classes.controller} onClick={defaultProps.onAdd}>
        <Plus />
      </nav>
    </div>
  )
}

CounterField.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  input: PropTypes.object
}

export default enhance(CounterField)
