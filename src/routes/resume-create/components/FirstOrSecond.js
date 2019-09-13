import React from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
const FIRST = 0
const SECOND = 1
const FirstOrSecond = ({ value, children }) => {
  return children[value ? FIRST : SECOND]
}

FirstOrSecond.propTypes = {
  value: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
}

export default FirstOrSecond
