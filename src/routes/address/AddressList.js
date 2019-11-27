import React from 'react'
import styled from 'styled-components'
import { pathOr } from 'ramda'
import DeleteIcon from 'icons/Delete'

const Addresses = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Card = styled.div`
    background-color: #FFF;
    padding: 20px;
    margin-right: 10px;
    border-radius: 7px;
    border: 1px solid lightgrey;
    width: 275px;
    margin-bottom: 10px;
`
const DeleteButton = styled.button`
    border-radius: 50px;
    background-color: transparent;
    padding: 5px;
    outline: 0;
    cursor: pointer;
`
const AddressList = (props) => {
  const { listAddress, onDelete } = props
  const datas = pathOr([], ['data'], listAddress)
  return (
    <Addresses>
      {datas.map((data, key) => (
        <Card key={key}>
          <div>
            {data.phone}
          </div>
          <div>
            {data.address}
          </div>
          <div>
            {data.contactPerson}
          </div>
          <DeleteButton onClick={() => onDelete(data.id)}>
            <DeleteIcon />
          </DeleteButton>
        </Card>
      ))}
    </Addresses>
  )
}

export default AddressList
