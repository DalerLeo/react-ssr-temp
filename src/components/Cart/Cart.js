import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { path, isEmpty, find, propEq } from 'ramda'
import MinusIcon from 'icons/Minus'
import PlusIcon from 'icons/Plus'
import DeleteIcon from 'icons/Delete'
import NoImage from 'images/NoImage.png'
import NoProductImage from 'images/empty-template-cart.png'
import { setItemToCart } from 'components/Cards/storage'
import { Row, Col } from 'components/Grid'
import SalePrice from '../UI/SalePrice'

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 5px;
`
const ProductName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 129.96%;
  color: #242F3B;
  mix-blend-mode: normal;
  flex: none;
  order: 0;
  align-self: center;
  margin: 8px;
`

const GroupButton = styled.div`
  display: flex;
  background: #FFFFFF;
  border: 1px solid #AEB2B7;
  box-sizing: border-box;
  border-radius: 7px;
  padding: 13px 0;
  margin-top: 15px;
`
const DecrementButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: 0;
  margin-left: 12px;
`
const IncrementButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: 0;
`

const Counter = styled.input`
  width: 25px;
  padding-left: 5px;
  border: none;
  outline: 0;
`
const DeleteButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin: 28px 10px;
  outline: 0;
`
const Img = styled.img`
  height: 86px;
  width: auto;
  max-width: 86px;
  margin-left: 20px;
`

const ContentPosition = styled.div`
  width: 614px;
`
const NoProductImg = styled.img`
  display: flex;
  margin: auto;
  width: 200px;
  height: 100%;
`
const CartText = styled.h2`
  color: #2E384C;
  display: flex;
  justify-content: center;
  margin: 20px 0 0 20px;
`
const ProductArticul = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 129.96%;
  color: #818591;
  flex: none;
  order: 1;
  align-self: flex-start;
  margin: 0px 6px;
`
const StyledPrice = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 129.96%;
  color: #28A97C;
  mix-blend-mode: normal;
  margin-top: 20px;
`
const ProductRow = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #E7E8EA;
  width: 95%;
  margin: 0 auto;
  :nth-last-child(1){
    border-bottom: none;
  }
`
const Cart = props => {
  const { onDelete, products = [] } = props
  const dispatch = useDispatch()
  const onAdd = (product, amount) => {
    return dispatch(setItemToCart(amount + 1, product))
  }
  const onSubtract = (product, amount) => {
    return dispatch(setItemToCart(amount - 1, product))
  }

  return (
    <div>
      {isEmpty(products) ? (
        <ContentPosition>
          <NoProductImg src={NoProductImage} alt="No Product" />
          <CartText>The cart is empty</CartText>
        </ContentPosition>
      ) : (
        <Card>
          {products.map((product, key) => {
            const images = path(['images'], product)
            const isPrimary = find(propEq('isPrimary', true))(images)
            const image = path(['image'], isPrimary)
            const name = path(['name'], product)
            const id = path(['id'], product)
            const price = path(['price'], product)
            const amount = path(['amount'], product)
            return (
              <ProductRow key={key}>
                <Row>
                  <Col span={4}>
                    <Img
                      src={typeof image === 'undefined' ? NoImage : image}
                      alt="image"
                    />
                  </Col>
                  <Col span={10}>
                    <ProductName>{name}</ProductName>
                    <ProductArticul>#264723648212</ProductArticul>
                  </Col>
                  <Col span={4}>
                    <GroupButton>
                      <DecrementButton onClick={() => onSubtract(product, amount)}>
                        <MinusIcon />
                      </DecrementButton>
                      <Counter type="text" value={amount} />
                      <IncrementButton onClick={() => onAdd(product, amount)}>
                        <PlusIcon />
                      </IncrementButton>
                    </GroupButton>
                  </Col>
                  <Col span={1} />
                  <Col span={4}>
                    <StyledPrice>
                      {Math.floor(price)} сум
                    </StyledPrice>
                    {/* <SalePrice>25000</SalePrice> */}
                  </Col>
                  <Col span={1}>
                    <DeleteButton onClick={() => onDelete(id)}>
                      <DeleteIcon />
                    </DeleteButton>
                  </Col>
                </Row>
              </ProductRow>
            )
          })}
        </Card>
      )}
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Cart
