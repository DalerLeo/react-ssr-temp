import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure
} from 'recompose'
import fp from 'lodash/fp'
import { connect } from 'react-redux'
import { getItemStateData, getStateData } from 'helpers/get'
import { setPageTitle } from 'helpers/dom'
import setGlobalLoader from 'helpers/setGlobalLoader'
import { articleListFetch } from '../articles/actions'
import { articleItemFetch } from './actions'
import ArticleDetails from './ArticleDetails'

const mapStateToProps = (state) => {
  return {
    ...getItemStateData('article.item', 'article', state),
    ...getStateData('article.list', 'article', state)
  }
}

const mapDispatchToProps = {
  articleItemFetch,
  articleListFetch,
  setGlobalLoader
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(fp.get('id'))
      .distinctUntilChanged(null, fp.get('id'))
      .subscribe(props => {
        props.setGlobalLoader(true)
        props.articleListFetch({ pageSize: 3 })
        return props.articleItemFetch(props.id)
          .then(({ value }) => {
            setPageTitle(value.title, props.isServer)
            props.setGlobalLoader(false)
          })
      })

    return props$
  }),
  setDisplayName('ArticleDetailContainer'),
  pure
)(ArticleDetails)

