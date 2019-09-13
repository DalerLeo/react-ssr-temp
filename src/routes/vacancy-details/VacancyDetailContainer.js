import {
  compose,
  mapPropsStream,
  pure,
  withState,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import fp from 'lodash/fp'
import { getFormValues } from 'redux-form'
import {
  getItemStateData,
  getStateData,
  getStateLoading
} from 'helpers/get'
import setGlobalLoader from 'helpers/setGlobalLoader'
import withHistory from 'helpers/withHistory'
import toast from 'helpers/toast'
import {
  vacancyFetchItem,
  vacancyAppealCreate,
  vacancyFavCreate,
  vacancyFavDelete
} from './actions'
import { fetchResumeList } from 'routes/user/actions'
import { getVacancyList } from 'routes/home/actions'
import VacancyDetail from './VacancyDetail'
import { setPageTitle } from 'helpers/dom'

const mapStateToProps = (state) => {
  return {
    ...getItemStateData('vacancy.item', 'vacancy', state),
    ...getStateData('vacancy.list', 'vacancy', state),
    ...getStateData('resume.list', 'resume', state),
    ...getStateLoading('vacancy.favCreate', 'fav', state),
    appealForm: getFormValues('AppealForm')(state)
  }
}

const mapDispatchToProps = {
  vacancyFetchItem,
  getVacancyList,
  setGlobalLoader,
  fetchResumeList,
  vacancyAppealCreate,
  vacancyFavCreate,
  vacancyFavDelete
}

export default compose(
  withHistory,
  withState('appealOpen', 'setAppealOpen', false),
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(fp.get('id'))
      .distinctUntilChanged(null, fp.get('id'))
      .subscribe(props => {
        props.setGlobalLoader(true)
        return props.vacancyFetchItem(props.id)
          .then(({ value }) => {
            setPageTitle(value.title, props.isServer)
            const specialities = fp.flow(
              fp.get('specialities'),
              fp.map(fp.get('id')),
              fp.join('-')
            )(value)
            props.setGlobalLoader(false)
            props.getVacancyList({
              pageSize: 5,
              specialities,
              exclude: value.id
            })
          })
      })

    const { handler: onAppeal, stream: onAppeal$ } = createEventHandler()
    const { handler: onFav, stream: onFav$ } = createEventHandler()

    onAppeal$
      .withLatestFrom(props$)
      .subscribe(([, { id, appealForm, vacancyDetail: { data }, ...props }]) => {
        props.vacancyAppealCreate(id, appealForm, fp.get('questions', data))
          .then(() => {
            props.setAppealOpen(false)
            props.vacancyFetchItem(id)
          })
          .then(() => toast({
            title: 'Успешно',
            message: 'Вы откликнулись на эту вакансию'
          }))
          .catch((error) => {
            const errorText = fp.flow(
              fp.map(fp.flatten),
              fp.join('<br />')
            )(error)
            toast({
              title: 'Ошибка',
              message: errorText,
              type: 'error'
            })
          })
      })

    onFav$
      .withLatestFrom(props$)
      .subscribe(([, { id, vacancyDetail, ...props }]) => {
        const isFav = fp.get('data.isFavorite', vacancyDetail)
        if (isFav) {
          return props.vacancyFavDelete(id)
            .then(() => props.vacancyFetchItem(id))
            .then(() => props.actionSuccess())
        }

        return props.vacancyFavCreate(id)
          .then(() => props.vacancyFetchItem(id))
          .then(() => props.actionSuccess())
      })

    return props$.combineLatest(props => {
      return {
        ...props,
        onAppeal,
        onFav
      }
    })
  }),
  pure
)(VacancyDetail)
