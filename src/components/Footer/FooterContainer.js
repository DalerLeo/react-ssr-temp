import {
  compose,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import { getStateData } from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import Footer from './Footer'

const mapStateToProps = state => ({
  ...getStateData('staticPages.list', 'staticPages', state, false)
})

export default compose(
  connect(mapStateToProps, {

  }),
  mapPropsStream(props$ => {
    return props$
  }),
  excludeKeys(['getStaticPagesList'])
)(Footer)
