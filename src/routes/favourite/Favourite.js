import React from 'react'
import styled from 'styled-components'
import Header from 'components/UI/Header'
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
  return (
    <div>
      <Header />
      <Container>
        <FavouriteBlock>
          {favouriteProducts.map((favouriteProduct, key) => (
            <FavouriteCard item={favouriteProduct.product} key={key} />
          ))}
        </FavouriteBlock>
      </Container>
    </div>
  )
}

Favourite.propTypes = {
  favouriteList: PropTypes.array
}
export default Favourite
