import React from 'react'

const ArrowLeft = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.807 36.364"
      fill={color} style={{ ...style }} width={24} height={24}
      {...defaultPorps}
    >
      <path id="arrow-left" d="M4.242,21.807,18.182,8.251l13.94,13.556,4.242-4.126L18.182,0,0,17.681Z" transform="translate(0 36.364) rotate(-90)" />
    </svg>
  )
}

export default ArrowLeft
