import _ from 'lodash'
import sprintf from 'sprintf'
import history from '../history'
import queryToParams from './queryToParams'

const ONE = 1
const DEF_PAGE_SIZE = 10
const filter = (data, pathname, query = {}, newKeys = {}, pageSize) => {
  const getKey = (key) => {
    const newItemKey = _.get(newKeys, key)
    if (newItemKey) {
      return newItemKey
    }
    return key
  }

  const params = query
  const first = 1
  const defaultPageRange = pageSize || DEF_PAGE_SIZE
  const currentPage = _.toInteger(_.get(params, getKey('page')) || first)
  const pageRange = _.toInteger(_.get(params, getKey('pageSize')) || defaultPageRange)
  const itemsCount = _.get(data, getKey('count'))
  const next = _.get(data, getKey('next'))

  const getNotNull = object => _.omitBy(object, (item) => {
    return _.isNull(item) || item === ''
  })
  const pageCount = Math.ceil(itemsCount / pageRange)

  const getParam = (paramName) => _.get(params, paramName)

  const getParams = (newParams) => _.assign({}, params, newParams)

  const getStringParams = (newParams) =>
    queryToParams(getNotNull(_.assign({}, params, newParams)))

  const getSelects = () => {
    return _
      .chain(getParam('select'))
      .split('-')
      .filter(item => item)
      .map((item) => _.toInteger(item))
      .value()
  }

  const paramsToQueryUrl = (paramsItems) => {
    if (_.isEmpty(paramsItems)) {
      return null
    }

    const url = _
      .chain(paramsItems)
      .keys()
      .map((key) => {
        return {
          key: key,
          value: paramsItems[key]
        }
      })
      .filter((item) => !_.isEmpty(item.value) || _.isNumber(item.value))
      .map((item) => {
        return sprintf('%s=%s', item.key, encodeURIComponent(item.value))
      })
      .reduce((result, item) => {
        return sprintf('%s&%s', result, item)
      })
      .value()

    return url ? '?' + url : null
  }

  const createURL = (newParams) => {
    const queryUrl = paramsToQueryUrl(_.assign({}, params, newParams))
    return queryUrl ? pathname + queryUrl : pathname
  }

  const prevPage = () => {
    const prevPageNumber = currentPage - first
    if (currentPage <= first) {
      return null
    }

    return createURL({ [getKey('page')]: prevPageNumber })
  }

  const hasMoreItems = () => Boolean(next)
  const nextPage = () => {
    const nextPageNumber = currentPage + first
    if (pageCount < nextPageNumber) {
      return null
    }
    return createURL({ [getKey('page')]: nextPageNumber })
  }

  const setNextPage = () => nextPage() && history.replace(nextPage())
  const setPrevPage = () => prevPage() && history.replace(prevPage())

  const getSortingType = (columnSortingName) => {
    const currentOrdering = _.get(params, 'ordering')

    const columnType = _
      .chain(currentOrdering)
      .split(',')
      .filter((item) => !_.isEmpty(item))
      .map((column) => ({ column: _.trimStart(column, '-'), desc: _.startsWith(column, '-') }))
      .find({ column: columnSortingName })
      .get('desc')
      .value()

    return _.isUndefined(columnType) ? null : columnType
  }

  const filteringURL = (filtering, buddy) => {
    const currentFilters = _.get(params, 'filter')
    const filters = _
      .chain(currentFilters)
      .split(',')
      .filter(item => {
        return _.isEmpty(item) || !_.includes(item, buddy)
      })
      .union([filtering])
      .filter(item => !_.isEmpty(item))
      .join(',')
      .value()

    const newParams = _.assign({}, params, { filter: filters })
    return createURL(newParams).substring(ONE)
  }

  const sortingURL = (columnSortingName, friend) => {
    const currentOrdering = _.get(params, 'ordering')

    const columnList = _
      .chain(currentOrdering)
      .split(',')
      .filter((item) => !_.isEmpty(item))
      .map((column) => ({ column: _.trimStart(column, '-'), desc: _.startsWith(column, '-') }))
      .value()

    const columnSortingType = _
      .chain(columnList)
      .find({ column: columnSortingName })
      .get('desc')
      .value()

    const columnSortingDesc = _.isUndefined(columnSortingType) ? false : (columnSortingType ? null : true)

    const ordering = _
      .chain(columnList)
      .filter((item) => item.column !== columnSortingName)
      .union([{ column: columnSortingName, desc: columnSortingDesc }])
      .filter((item) => !_.isNull(_.get(item, 'desc')))
      .map((item) => {
        return _.get(item, 'desc') ? '-' + _.get(item, 'column') : _.get(item, 'column')
      })
      .join(',')
      .value()
    return createURL({ ordering })
  }
  const clearOrdering = () => {
    const empty = ''
    return createURL({ 'ordering': empty })
  }

  const getCounts = () => itemsCount

  const getPageRange = () => pageRange

  const getCurrentPage = () => currentPage

  const pageItemList = () => _.range(first, pageCount + first)

  const hasPagination = () => pageCount > first

  const filterCompare = (except) => {
    const currentFilters = _.get(params, 'filter')
    const currentOrdering = _.get(params, 'ordering')

    const ordering = _
      .chain(currentOrdering)
      .split(',')
      .filter(item => {
        return !_.includes(item, except)
      })
      .join(',')
      .value()

    const filters = _
      .chain(currentFilters)
      .split(',')
      .filter(item => {
        return _.isEmpty(item) || !_.includes(item, except)
      })
      .join(',')
      .value()

    return paramsToQueryUrl(_.assign({}, params, { filter: filters, ordering }))
  }
  const filterRequest = (except) => {
    const defaultExcept = {
      select: null,
      openFilterDialog: null
    }
    //    Console.warn(_.merge(except, defaultExcept), params)
    return paramsToQueryUrl(_.assign({}, params, _.merge(except, defaultExcept)))
  }

  const filterBy = (newParams) => {
    const notNullParams = _.omitBy(newParams, (item) => {
      return _.isNull(item) || item === ''
    })
    const parsedParams = paramsToQueryUrl(_.assign({}, params, notNullParams))
    history.replace({
      pathname,
      search: parsedParams
    })
  }

  return {
    getParam,
    getStringParams,
    getParams,
    getKey,
    getCounts,
    getPageRange,
    getCurrentPage,
    getSortingType,
    getSelects,
    sortingURL,
    filterRequest,
    createURL,
    prevPage,
    nextPage,
    pageItemList,
    hasPagination,
    clearOrdering,
    filteringURL,
    filterCompare,
    filterBy,
    setNextPage,
    setPrevPage,
    hasMoreItems,
    pageCount
  }
}

export default filter
