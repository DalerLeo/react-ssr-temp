import * as STATE from 'constants/stateNames'
import React from 'react'
import { path } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromState } from 'utils/get'
import equals from 'fast-deep-equal'
import useFetchList from '../../hooks/useFetchList'
import Profile from './Profile'
import {
  clientPartiallyUpdateAction,
  addressListAction,
  addressDeleteAction,
  activateMailingAction,
  deactivateMailingAction
} from './actions'

const ProfileContainer = props => {
  const dispatch = useDispatch()

  const listAddress = useFetchList({
    action: addressListAction,
    stateName: STATE.ADDRESS_LIST
  })

  const { data: user } = useSelector(getDataFromState(STATE.USER_INFO), equals)

  const userData = {
    initialValues: user
  }
  const clientId = path(['id'], user)

  const onFullnameUpdate = (value) => {
    const fullName = path(['fullName'], value)
    return dispatch(clientPartiallyUpdateAction(clientId, { full_name: fullName }))
  }

  const onDelete = (id) => dispatch(addressDeleteAction(id))
    .then(() => dispatch(addressListAction()))

  const onPicUpdate = value => {
    const photo = path(['id'], value)
    return dispatch(clientPartiallyUpdateAction(clientId, { photo }))
  }

  const onLangUpdate = value => {
    const languageNews = value.target.value
    return dispatch(clientPartiallyUpdateAction(clientId, { language_news: languageNews }))
  }
  return (
    <Profile
      onPicUpdate={onPicUpdate}
      userData={userData}
      listAddress={listAddress}
      onDelete={onDelete}
      onFullnameUpdate={onFullnameUpdate}
      activateMailingAction={activateMailingAction}
      deactivateMailingAction={deactivateMailingAction}
      onLangUpdate={onLangUpdate}
    />
  )
}

export default ProfileContainer
