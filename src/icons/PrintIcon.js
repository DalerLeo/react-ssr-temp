import React from 'react'

const PrintIcon = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      fill={color} style={{ ...style }} width={10} height={10}
      {...defaultPorps}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 0.5H8V2.5H2V0.5ZM1.5 3H8.5C9.33 3 10 3.67 10 4.5V7.5H8V9.5H2V7.5H0V4.5C0 3.67 0.67 3 1.5 3ZM3 8.5H7V6H3V8.5ZM8.5 5C8.225 5 8 4.775 8 4.5C8 4.225 8.225 4 8.5 4C8.775 4 9 4.225 9 4.5C9 4.775 8.775 5 8.5 5Z" fill="#A1A7B3"/>

    </svg>
  )
}

export default PrintIcon
