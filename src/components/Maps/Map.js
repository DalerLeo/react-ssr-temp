import React from 'react'
import { YMaps, Map } from 'react-yandex-maps'

const Maps = (props) => {
  return (
    <div>
      <YMaps>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" />
      </YMaps>
    </div>

  )
}

export default Maps
