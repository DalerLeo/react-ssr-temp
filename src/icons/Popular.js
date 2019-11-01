import React from 'react'

const Favorite = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill={color} style={{ verticalAlign: 'text-top', ...style }} width={14} height={14}
      {...defaultPorps}
    >
      <path fill="#FFB701" fillRule="nonzero" d="M6.767 10.622l-2.985 1.57a.5.5 0 0 1-.725-.527l.57-3.324a.5.5 0 0 0-.144-.443L1.068 5.544a.5.5 0 0 1 .277-.853l3.338-.485a.5.5 0 0 0 .376-.273L6.552.908a.5.5 0 0 1 .896 0l1.493 3.025a.5.5 0 0 0 .376.273l3.338.485a.5.5 0 0 1 .277.853l-2.415 2.354a.5.5 0 0 0-.144.443l.57 3.324a.5.5 0 0 1-.725.527l-2.985-1.57a.5.5 0 0 0-.466 0z" />
    </svg>
  )
}

export default Favorite
