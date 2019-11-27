import React from 'react'
import styled from 'styled-components'
import { Gallery, GalleryImage } from 'react-gesture-gallery'

const CaruselStyled = styled.div`
    border-radius: 10px;
    background-color: transparent;
    overflow: hidden;
    margin-left: 32px;
`
const Carusel = () => {
  const [index, setIndex] = React.useState(0)

  const images = [
    {
      src: 'https://a.mktgcdn.com/p/fyvng10ZzCOZhiyz0PtTxJ7ct-sS7pV_S1QpdRKQQL4/841x622.png'
    },
    {
      src:
        'http://suptg.thisisnotatrueending.com/archive/5655084/images/1251653718851.png'
    },
    {
      src:
        'http://www.racontemoilhistoire.com/wp-content/uploads/2018/01/familia-muisca-841x355.jpg'
    },
    {
      src:
        'https://klubialpinprishtina.com/wp-content/uploads/2017/07/20368827_1984915758200737_1945558551622446370_o-841x355.jpg'
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
          <GalleryImage key={img.src} src={img.src} />
        ))}
      </Gallery>
    </CaruselStyled>
  )
}

export default Carusel
