import React from 'react'
import Order from './Order'
const data = [
  {
    id: '1',
    name: 'Сверхсрочная доставка',
    title: 'Ну очень быстрая доставка. Доставит сам Флэш.',
    address: 'Только если вы не живете на Сергелийском районе.',
    price: '20000'
  },
  {
    id: '2',
    name: 'Сверхсрочная доставка',
    title: 'Ну очень быстрая доставка. Доставит сам Флэш.',
    address: 'Только если вы не живете на Сергелийском районе.',
    price: '30000'
  },
  {
    id: '3',
    name: 'Сверхсрочная доставка',
    title: 'Ну очень быстрая доставка. Доставит сам Флэш.',
    address: 'Только если вы не живете на Сергелийском районе.',
    price: '22000'
  }
]

const OrderContainer = props => {
  return <Order data={data}/>
}

export default OrderContainer
