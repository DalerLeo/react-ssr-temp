import { pure, compose, mapPropsStream } from 'recompose'
import _ from 'lodash'

export default keys => {
  return compose(
    mapPropsStream(props$ => {
      return props$.combineLatest(props => _.omit(props, keys))
    }),
    pure
  )
}
