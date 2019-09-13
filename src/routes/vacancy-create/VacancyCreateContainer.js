import fp from 'lodash/fp'
import sprintf from 'sprintf'
import {
  pure,
  compose,
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import { getFormValues, getFormSubmitErrors, change } from 'redux-form'
import { EMPLOYER_ITEM_URL, VACANCY_EDIT_VIEW } from 'constants/routes'
import toast from 'helpers/toast'
import withHistory from 'helpers/withHistory'
import formValidate from 'helpers/formValidate'
import setGlobalLoader from 'helpers/setGlobalLoader'
import { getItemStateData, getStateData, getStateLoading } from 'helpers/get'
import { scrollToBlock } from 'helpers/scroll'
import queryToParams from 'helpers/queryToParams'
import {
  getSpecialityList,
  countryListAction,
  languageListAction
} from '../action-common'
import { activateServicesAction } from '../services/actions'
import { vacancyActivateAction } from '../vacancy-details/actions'
import {
  createVacancyAction,
  updateVacancyAction,
  vacancyFetchItem,
  vacancyDeleteAction
} from './actions'
import {
  fetchVacancyAppealedResumes,
  vacancyAppealedResumesCount,
  vacancyAppealedResumeChangeStatus
} from 'routes/user/actions'
import VacancyCreate from './VacancyCreate'

const FROM = 0
const TO = 1
const mapDispatchToProps = {
  formValidate,
  vacancyFetchItem,
  createVacancyAction,
  updateVacancyAction,
  vacancyDeleteAction,
  getSpecialityList,
  countryListAction,
  languageListAction,
  setGlobalLoader,
  activateServicesAction,
  fetchVacancyAppealedResumes,
  vacancyAppealedResumesCount,
  vacancyAppealedResumeChangeStatus,
  vacancyActivateAction,
  changeForm: change
}

const mapStateToProps = (state) => {
  return {
    ...getItemStateData('vacancy.item', 'vacancy', state),
    ...getStateData('common.driverLicence', 'licence', state),
    ...getStateData('common.currency', 'currency', state),
    ...getStateData('common.speciality', 'speciality', state),
    ...getStateData('common.country', 'country', state),
    ...getStateData('common.language', 'language', state),
    ...getStateData('common.language', 'language', state),
    ...getStateData('userServices.unused', 'services', state, false),
    ...getStateData('service.employer', 'allServices', state, false),
    ...getItemStateData('user', 'user', state),
    formValues: getFormValues('VacancyCreate')(state) || {},
    submitErrors: getFormSubmitErrors('VacancyCreate')(state) || {},
    vacancyPromoteForm: getFormValues('VacancyPromote')(state) || {},
    vacancyArchiveForm: getFormValues('VacancyAchive')(state) || {},
    // Appeal data
    ...getStateData('vacancy.appealedItem', 'appealedResume', state, false),
    ...getItemStateData('vacancy.appealedItemCount', 'appealedCount', state),
    ...getStateLoading('vacancy.appealedChangeStatus', 'appealedChangeStatus', state)
  }
}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  pure,
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        if (props.id) {
          props.setGlobalLoader(true)
          props.vacancyFetchItem(props.id)
            .then(() => {
              props.setGlobalLoader(false)
            })
        }
      })

    props$
      .first()
      .filter(fp.flow(fp.get('specialityList.data'), fp.isEmpty))
      .subscribe(props => props.getSpecialityList({ pageSize: '1000', parentsOnly: 'false' }))

    props$
      .first()
      .filter(fp.flow(fp.get('languageList.data'), fp.isEmpty))
      .subscribe(props => props.languageListAction())

    props$
      .first()
      .subscribe(props => props.countryListAction({ type: 'city' }))

    props$
      .distinctUntilChanged(null, fp.get(['history', 'location', 'state', 'appeal']))
      .filter(fp.get(['history', 'location', 'state', 'appeal']))
      .subscribe(props => {
        const vacancy = Number(props.id)
        props.fetchVacancyAppealedResumes(vacancy)
        props.vacancyAppealedResumesCount(vacancy)
      })

    const { handler: onTabChange, stream: onTabChange$ } = createEventHandler()
    const { handler: onSubmit, stream: onSubmit$ } = createEventHandler()
    const { handler: onUpdate, stream: onUpdate$ } = createEventHandler()
    const { handler: onResumeLater, stream: onResumeLater$ } = createEventHandler()
    const { handler: onOpenAppeals, stream: onOpenAppeals$ } = createEventHandler()
    const { handler: onCloseAppeals, stream: onCloseAppeals$ } = createEventHandler()
    const { handler: onAppealedStatusChange, stream: onAppealedStatusChange$ } = createEventHandler()
    const { handler: onActivate, stream: onActivate$ } = createEventHandler()
    const { handler: onDelete, stream: onDelete$ } = createEventHandler()

    onOpenAppeals$
      .withLatestFrom(props$)
      .subscribe(([, { history, pathname, id }]) => {
        history.replace(pathname, { 'appeal': id })
      })

    onCloseAppeals$
      .withLatestFrom(props$)
      .subscribe(([, { history, pathname }]) => {
        history.replace(pathname, {})
      })

    onAppealedStatusChange$
      .withLatestFrom(props$)
      .subscribe(([{ data }, props]) => {
        const vacancy = Number(props.id)
        return props.vacancyAppealedResumeChangeStatus(vacancy, data)
          .then(() => props.fetchVacancyAppealedResumes(vacancy))
          .then(() => props.vacancyAppealedResumesCount(vacancy))
          .then(() => Promise.resolve(true))
      })

    onTabChange$
      .withLatestFrom(props$)
      .subscribe(([value, { history, tab, pathname, ...p }]) => {
        return history.replace(pathname, { 'smooth': true })
      })

    onUpdate$
      .withLatestFrom(props$)
      .subscribe(([value, props]) => {
        const { callBack, hash, vacancyType, orderServices } = value
        const { history, actionName, formValues, vacancyDetail } = props
        const withOrderServices = !fp.isEmpty(orderServices)
        if (actionName === 'edit') {
          const activeServices = fp.map(fp.get('code'), fp.get('data.activeServices'))
          const isActive = fp.get('data.isActive', vacancyDetail) ||
            fp.includes('ES5', activeServices) || fp.includes('ES7', activeServices) ||
            Boolean(vacancyType)
          return props.updateVacancyAction({ ...formValues, isActive }, props.id)
            .then(() => {
              toast({ title: 'Изменено', message: 'Изменения сохранены' })
              history.replace(props.pathname, { smooth: true })
              props.vacancyFetchItem(props.id)
              if (withOrderServices) {
                props.activateServicesAction(orderServices, { vacancy: props.id })
              }
            })
            .catch(error => {
              scrollToBlock(history, hash)
              return props.formValidate('VacancyCreate', error)
            })
        }
        return props.updateVacancyAction(formValues, props.id)
          .then(() => {
            scrollToBlock(history, hash)
            const hasCallBack = fp.isFunction(callBack)
            hasCallBack && callBack()
            props.setGlobalLoader(false)
          })
          .then(() => props.vacancyFetchItem(props.id))
          .catch(error => {
            scrollToBlock(history, hash)
            return props.formValidate('VacancyCreate', error)
          })
      })

    onSubmit$
      .withLatestFrom(props$)
      .subscribe(([{ callBack, hash }, { formValues, vacancyDetail, history, actionName, ...props }]) => {
        props.setGlobalLoader(true)
        const vacancyType = fp.get('vacancyType', formValues)
        const orderServices = fp.flow(
          fp.concat(vacancyType),
          fp.filter(item => item)
        )(fp.get('orderServices', formValues))
        const withOrderServices = !fp.isEmpty(orderServices)

        if (props.id) {
          return onUpdate({
            vacancyType,
            orderServices,
            callBack,
            hash
          })
        }
        const createParams = {
          ...formValues,
          isActive: Boolean(vacancyType),
          isTemp: !vacancyType
        }
        return props.createVacancyAction(createParams)
          .then(({ value }) => {
            if (withOrderServices) {
              props.activateServicesAction(orderServices, { vacancy: value.id })
            }
            history.replace({
              pathname: sprintf(VACANCY_EDIT_VIEW, value.id, 'view'),
              state: { smooth: true }
            })
            props.vacancyFetchItem(value.id)
          })
          .then(() => props.setGlobalLoader(false))
          .catch(error => {
            props.setGlobalLoader(false)
            return props.formValidate('VacancyCreate', error)
          })
      })

    onResumeLater$
      .withLatestFrom(props$)
      .subscribe(([, props]) => {
        const { formValues } = props
        props.createVacancyAction({ ...formValues, isActive: false, isTemp: true })
          .then(() => props.history.replace({
            pathname: sprintf(EMPLOYER_ITEM_URL, 'vacancy'),
            search: queryToParams({
              switcher: 'archive'
            })
          }))
          .catch(error => {
            props.history.replace(props.history.location.pathname, { smooth: true })
            return props.formValidate('VacancyCreate', error)
          })
      })

    onActivate$
      .withLatestFrom(props$)
      .subscribe(([{ callBack, service }, props]) => {
        const id = fp.toInteger(props.id)
        props.vacancyActivateAction(id)
          .then(() => {
            props.setGlobalLoader(true)
            props.activateServicesAction([service], { vacancy: id })
              .then(() => {
                callBack()
                props.setGlobalLoader(false)
                props.vacancyFetchItem(id)
              })
          })
      })

    onDelete$
      .withLatestFrom(props$)
      .subscribe(([callBack, props]) => {
        const id = fp.toInteger(props.id)
        return props.vacancyDeleteAction(id)
          .then(() => {
            callBack()
            toast({
              title: 'Удалено',
              message: 'Вакансия удалена'
            })
            props.history.goBack()
          })
      })

    return props$.combineLatest(props => {
      const {
        id,
        history,
        vacancyDetail,
        appealedResumeList,
        appealedCountDetail,
        appealedChangeStatusLoading
      } = props

      const vacacncyAppealData = {
        appealedResumeList,
        appealedCountDetail,
        appealedChangeStatusLoading,
        openAppeals: Boolean(fp.get(['location', 'state', 'appeal'], history)),
        onOpenAppeals,
        onCloseAppeals,
        onAppealedStatusChange
      }

      const isUpdate = Boolean(id)
      const initialValues = (() => {
        const data = fp.get('data', vacancyDetail)
        const languages = fp.get('languageRequirements', data)
        const languageRequirements = fp.isEmpty(languages)
          ? [{}]
          : fp.map(item => ({
            language: item.language.id,
            level: item.level
          }), languages)

        const ages = fp.split('-', fp.get('age', data))
        const bonus = fp.split('-', fp.get('bonus', data))
        const experience = fp.get('experience', data)
        return isUpdate
          ? {
            isActive: fp.get('isActive', data),
            specialities: fp.map(i => i.id, fp.get('specialities', data)),
            sphere: fp.get('industry.id', data),
            questions: fp.get('questions', data),
            salaryFrom: fp.get('salaryFrom', data),
            salaryTo: fp.get('salaryTo', data),
            driverLicences: fp.map(i => i.id, fp.get('driverLicences', data)),
            place: fp.get('place.id', data),
            duties: fp.get('duties', data),
            educationLevel: fp.get('educationLevel', data),
            gender: fp.get('gender', data),
            employmentType: fp.get('employmentType', data),
            currency: fp.get('currency.id', data),
            from: ages[FROM],
            to: ages[TO],
            bonus,
            experience: experience ? String(experience) : experience,
            requirements: fp.get('requirements', data),
            computerKnowledge: fp.get('computerKnowledge', data),
            compLiteracyLevel: fp.get('compLiteracyLevel', data),
            languageRequirements,
            additionalInformation: fp.get('additionalInformation', data),
            title: fp.get('title', data)
          }
          : {
            languageRequirements: [{}],
            currency: '2'
          }
      })()

      return {
        ...props,
        id,
        initialValues,
        isUpdate,
        onTabChange,
        onSubmit,
        onResumeLater,
        vacacncyAppealData,
        onActivate,
        onDelete
      }
    })
  }),
  pure
)(VacancyCreate)
