import React from 'react'
import PropTypes from 'prop-types'
import Cart from 'components/Cart'

const Home = props => {
  const { onDelete, products = [] } = props
  return (
    <div>
      <Cart products={products} onDelete={onDelete} />
    </div>
  )
}

Home.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Home
