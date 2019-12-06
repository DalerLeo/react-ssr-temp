import React from 'react'
import styled from 'styled-components'
import { Gallery, GalleryImage } from 'react-gesture-gallery'

const CaruselStyled = styled.div`
    border-radius: 10px;
    background-color: green;
    margin-left: 32px;
`
const Carusel = () => {
  const [index, setIndex] = React.useState(0)

  const images = [
    {
      src: 'https://media.licdn.com/dms/image/C4D1BAQGh2qH8a1qv0w/company-background_10000/0?e=2159024400&v=beta&t=-g_EHxycwOcdpdpSoLy7Zd64jZBCfdplEDmO0xUOZVg'
    },
    {
      src: 'http://suptg.thisisnotatrueending.com/archive/5655084/images/1251653718851.png'
    },
    {
      src: 'http://www.racontemoilhistoire.com/wp-content/uploads/2018/01/familia-muisca-841x355.jpg'
    },
    {
      src: 'https://klubialpinprishtina.com/wp-content/uploads/2017/07/20368827_1984915758200737_1945558551622446370_o-841x355.jpg'
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
          <GalleryImage objectFit="cover" style={{ borderRadius: '10px' }} key={img.src} src={img.src} />
        ))}
      </Gallery>
    </CaruselStyled>
  )
}

export default Carusel
