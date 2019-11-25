import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch } from 'react-redux'
import useFetchList from '../../hooks/useFetchList'
import Address from './Address'
import { addressCreateAction, addressListAction } from './actions'

const AddressContainer = props => {
  const dispatch = useDispatch()
  const addAddress = (data) => dispatch(addressCreateAction(data))

  const listAddress = useFetchList({
    action: addressListAction,
    stateName: STATE.ADDRESS_LIST
  })

  console.warn(listAddress)

  return <Address addAddress={addAddress} listAddress={listAddress} />
}

export default AddressContainer
