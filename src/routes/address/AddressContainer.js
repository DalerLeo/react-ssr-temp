import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch } from 'react-redux'
import useFetchList from '../../hooks/useFetchList'
import Address from './Address'
import { addressCreateAction, addressListAction, addressDeleteAction } from './actions'

const AddressContainer = props => {
  const dispatch = useDispatch()
  const addAddress = (data) => dispatch(addressCreateAction(data))
    .then(() => dispatch(addressListAction()))

  const onDelete = (id) => dispatch(addressDeleteAction(id))
    .then(() => dispatch(addressListAction()))

  const listAddress = useFetchList({
    action: addressListAction,
    stateName: STATE.ADDRESS_LIST
  })

  return <Address addAddress={addAddress} listAddress={listAddress} onDelete={onDelete} />
}

export default AddressContainer
