import React from 'react'

const LogoIcon = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 24"
      fill={color} style={{ ...style }} width={100} height={24}
      {...defaultPorps}
    >
      <g fill="none" fillRule="evenodd" transform="translate(0 -4)">
        <text fill="#000" fontFamily="Montserrat-Medium, Montserrat" fontSize="24" fontWeight="400">
          <tspan x="26" y="23">Myjob</tspan>
        </text>
        <rect width="21" height="21" y="4" fill="#7848B7" fillRule="nonzero" rx="3" />
        <text fill="#FFF" fontFamily="Montserrat-Medium, Montserrat" fontSize="11" fontWeight="bold">
          <tspan x="3" y="18">MJ</tspan>
        </text>
      </g>
    </svg>
  )
}

export default LogoIcon
