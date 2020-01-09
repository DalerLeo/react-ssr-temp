import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import PropTypes from 'prop-types'
import Container from 'components/StyledElems/Container'
import FavouriteCard from 'components/Cards/ProductCard'

const FavouriteBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Favourite = props => {
  const { favouriteList } = props
  const favouriteProducts = path(['results'], favouriteList)
  console.warn(favouriteProducts.length)
  return (
    <div>
      <Container>
        <h1>Избранные товары</h1>
        {favouriteProducts.length === 0 ? (<h2>Нет избранных товаров</h2>)
          : (
            <FavouriteBlock>
              {favouriteProducts.map((favouriteProduct, key) => (
                <FavouriteCard item={favouriteProduct.product} key={key} column={4} />
              ))}
            </FavouriteBlock>
          )}
      </Container>
    </div>
  )
}

Favourite.propTypes = {
  favouriteList: PropTypes.array
}
export default Favourite
