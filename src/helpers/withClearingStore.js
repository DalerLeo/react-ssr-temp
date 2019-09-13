import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import _ from 'lodash'

const withClearingStore = ACTION_TYPES => {
  return compose(
    connect(state => {
      return {}
    }),
    mapPropsStream(props$ => {
      props$
        .last()
        .subscribe(({ dispatch, ...props }) => {
          return _.forEach(ACTION_TYPES, action => {
            dispatch({ type: `${action}_CLEAR` })
          })
        })

      return props$
    })
  )
}
export default withClearingStore
