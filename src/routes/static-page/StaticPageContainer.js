import {
  compose
} from 'recompose'
import withHistory from '../../helpers/withHistory'
import StaticPage from './StaticPage'

export default compose(
  withHistory,
)(StaticPage)
