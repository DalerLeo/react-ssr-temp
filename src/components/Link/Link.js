import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import styled, { css } from 'styled-components'
import withHistory from 'helpers/withHistory'

const LinkUI = styled.a`
    &:focus {
      text-decoration: none
    }
    ${props => props.absolute && css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    `}
`
const enhance = compose(
  withHistory
)

const isLeftClickEvent = (event) => {
  return event.button === Number('0')
}

const toString = (to) => {
  return _.isObject(to) ? `${to.pathname}/?${to.search}` : to
}

const isModifiedEvent = (event) => {
  return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

const Link = props => {
  const {
    to,
    history,
    children,
    smooth,
    style,
    ...otherProps
  } = props

  const handleClick = event => {
    if (props.onClick) {
      event.preventDefault()
      return props.onClick(event)
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return null
    }

    if (event.defaultPrevented === true) {
      return null
    }

    event.preventDefault()
    if (smooth) {
      history.push(to, { smooth })
    } else {
      history.push(to)
    }
    return null
  }
  return (
    <LinkUI
      {...otherProps}
      href={toString(to)}
      style={style}
      onClick={handleClick}>
      {children}
    </LinkUI>
  )
}

Link.propTypes = {
  to: PropTypes.any.isRequired,
  target: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  absolute: PropTypes.bool,
  smooth: PropTypes.bool,
  classes: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  history: PropTypes.object.isRequired
}

Link.defaultProps = {
  onClick: null
}

export default enhance(Link)
