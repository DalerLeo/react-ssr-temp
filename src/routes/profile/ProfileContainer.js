import * as STATE from 'constants/stateNames'
import React from 'react'
import { path } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromState } from 'utils/get'
import equals from 'fast-deep-equal'
import useFetchList from '../../hooks/useFetchList'
import Profile from './Profile'
import {
  updateClientAction,
  addressListAction,
  addressDeleteAction,
  activateMailingAction,
  deactivateMailingAction
} from './actions'

const ProfileContainer = props => {
  const dispatch = useDispatch()
  const { data: user } = useSelector(getDataFromState(STATE.USER_INFO), equals)

  
  const userData = {
    initialValues: user
  }
  const userId = path(['initialValues', 'id'], userData)
  const phoneNumber = path(['initialValues', 'phoneNumber'], userData)
  const isMailing = path(['initialValues', 'isMailing'], userData)

  console.warn(userData)

  const onPhotoUpdate = (value) => {
    const imgId = path(['photo', 'id'], value)
    return dispatch(updateClientAction(userId, { photo: imgId, phoneNumber, isMailing }))
  }
  const onDelete = (id) => dispatch(addressDeleteAction(id))
    .then(() => dispatch(addressListAction()))

  const listAddress = useFetchList({
    action: addressListAction,
    stateName: STATE.ADDRESS_LIST
  })

  return (
    <Profile
      userData={userData}
      listAddress={listAddress}
      onDelete={onDelete}
      onPhotoUpdate={onPhotoUpdate}
      activateMailingAction={activateMailingAction}
      deactivateMailingAction={deactivateMailingAction}
    />
  )
}

export default ProfileContainer
