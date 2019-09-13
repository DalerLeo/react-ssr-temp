import React from 'react'
import SvgIcon from './SvgIcon'

export default props => {
  return (
    <SvgIcon
      fontSize={'unset'}
      viewBox="0 0 18 16"
      width={18}
      height={16}
      {...props}>
      <path fillRule="evenodd" d="M8.946 2.826A4.71 4.71 0 0 1 13.263 0c2.6 0 4.473 2.15 4.708 4.711 0 0 .127.636-.152 1.78-.381 1.56-1.277 2.944-2.484 4.002L8.946 16l-6.281-5.508C1.458 9.435.562 8.05.18 6.492-.099 5.345.03 4.71.03 4.71.264 2.149 2.137 0 4.737 0c1.931 0 3.483 1.163 4.21 2.826z"/>
    </SvgIcon>
  )
}
