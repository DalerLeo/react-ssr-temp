import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import PropTypes from 'prop-types'
import Container from 'components/StyledElems/Container'
import FavouriteCard from 'components/Cards/ProductCard'
import Preloader from '../../components/UI/PreLoader'

const FavouriteBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const PreloaderBlock = styled.div`
  display: flex;
  justify-content: center;
`
const Favourite = props => {
  const { favouriteList } = props
  const loading = path(['loading'], favouriteList)
  const favouriteProducts = path(['results'], favouriteList)
  return (
    <div>
      <Container>
        <h1>Избранные товары</h1>
        {
          loading
            ? <PreloaderBlock><Preloader /></PreloaderBlock> : (
              <div>
                {favouriteProducts.length === 0 ? (<h2>Нет избранных товаров</h2>)
                  : (
                    <FavouriteBlock>
                      {favouriteProducts.map((favouriteProduct, key) => (
                        <FavouriteCard item={favouriteProduct.product} key={key} column={4} />
                      ))}
                    </FavouriteBlock>
                  )}
              </div>
            )
        }

      </Container>
    </div>
  )
}

Favourite.propTypes = {
  favouriteList: PropTypes.array
}
export default Favourite
