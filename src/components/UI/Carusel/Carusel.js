import React from 'react'
import styled from 'styled-components'
import { Gallery, GalleryImage } from 'react-gesture-gallery'

const CaruselStyled = styled.div`
    border-radius: 10px;
    background-color: green;
    overflow: hidden;
    margin-left: 32px;

`
const Carusel = () => {
  const [index, setIndex] = React.useState(0)

  const images = [
    {
      src: 'https://www.tsprfid.com/uploads/20150415/841x355-High%20Standard.jpg'
    },
    {
      src:
        'http://www.modoweinspiracje.pl/wp-content/uploads/2016/08/jesien-2016-trendy-modowe-841x355.jpg'
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
          <GalleryImage objectFit="contain" key={img.src} src={img.src} />
        ))}
      </Gallery>
    </CaruselStyled>
  )
}

export default Carusel
