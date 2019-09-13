import {
  pure,
  compose,
  withState,
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import fp from 'lodash/fp'
import { getItemStateData, getStateData } from 'helpers/get'
import { setPageTitle } from 'helpers/dom'
import {
  employerFetchItem,
  employerAppealCreateAction,
  toggleFavoriteEmployerAction
} from './actions'
import { getVacancyList } from 'routes/home/actions'
import setGlobalLoader from 'helpers/setGlobalLoader'
import withHistory from 'helpers/withHistory'
import toast from 'helpers/toast'
import VacancyDetail from './CompanyDetail'

const mapStateToProps = (state) => {
  return {
    ...getItemStateData('employer.item', 'employer', state),
    ...getStateData('vacancy.list', 'vacancy', state),
    appealFormValues: fp.get(['form', 'AppealForm', 'values'], state)
  }
}

const mapDispatchToProps = {
  employerFetchItem,
  getVacancyList,
  setGlobalLoader,
  employerAppealCreateAction,
  toggleFavoriteEmployerAction
}

export default compose(
  withHistory,
  withState('openAppeal', 'setOpenAppeal', false),
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    const { handler: onAppeal, stream: onAppeal$ } = createEventHandler()
    const { handler: onToggleFavorite, stream: onToggleFavorite$ } = createEventHandler()

    props$
      .filter(fp.get('id'))
      .distinctUntilChanged(null, fp.get('id'))
      .subscribe(props => {
        props.setGlobalLoader(true)
        return props.employerFetchItem(props.id)
          .then(({ value }) => {
            setPageTitle(value.title, props.isServer)
            props.setGlobalLoader(false)
            props.getVacancyList({
              pageSize: 100,
              employer: value.id
            })
          })
      })

    onAppeal$
      .withLatestFrom(props$)
      .subscribe(([value, props]) => {
        const data = {
          resume: fp.get(['appealFormValues', 'resume'], props),
          employer: fp.get('id', props)
        }
        return props.employerAppealCreateAction(data)
          .then(() => {
            props.setOpenAppeal(false)
            toast({
              title: 'Успешно',
              message: 'Вы откликнулись на эту компанию'
            })
          })
          .catch(() => {
            toast({
              title: 'Ошибка',
              message: 'Вы уже откликивались на эту компанию',
              type: 'error'
            })
          })
      })

    onToggleFavorite$
      .withLatestFrom(props$)
      .subscribe(([isFavorite, props]) => {
        const employer = fp.get('id', props)
        props.toggleFavoriteEmployerAction(employer, isFavorite)
          .then(() => {
            toast({
              title: isFavorite ? 'Добавлено' : 'Удалено',
              message: isFavorite ? 'Компания добавлена в избранные' : 'Компания удалена из избранных'
            })
            props.employerFetchItem(employer)
          })
      })

    return props$.combineLatest(props => ({
      ...props,
      onAppeal,
      onToggleFavorite
    }))
  }),
  pure
)(VacancyDetail)
