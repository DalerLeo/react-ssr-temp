import fpGet from 'lodash/fp/get'
import React from 'react'
import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure
} from 'recompose'

import { connect } from 'react-redux'
import Articles from './Events'

const mapStateToProps = (state) => {
  const pathname = fpGet('router.pathname', state)

  return {
    pathname
  }
}

const mapDispatchToProps = {
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    return props$
  }),
  setDisplayName('ArtilesContainer'),
  pure
)

const EventsContainer = (props) => {
  return (
    <Articles/>
  )
}

export default enhance(EventsContainer)
