import React from 'react'

const RenderOrNull = ({ children, value, ...props }) => {
  if (value) {
    return React.cloneElement(children, props)
  }
  return null
}

export default RenderOrNull
