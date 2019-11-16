import React from 'react'
import styled from 'styled-components'
import MinusIcon from 'icons/Minus'
import PlusIcon from 'icons/Plus'
import DeleteIcon from 'icons/Delete'

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
const getData = () => {
  if (typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem('cart'))
  }

  return []
}
const Cart = (props) => {
  const getStorageData = getData()
  return (
    <div>
      {getStorageData.map((product, key) => {
        return (
          <Card key={key}>
            <ProductName>{product.name}</ProductName>
            <GroupButton>
              <DecrementButton>
                <MinusIcon />
              </DecrementButton>
              <Counter type="number" value="1" />
              <IncrementButton>
                <PlusIcon />
              </IncrementButton>
            </GroupButton>
            <DeleteButton>
              <DeleteIcon />
            </DeleteButton>
          </Card>
        )
      })}
    </div>
  )
}

export default Cart
