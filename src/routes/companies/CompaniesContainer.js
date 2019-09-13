import fpGet from 'lodash/fp/get'
import React from 'react'
import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure
} from 'recompose'

import { connect } from 'react-redux'
import Companies from './Companies'

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

const CompaniesContainer = (props) => {
  return (
    <Companies/>
  )
}

export default enhance(CompaniesContainer)
