import React from 'react'
import SvgIcon from './SvgIcon'

export default props => {
  return (
    <SvgIcon
      width="228"
      height="181"
      viewBox="0 0 228 181"
      fill="none"
      {...props}
    >
      <g filter="url(#filter_bat)">
        <path d="M28.0527 7H73.3969V34.9352H28.0527V7Z" fill="#5A5A5A" />
        <path d="M140.604 7H185.948V34.9352H140.604V7Z" fill="#4F4F4F" />
        <path
          d="M15.5276 40.8506H198.473V149.757H15.5276V40.8506Z"
          fill="#5A5A5A"
        />
        <path
          d="M107.067 40.8506H198.472V149.757H107.067V40.8506Z"
          fill="#4F4F4F"
        />
        <path d="M7 25.0002H207V43.0002H7V25.0002Z" fill="#FFD54C" />
        <path opacity="0.8" d="M107 25H207V43H107V25Z" fill="#E1AD0C" />
        <path d="M7 142H207V160H7V142Z" fill="#FFD54C" />
        <path opacity="0.8" d="M107 142H207V160H107V142Z" fill="#E1AD0C" />
        <path
          d="M36.0852 86.9246H81.4293V103.684H36.0852V86.9246Z"
          fill="#E0E0E0"
        />
        <path
          d="M176.774 86.9241H162.482L162.482 72.6319L145.722 72.6313L145.722 86.9241H131.43V103.684H145.722V117.975L162.482 117.975V103.684H176.774V86.9241Z"
          fill="#BDBDBD"
        />
      </g>
      <defs>
        <filter
          id="filter_bat"
          x="0"
          y="0"
          width="228"
          height="181"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="7" dy="7" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </SvgIcon>
  )
}
