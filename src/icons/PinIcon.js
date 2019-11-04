import React from 'react'

const PinIcon = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 12"
      fill={color} style={{ ...style }} width={9} height={12}
      {...defaultPorps}
    >
      <path fill="#A1A7B3" fillRule="nonzero" d="M4.501.5C2.015.5.007 2.433.007 4.828c0 .834.277 1.631.663 2.286l2.928 4.882c.184.318.554.478.903.478.35 0 .702-.16.903-.478l2.93-4.879c.388-.655.661-1.437.661-2.287C8.995 2.436 6.988.5 4.501.5zm0 5.606c-.903 0-1.64-.71-1.64-1.58 0-.87.737-1.58 1.64-1.58.903 0 1.64.71 1.64 1.58 0 .873-.737 1.58-1.64 1.58z" opacity=".697" />
    </svg>
  )
}

export default PinIcon
