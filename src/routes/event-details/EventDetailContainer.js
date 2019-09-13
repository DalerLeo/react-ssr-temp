import React from 'react'
import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure
} from 'recompose'

import { connect } from 'react-redux'
import ArticleDetails from './EventDetails'

const mapStateToProps = (state) => {
  return {
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

const EventDetailContainer = (props) => {
  return (
    <ArticleDetails {...props}/>
  )
}

export default enhance(EventDetailContainer)
