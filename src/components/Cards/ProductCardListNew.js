import React from 'react'
import { splitEvery } from 'ramda'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ProductCardNew from './ProductCardNew'
import ProductPlaceholder from './ProductPlaceholder'

const List = styled.div`
  display: flex;
  border: ${props => props.theme.cardBorder};
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  margin-bottom: 20px;
  :last-child {
    margin-bottom: 0;
  }
`

const ProductCardList = (props) => {
  const { list, number, loading } = props

  if (loading) {
    return (
      <List>
        {[1, 2, 3, 4].map(l => (<ProductPlaceholder key={l} />))}
      </List>
    )
  }
  const splittedList = splitEvery(number, list)

  return splittedList.map((every4, index) => (
    <List key={index}>
      {every4.map(every => <ProductCardNew item={every} key={every.id} />)}
    </List>
  ))
}

ProductCardList.defaultProps = {
  number: 4
}
ProductCardList.propTypes = {
  number: PropTypes.number
}
export default ProductCardList
