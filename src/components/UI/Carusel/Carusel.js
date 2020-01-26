import { AD_ITEM } from 'constants/api'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import axios, { getPayloadFromSuccess } from 'utils/axios'
import { useStore } from 'react-redux'
import { sprintf } from 'sprintf-js'
import { defaultTo, pipe, prop } from 'ramda'
import PropTypes from 'prop-types'

const EMPTY_ARR = []
const CaruselStyled = styled.div`
    border-radius: 10px;
    background: #C7F9DD;
    height: 400px;
    width: 100%;
`
const Carusel = (props) => {
  const { section } = props
  const [index, setIndex] = React.useState(0)
  const [data, setData] = React.useState(EMPTY_ARR)
  const [error, setErr] = React.useState(false)
  const store = useStore()
  useEffect(() => {
    axios(store).get(sprintf(AD_ITEM, section))
      .then(getPayloadFromSuccess)
      .then(pipe(prop('banners'), defaultTo([]), setData))
      .catch(() => setErr(true))

  }, EMPTY_ARR)

  if (error) {
    return null
  }

  return (
    <CaruselStyled>
      <Gallery
        index={index}
        onRequestChange={i => {
          setIndex(i)
        }}
      >
        {data.map(img => (
          <GalleryImage
            objectFit="cover"
            style={{ borderRadius: '10px' }}
            key={img.photo.file}
            src={img.photo.file}
          >
            asasdfasfdf
          </GalleryImage>
        ))}
      </Gallery>
    </CaruselStyled>
  )
}

Carusel.propTypes = {
  section: PropTypes.string
}
export default Carusel
