import {
  compose,
  pure,
} from 'recompose'
import { connect } from 'react-redux'

import DeliverynWrapper from './Delivery'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure
)(DeliverynWrapper)
