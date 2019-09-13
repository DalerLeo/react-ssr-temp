import React from 'react'

const ChevRight = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7 14"
      fill={color} style={{ ...style }} width={7} height={14}
      {...defaultPorps}>

      <path fill="none" fillRule="evenodd" stroke="#9DABBC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 12.725l4.85-5.862L1 1"/>
    </svg>
  )
}

export default ChevRight
