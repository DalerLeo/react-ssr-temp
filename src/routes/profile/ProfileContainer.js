import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
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
  const { data: { data: languageList } } = useSelector(getDataFromState(STATE.LANGUAGE_LIST), equals)

  const userData = {
    initialValues: user
  }
  const clientId = path(['id'], user)

  const onFullnameUpdate = (value) => {
    const fullName = path(['fullName'], value)
    const data = { full_name: fullName }
    return dispatch(clientPartiallyUpdateAction(clientId, data))
  }

  const onDelete = (id) =>
    dispatch(addressDeleteAction(id))
      .then(() => dispatch(addressListAction()))

  const onPicUpdate = value => {
    const photo = path(['id'], value)
    return dispatch(clientPartiallyUpdateAction(clientId, { photo }))
  }

  const onLangUpdate = value => {
    const data = { language: value }
    return dispatch(clientPartiallyUpdateAction(clientId, data))
  }
  const [checked, setChecked] = useState(true)

  const onSubscriptionChange = () => {
    if (checked) {
      dispatch(activateMailingAction(clientId))
    } else {
      dispatch(deactivateMailingAction(clientId))
    }
    setChecked(!checked)
  }
  return (
    <Profile
      onPicUpdate={onPicUpdate}
      userData={userData}
      listAddress={listAddress}
      onDelete={onDelete}
      onFullnameUpdate={onFullnameUpdate}
      onSubscriptionChange={onSubscriptionChange}
      onLangUpdate={onLangUpdate}
      languageList={languageList}
    />
  )
}

export default ProfileContainer
