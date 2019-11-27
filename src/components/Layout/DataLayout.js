import React from 'react'
import fp from 'lodash/fp'
import setGlobalNotify from 'helpers/setGlobalNotify'
import { path } from 'ramda'
/* eslint-disable react/prop-types */
export default Component => {
  return class DataLayout extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        userData: {}
      }

      this.notificationInterval = null
      this.actionSuccess = this.actionSuccess.bind(this)
      this.getNotifications = this.getNotifications.bind(this)
    }

    componentDidMount () {
      const { store: { getState, dispatch } } = this.props
      const state = getState()
    }

    actionSuccess () {
      const { store: { dispatch } } = this.props
      dispatch(setGlobalNotify())
    }

    getNotifications () {
      const { store: { dispatch } } = this.props
      const INTERVAL = 20000
    }

    componentWillUnmount () {
      clearTimeout(this.notificationInterval)
    }

    render () {
      const { store: { getState } } = this.props
      const state = getState()
      const userData = fp.get('user.data', state) || {}
      const isAuth = path(['login', 'data', 'token'], state) || ''
      const data = {
        isAuth

      }
      return (
        <Component
          {...this.props}
          {...data}
        />
      )
    }
  }
}
