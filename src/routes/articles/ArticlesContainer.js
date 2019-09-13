import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure
} from 'recompose'

import { connect } from 'react-redux'
import Articles from './Articles'
import { articleListFetch } from './actions'
import { getStateData } from 'helpers/get'

const mapStateToProps = (state) => {
  return {
    ...getStateData('article.list', 'article', state, true)
  }
}

const mapDispatchToProps = {
  articleListFetch
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => props.articleListFetch())
    return props$
  }),
  setDisplayName('ArtilesContainer'),
  pure
)(Articles)

