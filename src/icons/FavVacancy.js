import React from 'react'

const Favorite = ({ color, style, ...defaultPorps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 13"
      fill={color} style={{ ...style }} width={15} height={13}
      {...defaultPorps}
    >
      <path fill="#CBD0D8" fillRule="evenodd" d="M7.455 2.296C8.06.945 9.443 0 11.052 0c2.167 0 3.728 1.747 3.924 3.828 0 0 .106.516-.128 1.446-.317 1.267-1.063 2.392-2.069 3.251L7.455 13 2.221 8.525C1.215 7.666.469 6.54.15 5.274c-.233-.93-.127-1.447-.127-1.447C.22 1.747 1.781 0 3.948 0 5.557 0 6.85.945 7.455 2.296z" />
    </svg>
  )
}

export default Favorite
