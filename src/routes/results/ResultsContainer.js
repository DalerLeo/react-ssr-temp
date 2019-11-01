import fp from 'lodash/fp'
import {
  compose,
  mapPropsStream,
  createEventHandler,
  pure
} from 'recompose'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import withHistory from 'helpers/withHistory'
import toast from 'helpers/toast'
import { splitToArray, joinArray } from 'helpers/joinSplitValues'
import {
  getProfessionsList,
  getSpecialityListAll,
  getRegionsList
} from 'routes/home/actions'
import { languageListAction, getDriverLicenseList } from 'routes/action-common'
import { getStateData, compareFilterByProps } from 'helpers/get'
import setGlobalNotify from 'helpers/setGlobalNotify'
import excludeKeys from 'helpers/excludeKeys'
import { getSearchResults, saveSearchAction } from './actions'
import SearchResults from './SearchResults'

const ONE = 1
const mapStateToProps = (state) => {
  return {
    ...getStateData('common.specialityAll', 'professions', state, false),
    ...getStateData('searchList', 'result', state, true, '10'),
    ...getStateData('regions', 'regions', state, false),
    ...getStateData('common.language', 'languages', state, false),
    ...getStateData('common.driverLicence', 'driverLicense', state, false),
    resultCounts: fp.getOr({}, ['searchList', 'data', 'faceted'], state),
    formValues: getFormValues('SearchResultsForm')(state),
    searchValues: getFormValues('MainSearchForm')(state)
  }
}

const mapDispatchToProps = {
  getProfessionsList,
  getSpecialityListAll,
  getRegionsList,
  getSearchResults,
  saveSearchAction,
  setGlobalNotify,
  languageListAction,
  getDriverLicenseList
}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(fp.flow(fp.get('history.location.pathname'), fp.isEqual('/results')))
      .distinctUntilChanged((prev, next) => compareFilterByProps(prev, next, 'resultFilter'))
      .subscribe(props => {
        props.getSearchResults(props.resultFilter.getParams())
      })

    props$
      .first()
      .subscribe((props) => {
        props.getSpecialityListAll()
        props.getRegionsList('region')
        props.languageListAction({ pageSize: '20' })
        props.getDriverLicenseList()
      })

    const { handler: onMore, stream: onMore$ } = createEventHandler()
    const { handler: onClear, stream: onClear$ } = createEventHandler()
    const { handler: onSearch, stream: onSearch$ } = createEventHandler()
    const { handler: onSaveSearch, stream: onSaveSearch$ } = createEventHandler()
    const { handler: onFilterChange, stream: onFilterChange$ } = createEventHandler()

    onMore$
      .withLatestFrom(props$)
      .subscribe(([ev, { resultFilter, pathname, ...props }]) => {
        const page = fp.toInteger(resultFilter.getParam('page')) || ONE
        props.history.replace({
          pathname,
          search: resultFilter.getStringParams({ page: page + ONE })
        })
      })

    onFilterChange$
      .withLatestFrom(props$)
      .subscribe(([{ value, fieldName }, { resultFilter, pathname, ...props }]) => {
        if (fp.isArray(value)) {
          const filteredArray = fp.filter(item => item, value)
          return props.history.replace({
            pathname,
            search: resultFilter.getStringParams({
              [fieldName]: fp.join('-', filteredArray)
            })
          })
        }

        if (fieldName === 'type') {
          return props.history.replace({
            pathname,
            search: `type=${value}`
          })
        }

        return props.history.replace({
          pathname,
          search: resultFilter.getStringParams({ [fieldName]: value })
        })
      })

    onSaveSearch$
      .withLatestFrom(props$)
      .subscribe(([v, { resultFilter, searchValues, pathname, ...props }]) => {
        return props.saveSearchAction(resultFilter.getParams())
          .then(() => props.setGlobalNotify(true))
          .then(() => toast({
            title: 'Сохранено',
            message: 'Результаты поиска сохранены'
          }))
      })

    onSearch$
      .withLatestFrom(props$)
      .subscribe(([v, { resultFilter, searchValues, pathname, ...props }]) => {
        const text = fp.flow(fp.get('search'), fp.trim)(searchValues)
        return props.history.replace({
          pathname,
          search: resultFilter.getStringParams({ text })
        })
      })

    onClear$
      .withLatestFrom(props$)
      .subscribe(([{ fieldName, value }, { resultFilter, pathname, formValues, ...props }]) => {
        const selectedValue = fp.get(fieldName, formValues)
        const isArray = fp.isArray(selectedValue)
        if (fieldName === 'languages') {
          const newLangs = fp.flow(
            fp.filter(item => fp.get('language', item) !== value),
            fp.map(fp.get('language')),
            joinArray
          )(selectedValue)
          return props.history.replace({
            pathname,
            search: resultFilter.getStringParams({
              [fieldName]: newLangs
            })
          })
        }
        if (isArray) {
          const arr = fp.filter(v => !fp.equals(value)(v))(selectedValue)
          return props.history.replace({
            pathname,
            search: resultFilter.getStringParams({ [fieldName]: fp.join('-', arr) })
          })
        }

        return props.history.replace({
          pathname,
          search: resultFilter.getStringParams({ [fieldName]: '' })
        })
      })

    return props$
      .combineLatest(props => {
        const { resultFilter } = props

        const type = resultFilter.getParam('type') || 'vacancy'
        const experience = resultFilter.getParam('experience') || '0'
        const education = resultFilter.getParam('education') || '0'
        const gender = resultFilter.getParam('gender')
        const withPhoto = resultFilter.getParam('withPhoto')
        const maritalStatus = resultFilter.getParam('maritalStatus')
        const text = resultFilter.getParam('text') || ''
        const industries = splitToArray(resultFilter.getParam('industries'))
        const specialities = splitToArray(resultFilter.getParam('specialities'))
        const employmentType = fp.split('-', resultFilter.getParam('employmentType'))
        const region = resultFilter.getParam('region')
        const languages = splitToArray(resultFilter.getParam('languages'))
        const driverLicense = splitToArray(resultFilter.getParam('driverLicense'))

        const initialValues = {
          text,
          type,
          industries,
          specialities,
          experience,
          education,
          gender,
          maritalStatus,
          languages,
          driverLicense,
          employmentType,
          region: region === 'null' ? 'null' : fp.toInteger(region),
          withPhoto
        }
        return {
          ...props,
          text,
          type,
          onMore,
          onClear,
          onSearch,
          onSaveSearch,
          onFilterChange,
          initialValues
        }
      })
  }),
  excludeKeys([
    'getProfessionsList',
    'getRegionsList',
    'getSearchResults',
    'languageListAction',
    'getDriverLicenseList',
    'formValues'
  ]),
  pure
)(SearchResults)
