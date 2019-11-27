import React from 'react'
import Header from 'components/UI/Header'
import PropTypes from 'prop-types'
import Container from 'components/StyledElems/Container'
import styled from 'styled-components'
import { path, pathOr } from 'ramda'
import MinusIcon from 'icons/Minus'
import PlusIcon from 'icons/Plus'
import DeleteIcon from 'icons/Delete'
import NoImage from 'images/NoImage.png'

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF;
  width: 75%;
  height: 80px;
  margin-bottom: 15px;
  border-radius: 7px;
  box-shadow: 1px 1px 2px 1px rgba(156,150,156,1);
`
const ProductName = styled.div`
  padding: 0 20px;
  font-size: 16px;
  line-height: 129.96%;
  width: 350px;
`

const GroupButton = styled.div`

`
const DecrementButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: 0;
`
const IncrementButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: 0;
`

const Counter = styled.input`
  width: 40px;
  border: none;
  padding-left: 20px;
  outline: 0;
`
const DeleteButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  outline: 0;
`
const Img = styled.img`
    width: 50px;
    height: 100%;
    margin-left: 30px;
`

const Home = props => {
  const { onDelete, products = [] } = props
  return (
    <div>
      <Header />
      <Container>
        <div>
          {products.map((product, key) => {
            const image = path(['image'], product)
            const name = path(['name'], product)
            const id = path(['id'], product)
            const price = path(['price'], product)
            return (
              <Card key={key}>
                <div>
                  <Img
                    src={NoImage}
                    alt="image"
                  />
                </div>
                <ProductName>{name}</ProductName>
                <GroupButton>
                  <DecrementButton>
                    <MinusIcon />
                  </DecrementButton>
                  <Counter type="number" value="1" />
                  <IncrementButton>
                    <PlusIcon />
                  </IncrementButton>
                </GroupButton>
                <div>
                  {price}
                </div>
                <DeleteButton onClick={() => onDelete(id)}>
                  <DeleteIcon />
                </DeleteButton>
              </Card>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

Home.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Home
