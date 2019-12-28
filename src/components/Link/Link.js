import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import useHistory from 'hooks/useHistory'
import { is } from 'ramda'

const LinkUI = styled.a`
    color: black;
    &:focus {
      text-decoration: none;
    }
    &:hover{
      color: #2EBB8A;
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

const isLeftClickEvent = (event) => {
  return event.button === Number('0')
}

const toString = (to) => {
  return is(Object, to) ? `${to.pathname}/?${to.search}` : to
}

const isModifiedEvent = (event) => {
  return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

const Link = props => {
  const {
    to,
    children,
    smooth,
    style,
    beforeRedirect,
    ...otherProps
  } = props

  const history = useHistory()
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
      beforeRedirect && beforeRedirect()
      history.push(to)
    }
    return null
  }
  return (
    <LinkUI
      {...otherProps}
      href={toString(to)}
      style={style}
      onClick={handleClick}
    >
      {children}
    </LinkUI>
  )
}

Link.propTypes = {
  to: PropTypes.any.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
  absolute: PropTypes.bool,
  smooth: PropTypes.bool,
  classes: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object
}

Link.defaultProps = {
  onClick: null
}

export default Link
