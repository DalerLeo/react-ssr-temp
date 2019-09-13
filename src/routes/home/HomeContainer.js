import _ from 'lodash'
import fp from 'lodash/fp'
import {
  compose,
  setDisplayName,
  mapPropsStream,
  pure,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { SEARCH_RESULTS_URL } from 'constants/routes'
import withHistory from 'helpers/withHistory'
import excludeKeys from 'helpers/excludeKeys'
import { getStateData, isEmployer, isApplicant } from 'helpers/get'
import queryToParams from 'helpers/queryToParams'
import {
  generalStatsFetch,
  getProfessionsList,
  getRegionsList,
  getEmployerList,
  getResumeList,
  getVacancyList,
  fetchPopularVacancyList
} from 'routes/home/actions'
import { articleListFetch } from 'routes/articles/actions'
import HomeWrapper from './Home'

const mapStateToProps = (state) => {
  return {
    userData: fp.get('user.data', state) || {},
    searchForm: getFormValues('MainSearchForm')(state),
    ...getStateData('stats', 'stats', state, false),
    ...getStateData('professions', 'professions', state, false),
    ...getStateData('regions', 'regions', state, false),
    ...getStateData('employer.list', 'employer', state, false),
    ...getStateData('resume.activeList', 'app', state, true),
    ...getStateData('vacancy.list', 'vacancy', state, false),
    ...getStateData('vacancy.popList', 'popVacancy', state, false),
    ...getStateData('article.list', 'articles', state, false)
  }
}

const mapDispatchToProps = {
  generalStatsFetch,
  getProfessionsList,
  getRegionsList,
  getEmployerList,
  getResumeList,
  getVacancyList,
  fetchPopularVacancyList,
  articleListFetch
}
const notLoading = flag => !flag

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        props.generalStatsFetch()
      })
    props$
      .filter(fp.flow(fp.get('professionsList.loading'), notLoading))
      .filter(fp.flow(fp.get('professionsList.failed'), notLoading))
      .filter(fp.flow(fp.get('professionsList.data'), fp.isEmpty))
      .subscribe(props => props.getProfessionsList())

    props$
      .filter(fp.flow(fp.get('regionsList.loading'), notLoading))
      .filter(fp.flow(fp.get('regionsList.failed'), notLoading))
      .filter(fp.flow(fp.get('regionsList.data'), fp.isEmpty))
      .subscribe(props => props.getRegionsList('region'))

    props$
      .first()
      .subscribe(props => props.fetchPopularVacancyList())

    props$
      .first()
      .subscribe(props => props.articleListFetch({ pageSize: 5 }))

    props$
      .distinctUntilChanged(null, fp.get('query.companyTab'))
      .subscribe(props => {
        const companyTab = fp.get('query.companyTab', props) || 'company-week'
        props.getEmployerList(companyTab)
      })

    props$
      .distinctUntilChanged(null, fp.get('query.tab'))
      .subscribe(props => {
        const tab = props.query.tab || 'vacancy'
        tab === 'vacancy' && props.getVacancyList()
        if (tab === 'specialist' || isEmployer(props.userData)) props.getResumeList()
      })

    const { handler: onMainTabChange, stream: onMainTabChange$ } = createEventHandler()
    const { handler: onCompanyTabChange, stream: onCompanyTabChange$ } = createEventHandler()
    const { handler: onSearch, stream: onSearch$ } = createEventHandler()

    onSearch$
      .withLatestFrom(props$)
      .subscribe(([tab, { history, searchForm }]) => {
        const text = fp.flow(
          fp.get('search'),
          fp.trim
        )(searchForm)
        const type = fp.get('type', searchForm) || ''
        history.push({
          pathname: SEARCH_RESULTS_URL,
          search: queryToParams({ type, text })
        })
      })

    onMainTabChange$
      .withLatestFrom(props$)
      .subscribe(([tab, { history, pathname, appFilter }]) => {
        history.replace({
          pathname,
          search: appFilter.getStringParams({ tab }) })
      })

    onCompanyTabChange$
      .withLatestFrom(props$)
      .subscribe(([companyTab, { history, pathname, appFilter }]) => {
        history.replace({
          pathname,
          search: appFilter.getStringParams({ companyTab }) })
      })

    return props$.combineLatest(({ userData, ...props }) => {
      const query = _.get(props, 'query')
      const mainTab = query.tab || 'vacancy'
      const companyTab = query.companyTab || 'company-week'

      const searchInitial = isEmployer(userData) ? 'resume' : 'vacancy'
      return {
        ...props,
        onSearch,
        searchInitial,
        isEmployer: isEmployer(userData),
        isApplicant: isApplicant(userData),
        mainTab: {
          onChange: onMainTabChange,
          value: mainTab
        },
        companyTab: {
          onChange: onCompanyTabChange,
          value: companyTab
        }
      }
    })
  }),
  excludeKeys([
    'generalStatsFetch',
    'fetchPopularVacancyList',
    'getProfessionsList',
    'getRegionsList',
    'getEmployerList',
    'getResumeList',
    'getVacancyList',
    'articleListFetch'
  ]),
  setDisplayName('HomeContainer'),
  pure
)(HomeWrapper)

