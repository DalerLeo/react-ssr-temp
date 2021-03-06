import React from 'react'
import SvgIcon from './SvgIcon'

export default (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 50 50">
      <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(282 25 25)">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="800ms" repeatCount="indefinite" />
      </path>
    </SvgIcon>

  )
}
