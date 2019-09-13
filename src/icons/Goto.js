import React from 'react'

const Goto = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 14"
      fill={color} style={{ ...style }} width={17} height={14}
      {...defaultPorps}>
      <g fill="none" fillRule="evenodd" stroke="#7848B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
        <path d="M1.006 7.465h15.321M11.476 13.327l4.851-5.862-4.85-5.863"/>
      </g>
    </svg>
  )
}

export default Goto
