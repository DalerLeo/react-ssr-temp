import React from 'react'
import styled from 'styled-components'
import banner from 'images/Banner.png'

const AddBannerBlock = styled.div`
    margin-top: 60px;
`
const AddBannerStyled = styled.img`
    width: 1140px;
`

const AddBanner = () => {
  return (
    <AddBannerBlock>
      <AddBannerStyled src={banner} alt="banner" />
    </AddBannerBlock>
  )
}
export default AddBanner
