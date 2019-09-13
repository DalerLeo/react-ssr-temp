import Rx from 'rxjs'
import sprintf from 'sprintf'
import fp from 'lodash/fp'
import {
  compose, createEventHandler,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import { VACANCY_EDIT_VIEW } from 'constants/routes'
import withHistory from 'helpers/withHistory'
import caughtCancel from 'helpers/caughtCancel'
import { getItemStateData, getStateData, getStateLoading } from 'helpers/get'
import setGlobalNotify from 'helpers/setGlobalNotify'
import excludeKeys from 'helpers/excludeKeys'
import {
  fetchVacancyAppealedResumes,
  vacancyAppealedResumeChangeStatus,
  vacancyAppealedResumesCount,
  vacancyListFetch
} from 'routes/user/actions'
import Vacancies from './Vacancies'

const mapStateToProps = state => ({
  ...getStateData('vacancy.list', 'vacancy', state, true),
  ...getStateData('vacancy.appealedItem', 'appealedResume', state, true),
  ...getItemStateData('vacancy.appealedItemCount', 'appealedCount', state),
  ...getStateLoading('vacancy.appealedChangeStatus', 'appealedChangeStatus', state),
  query: fp.get('router.queries', state)
})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    setGlobalNotify,
    vacancyListFetch,
    vacancyAppealedResumeChangeStatus,
    fetchVacancyAppealedResumes,
    vacancyAppealedResumesCount
  }),
  mapPropsStream(props$ => {
    props$
      .distinctUntilChanged(null, props => {
        const { vacancyFilter } = props
        return vacancyFilter.filterRequest({
          appeal: null,
          from: null,
          to: null
        })
      })
      .subscribe(props => {
        const { vacancyFilter } = props
        const switcher = vacancyFilter.getParam('switcher') || 'active'
        const params = {
          is_active: switcher === 'active',
          is_temp: switcher === 'temp'
        }
        props.vacancyListFetch(params)
          .catch(caughtCancel)
      })

    props$
      .distinctUntilChanged(null, fp.get('query.appeal'))
      .filter(fp.get('query.appeal'))
      .subscribe(props => {
        const id = Number(fp.get('query.appeal', props))
        props.fetchVacancyAppealedResumes(id)
        props.vacancyAppealedResumesCount(id)
      })

    const HALF_SECOND = 500
    const { handler: onSearch, stream: onSearch$ } = createEventHandler()
    const { handler: onVacancyEdit, stream: onVacancyEdit$ } = createEventHandler()
    const { handler: onAppealedStatusChange, stream: onAppealedStatusChange$ } = createEventHandler()

    onSearch$
      .withLatestFrom(props$)
      .debounce(() => Rx.Observable.interval(HALF_SECOND))
      .subscribe(([{ value, type }, props]) => {
        if (type === 'vacancy') {
          props.vacancyListFetch({ search: value })
        }
      })

    onVacancyEdit$
      .withLatestFrom(props$)
      .subscribe(([id, { history }]) => {
        return history.push(sprintf(VACANCY_EDIT_VIEW, id, 'edit'))
      })

    onAppealedStatusChange$
      .withLatestFrom(props$)
      .subscribe(([{ id, data }, { ...props }]) => {
        return props.vacancyAppealedResumeChangeStatus(id, data)
          .then(() => props.setGlobalNotify())
          .then(() => props.fetchVacancyAppealedResumes(id))
          .then(() => props.vacancyAppealedResumesCount(id))
          .then(() => Promise.resolve(true))
      })

    return props$
      .map(props => {
        const {
          appealedResumeList,
          appealedCountDetail,
          appealedChangeStatusLoading
        } = props

        const vacancyData = {
          appealedResumeList,
          onAppealedStatusChange,
          appealedCountDetail,
          appealedChangeStatusLoading
        }
        return {
          onSearch,
          vacancyData,
          onVacancyEdit,
          ...props
        }
      })
  }),
  excludeKeys([
    'setGlobalNotify',
    'vacancyListFetch',
    'vacancyAppealedResumeChangeStatus',
    'fetchVacancyAppealedResumes',
    'vacancyAppealedResumesCount'
  ])
)(Vacancies)
