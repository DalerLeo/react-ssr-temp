import fp from 'lodash/fp'
import {
  compose,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import excludeKeys from 'helpers/excludeKeys'
import withHistory from 'helpers/withHistory'
import { getItemStateData } from 'helpers/get'
import { getStaticPageItem } from './actions'
import StaticPage from './StaticPage'

const mapStateToProps = state => ({
  ...getItemStateData('staticPages.item', 'page', state)
})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    getStaticPageItem
  }),
  mapPropsStream(props$ => {
    props$
      .distinctUntilChanged(null, fp.get('params.child'))
      .subscribe(({ params, ...props }) => {
        props.getStaticPageItem(fp.get('child', params))
      })
    return props$
  }),
  excludeKeys([])
)(StaticPage)
