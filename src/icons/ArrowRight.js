import React from 'react'

const ArrowRight = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.807 36.364"
      fill={color} style={{ ...style }} width={16} height={16}
      {...defaultPorps}>
      <path d="M4.242,21.807,18.182,8.251l13.94,13.556,4.242-4.126L18.182,0,0,17.681Z" transform="translate(21.807) rotate(90)"/>
    </svg>
  )
}

export default ArrowRight
