import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromState } from 'utils/get'
import equals from 'fast-deep-equal'
import Profile from './Profile'
import { updateClientAction } from './actions'

const ProfileContainer = props => {
//  Const data = useUpdate({})
  const dispatch = useDispatch()
  const { data: user } = useSelector(getDataFromState(STATE.USER_INFO), equals)

  const onUpdate = (values) => {

    return dispatch(updateClientAction(user.id, values))
  }

  const userData = {
    onSubmit: onUpdate,
    initialValues: user
  }
  return <Profile userData={userData} />
}

export default ProfileContainer
