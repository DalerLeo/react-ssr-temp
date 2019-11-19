import React from 'react'
import { useDispatch } from 'react-redux'
import Address from './Address'
import { addressCreateAction } from './actions'

const AddressContainer = props => {
  const dispatch = useDispatch()
  const addAddress = (data) => dispatch(addressCreateAction(data))

  //  const onUpdate = (values) => {

  //   console.warn('dsds')
  //   return dispatch(updateClientAction(user.id, values))
  // }

  // const userData = {
  //   onSubmit: onUpdate,
  //   initialValues: user
  // }
  return <Address addAddress={addAddress} />
}

export default AddressContainer
