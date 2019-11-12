import {
  compose,
  pure,
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'

import SignInWrapper from './SignIn'

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
)(SignInWrapper)
