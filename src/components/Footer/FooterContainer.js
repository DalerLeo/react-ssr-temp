import {
  compose,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import { getStateData } from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import { getStaticPagesList } from 'routes/static-page/actions'
import Footer from './Footer'

const mapStateToProps = state => ({
  ...getStateData('staticPages.list', 'staticPages', state, false)
})

export default compose(
  connect(mapStateToProps, {
    getStaticPagesList
  }),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => props.getStaticPagesList())
    return props$
  }),
  excludeKeys(['getStaticPagesList'])
)(Footer)
