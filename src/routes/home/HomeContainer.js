import {
  compose,
  pure,
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'

import HomeWrapper from './Home'

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
)(HomeWrapper)
