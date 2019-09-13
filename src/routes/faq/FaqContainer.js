import {
  compose,
  mapPropsStream,
  pure
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import { getStateData } from 'helpers/get'
import { getFaqList } from './actions'
import Faq from './Faq'

const mapStateToProps = state => ({
  ...getStateData('faq', 'faq', state, false)
})

const mapDispatchToProps = { getFaqList }

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        props.getFaqList()
      })
    return props$
  }),
  pure
)(Faq)
