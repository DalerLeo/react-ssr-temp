import {
  compose,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import {
  getStateData,
  isEmployer,
  isApplicant
} from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import {
  getEmployerGuests,
  getApplicantGuests,
  fetchItemGuestList,
  fetchResumeList
} from 'routes/user/actions'
import Guests from './Guests'

const mapStateToProps = (state, { userData }) => {
  if (isEmployer(userData)) return getStateData('employer.guests', 'guests', state)
  return {
    ...getStateData('resume.list', 'resume', state),
    ...getStateData('resume.guests', 'guests', state)
  }
}

export default compose(
  withHistory,
  connect(mapStateToProps, {
    getEmployerGuests,
    getApplicantGuests,
    fetchItemGuestList,
    fetchResumeList
  }),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        if (isEmployer(props.userData)) props.getEmployerGuests()
        if (isApplicant(props.userData)) props.fetchResumeList()
      })
    props$
      .filter(props => isApplicant(props.userData))
      .distinctUntilChanged(null, props => props.guestsFilter.filterRequest())
      .subscribe(props => {
        const resumeId = props.guestsFilter.getParam('switcher')
        if (resumeId) {
          return props.fetchItemGuestList(resumeId)
        }
        return props.getApplicantGuests()
      })
    return props$
  }),
  excludeKeys([
    'getEmployerGuests',
    'getApplicantGuests',
    'fetchItemGuestList',
    'fetchResumeList'
  ])
)(Guests)
