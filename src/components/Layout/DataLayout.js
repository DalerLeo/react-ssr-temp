import React from 'react'
import fp from 'lodash/fp'
import setGlobalNotify from 'helpers/setGlobalNotify'
import { isApplicant, isEmployer } from 'helpers/get'
import {
  getDriverLicenseList,
  getCurrencyList,
  getNotificationsCount
} from 'routes/action-common'

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
      this.getNotifications()
      if (!fp.get('common.driverLicence.data', state)) {
        dispatch(getDriverLicenseList())
      }
      if (!fp.get('common.currency.data', state)) {
        dispatch(getCurrencyList())
      }
    }

    /* ComponentDidUpdate (prevProps, prevState, snapshot) {
      console.warn(prevProps, prevState)
      console.warn(this.props, this.state)
    } */
    actionSuccess () {
      const { store: { dispatch } } = this.props
      dispatch(setGlobalNotify())
    }

    getNotifications () {
      const { store: { dispatch } } = this.props
      const INTERVAL = 20000
      dispatch(getNotificationsCount())
      this.notificationInterval = setTimeout(this.getNotifications, INTERVAL)
    }

    componentWillUnmount () {
      clearTimeout(this.notificationInterval)
    }

    render () {
      const { store: { getState } } = this.props
      const state = getState()
      const userData = fp.get('user.data', state) || {}
      const data = {
        // Lang,
        userData,
        isApplicant: isApplicant(userData),
        isEmployer: isEmployer(userData),
        isAuth: Boolean(fp.get('login.data.token', state)),
        actionSuccess: this.actionSuccess
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
