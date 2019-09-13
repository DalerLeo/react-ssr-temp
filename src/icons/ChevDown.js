import React from 'react'

const ChevDown = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 6"
      fill={color} style={{ ...style }} width={10} height={6}
      {...defaultPorps}>

      <path fill="none" fillRule="evenodd" stroke="#8798AD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M1 1l4 4 4-4"/>
    </svg>
  )
}

export default ChevDown
