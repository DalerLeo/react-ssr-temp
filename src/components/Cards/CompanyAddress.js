import React from 'react'
import PropTypes from 'prop-types'
import PinIcon from 'icons/PinIcon'
import RenderOrNull from 'components/Utils/RenderOrNull'

const iconStyle = {
  verticalAlign: 'baseline'
}

const CompanyAddress = ({ name, style }) => {
  return (
    <RenderOrNull value={name}>
      <div style={style}><PinIcon style={iconStyle}/> {name}</div>
    </RenderOrNull>
  )
}

CompanyAddress.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object
}

export default CompanyAddress
