import { arrayObjToObj } from 'utils/get'

export const PAYMENT_TYPE_LIST = [
  {
    id: 'payme',
    name: 'Онлайн оплата через Payme',
  },
  {
    id: 'cash',
    name: 'Оплата при получении'
  }
]
export const PAYMENT_TYPE = arrayObjToObj(PAYMENT_TYPE_LIST)
