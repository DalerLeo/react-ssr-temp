import React, {useState} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NoImage from '../../../images/NoImage.png'

const Img = styled.img`
  width: 100%;
  background: #fff;
  border-radius: 6px;
`
const ImageOptions = styled.img`
  width: 52px;
  height: 52px;
  cursor: pointer;
  background: #fff;
  border-radius: 3px;
  margin-top: 20px;
  margin-right: 10px;
  :last-child {
    margin-right: 0;
  }
`

const ProductImage = props => {
  const { image, images } = props
  const [option, setOption] = useState(image)
  const onOption = ev => {
    setOption(ev.target.src)
  }
  return (
    <>
      <Img src={typeof image === 'undefined' ? NoImage : option} alt="Product Image" />
      {images.map((img, key) => {
        return <ImageOptions key={key} src={img.image.file} onClick={onOption} alt="product images" />
      })}

    </>
  )
}

ProductImage.propTypes = {
  image: PropTypes.any,
  images: PropTypes.array
}
export default ProductImage
