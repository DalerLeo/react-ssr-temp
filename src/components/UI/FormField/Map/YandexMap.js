import styled from 'styled-components'
import React, { useState } from 'react'
import { YMaps, Map, SearchControl } from 'react-yandex-maps'
import { path } from 'ramda'
import Pin from 'icons/Pin'
import Button from '../../Button/Button'
import Modal from '../../../Modal'

const CENTER = [41.30882292588138, 69.25220409208157]
const API_KEY = 'bc8fdb09-3efc-4819-8ca5-2c1d7f7708d2'

const ButtonUI = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`
const Container = styled.div`
  height: 532px;
`
const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: -25px;
  margin-top: -30px;
`
const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  height: 600px;
`
const PinUI = styled.div`
  position:absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`

const AddressBar = styled.div`
  max-width: ${props => props.loading ? '45px' : '700px'};
  transition: max-width 300ms;
  white-space: nowrap;
  position: absolute;
  z-index: 10;
  bottom: 90px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 15px 0px rgba(190, 195, 204, 0.77);
`
const LAT = 0
const LON = 1
const YandexMap = (props) => {
  const { input, open, onToggle, onAddressChange, addressValue } = props
  const [center, setCenter] = useState(CENTER)
  const [loading, setLoading] = useState(false)
  const [map, setMap] = useState(CENTER)

  const onAddress = (coords) => {
    setLoading(true)
    map.geocode(coords)
      .then((res) => {
        const firstGeoObject = res.geoObjects.get(0)
        onAddressChange(firstGeoObject.getAddressLine())

        const location = {
          lat: coords[LAT],
          lon: coords[LON]
        }
        input.onChange(location)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const onCenter = (val) => {
    const newCenter = path(['originalEvent', 'newCenter'], val)
    setCenter(newCenter)
    onAddress(newCenter)
  }

  return (

    <Modal
      open={open}
      width="900px"
      onClose={onToggle}
      title="Указать на карте"
      showHeader={false}
    >
      <Container>
        <ModalWrapper>
          <MapWrapper>

            <PinUI>
              <Pin />
            </PinUI>
            <AddressBar loading={loading}>{loading ? '...' : addressValue}</AddressBar>
            <ButtonUI onClick={onToggle}>Save</ButtonUI>
            <YMaps query={{ apikey: API_KEY, lang: 'ru_RU', mode: 'debug' }} preload={true}>
              <Map
                height="600px"
                width="100%"
                onLoad={setMap}
                modules={['geocode']}
                onBoundsChange={onCenter}
                defaultState={{ center: CENTER, zoom: 12, controls: [] }}
              >
                <SearchControl options={{ float: 'left' }} />
              </Map>
            </YMaps>
          </MapWrapper>
        </ModalWrapper>
      </Container>
    </Modal>
  )
}

export default YandexMap
