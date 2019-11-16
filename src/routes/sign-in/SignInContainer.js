import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import History from '../../HistoryProvider'
import SignIn from './SignIn'
import { registerAction, signInAction } from './actions'

const SignInContainer = props => {
  const dispatch = useDispatch()
  const history = useContext(History)
  const onRegister = (phone) => dispatch(registerAction(phone))
  const onLogin = (password, phoneNumber) => {
    return dispatch(signInAction(phoneNumber, password)).then(() => history.replace('/'))
  }

  return <SignIn onRegister={onRegister} onLogin={onLogin} />
}

export default SignInContainer
