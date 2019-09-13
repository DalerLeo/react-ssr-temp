import {
  compose,
  mapPropsStream,
  pure
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import { getStateData } from 'helpers/get'
import { getSubscriptionsList } from './actions'
import Subscription from './Subscription'

const mapStateToProps = state => ({

})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    getSubscriptionsList
  }),
  mapPropsStream(props$ => {
    // Props$
    //   .first()
    //   .subscribe(props => {
    //     Props.getFaqList()
    //   })
    return props$
  }),
  pure
)(Subscription)
