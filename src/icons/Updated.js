import React from 'react'

const Updated = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 17"
      fill={color} style={{ ...style }} width={12} height={17}
      {...defaultPorps}>
      <path fill="#000" fillRule="nonzero" d="M6 2.833V.708L3.143 3.542 6 6.375V4.25c2.364 0 4.286 1.905 4.286 4.25a4.13 4.13 0 0 1-.5 1.983l1.043 1.034a5.584 5.584 0 0 0 .885-3.017c0-3.13-2.557-5.667-5.714-5.667zm0 9.917c-2.364 0-4.286-1.905-4.286-4.25 0-.715.179-1.395.5-1.983L1.171 5.482A5.584 5.584 0 0 0 .286 8.5c0 3.13 2.557 5.667 5.714 5.667v2.125l2.857-2.834L6 10.625v2.125z"/>
    </svg>
  )
}

export default Updated
