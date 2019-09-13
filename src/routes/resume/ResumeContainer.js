import _ from 'lodash'
import React from 'react'
import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure
} from 'recompose'

import { connect } from 'react-redux'
import SearchResume from './SearchResume'
import withHistory from 'helpers/withHistory'
import {
  getProfessionsList,
  getRegionsList
} from 'routes/resume/actions'
import { getStateData } from 'helpers/get'

const mapStateToProps = (state) => {
  const pathname = _.get(state, ['router', 'pathname'])

  return {
    pathname,
    ...getStateData('professions', 'professionsList', state, false),
    ...getStateData('regions', 'regionsList', state, false)
  }
}

const mapDispatchToProps = {
  getProfessionsList,
  getRegionsList
}

const enhance = compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe((props) => {
        //        Props.getProfessionsList()
        //        Props.getRegionsList()
      })
    return props$
  }),
  setDisplayName('ResumeContainer'),
  pure
)

const ResumeContainer = (props) => {
  const {
    professionsList,
    regionsList
  } = props
  return (
    <SearchResume
      professionsList={professionsList}
      regionsList={regionsList}
    />
  )
}

export default enhance(ResumeContainer)
