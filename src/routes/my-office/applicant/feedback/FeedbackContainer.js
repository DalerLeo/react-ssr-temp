import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { fetchAppealedVacancies } from 'routes/user/actions'
import Feedback from './Feedback'
import { getStateData } from 'helpers/get'

const mapStateToProps = state => ({
  ...getStateData('vacancy.appealedList', 'appeal', state)
})

export default compose(
  connect(mapStateToProps, { fetchAppealedVacancies }),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        props.fetchAppealedVacancies()
      })

    return props$
  })
)(Feedback)
