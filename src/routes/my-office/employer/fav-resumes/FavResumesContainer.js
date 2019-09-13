import Rx from 'rxjs'
import {
  compose, createEventHandler,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import { getStateData } from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import { resumeFavListFetch } from 'routes/resume/actions'
import FavResumes from './FavResumes'

const mapStateToProps = state => ({
  ...getStateData('resume.favList', 'resume', state, true)
})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    resumeFavListFetch
  }),
  mapPropsStream(props$ => {
    const HALF_SECOND = 500
    const { handler: onSearch, stream: onSearch$ } = createEventHandler()

    props$
      .first()
      .subscribe(props => {
        props.resumeFavListFetch()
      })

    onSearch$
      .withLatestFrom(props$)
      .debounce(() => Rx.Observable.interval(HALF_SECOND))
      .subscribe(([{ value, type }, props]) => {
        if (type === 'resume') {
          props.resumeFavListFetch({ search: value })
        }
      })

    return props$
      .map(props => {
        return {
          onSearch,
          ...props
        }
      })
  }),
  excludeKeys([
    'resumeFavListFetch'
  ])
)(FavResumes)
