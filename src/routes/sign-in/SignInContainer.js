import * as STATE from 'constants/stateNames'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromState } from 'utils/get'
import History from '../../HistoryProvider'
import SignIn from './SignIn'
import { registerAction, signInAction, userInfoCheckToken } from './actions'

const SignInContainer = props => {
  const dispatch = useDispatch()
  const history = useContext(History)
  const registerData = useSelector(getDataFromState(STATE.REGISTER))
  const onRegister = (phone) => dispatch(registerAction(phone))
  const onLogin = (password, phoneNumber) => {
    return dispatch(signInAction(phoneNumber, password))
      .then(({ value }) => dispatch(userInfoCheckToken(value.token)))
      .then(() => history.replace('/'))
  }

  return (
    <SignIn
      onRegister={onRegister}
      onLogin={onLogin}
      registerData={registerData}
    />
  )
}

export default SignInContainer
