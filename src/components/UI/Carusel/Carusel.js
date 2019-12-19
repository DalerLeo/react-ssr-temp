import React from 'react'
import styled from 'styled-components'
import { Gallery, GalleryImage } from 'react-gesture-gallery'

const CaruselStyled = styled.div`
    border-radius: 10px;
    background: #C7F9DD;
    height: 400px;
    width: 100%;
`
const Carusel = () => {
  const [index, setIndex] = React.useState(0)

  const images = [
    {
      src: 'https://shop.westerndigital.com/content/dam/store/en-us/assets/products/portable/extreme-pro-usb-3-1-ssd/gallery/extreme-pro-usb-3-1-ssd-front.png.thumb.1280.1280.png'
    },
    {
      src: 'https://shop.westerndigital.com/content/dam/store/en-us/assets/campaign/gift-guide/gg_sd_us_homepage_products.png.thumb.1280.1280.png'
    },
    {
      src: 'http://www.maselko.uz/wp-content/uploads/2016/11/IMG_4535.png'
    }
  ]

  return (
    <CaruselStyled>
      <Gallery
        index={index}
        onRequestChange={i => {
          setIndex(i)
        }}
      >
        {images.map(img => (
          <GalleryImage objectFit="cover" style={{ borderRadius: '10px' }} key={img.src} src={img.src}>asasdfasfdf</GalleryImage>
        ))}
      </Gallery>
    </CaruselStyled>
  )
}

export default Carusel
