import {
  compose,
  pure,
} from 'recompose'
import withHistory from '../../helpers/withHistory'

import HomeWrapper from './Home'

export default compose(
  withHistory,
  pure
)(HomeWrapper)
