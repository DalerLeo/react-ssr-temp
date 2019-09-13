import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { fetchAppealedCompanies } from 'routes/user/actions'
import FeedbackWork from './FeedbackWork'
import { getStateData } from 'helpers/get'

const mapStateToProps = state => ({
  ...getStateData('chat.list', 'appeal', state, true)
})

export default compose(
  connect(mapStateToProps, { fetchAppealedCompanies }),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        props.fetchAppealedCompanies()
      })

    return props$
  })
)(FeedbackWork)
