import fp from 'lodash/fp'
import {
  compose,
  createEventHandler,
  mapPropsStream
} from 'recompose'
import moment from 'moment'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import { getItemStateData, getStateData } from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import { articleListFetch } from 'routes/articles/actions'
import { employerVacancyStatViewsFetch, getSuitableResumes } from 'routes/user/actions'
import Stats from './Stats'

const mapStateToProps = state => ({
  ...getStateData('resume.suitable', 'suitableResume', state, false),
  ...getStateData('article.list', 'articles', state, true),
  ...getItemStateData('employer.statVacancyViews', 'viewsStats', state)
})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    articleListFetch,
    getSuitableResumes,
    employerVacancyStatViewsFetch
  }),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        props.getSuitableResumes()
        props.articleListFetch({ pageSize: '4' })
      })

    props$
      .distinctUntilChanged((prev, next) => {
        const prevFilter = fp.get('articlesFilter', prev)
        const nextFilter = fp.get('articlesFilter', next)
        return prevFilter.getParam('from') === nextFilter.getParam('from')
      })
      .subscribe(({ articlesFilter, ...props }) => {
        const fromDate = articlesFilter.getParam('from') || moment().subtract('7', 'days').format('YYYY-MM-DD')
        const toDate = articlesFilter.getParam('to') || moment().format('YYYY-MM-DD')
        props.employerVacancyStatViewsFetch({ fromDate, toDate })
      })

    const { handler: onChartPeriodChange, stream: onChartPeriodChange$ } = createEventHandler()

    onChartPeriodChange$
      .withLatestFrom(props$)
      .subscribe(([value, { history, articlesFilter }]) => {
        const param = { from: value, to: moment().format('YYYY-MM-DD') }
        const url = articlesFilter.createURL(param)
        history.replace(url)
      })

    return props$
      .combineLatest(props => {
        return {
          ...props,
          onChartPeriodChange
        }
      })
  }),
  excludeKeys([
    'articleListFetch',
    'getSuitableResumes',
    'employerVacancyStatViewsFetch'
  ])
)(Stats)
