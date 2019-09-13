import React from 'react'
import HistoryProvider from 'HistoryProvider'

const withHistory = (Component) => {
  return (props) => {
    return (
      <HistoryProvider.Consumer>
        {value => <Component {...props} history={value}/>}
      </HistoryProvider.Consumer>
    )
  }
}

export default withHistory
