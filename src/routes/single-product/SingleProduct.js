import React from 'react'
import { path } from 'ramda'

const SingleProduct = (props) => {
  const { productData } = props
  const data = path(['data'], productData)
  const name = path(['name'], data)

  return (

    <div>
      {name}
    </div>
  )
}

export default SingleProduct
