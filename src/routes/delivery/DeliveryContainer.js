import {
  compose,
  pure,
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'

import DeliverynWrapper from './Delivery'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {

}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  pure
)(DeliverynWrapper)
