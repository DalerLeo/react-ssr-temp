import * as STATE from 'constants/stateNames'
import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import History from '../../HistoryProvider'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import { replaceParamsRoute } from '../../utils/route'
import { getDataFromState, getParamsFormHistory } from '../../utils/get'
import { removeItemFromParams } from '../../utils/urls'
import Categories from './components/Categories'
import { getProductCategoryList, filterListFetch } from './actions'

const filterMapper = (type) => {
  return { type }
}
const getFilterParams = (id) => {
  const changeListener = (history, pickParams) => {
    return { type: id }
  }
  return {
    action: filterListFetch,
    changeListener,
    stateName: STATE.FILTER_LIST,
    mapper: () => filterMapper(id)
  }
}

const getProductParams = (id) => {
  const mapper = (_, params) => {
    return { type: id, ...params }
  }

  const changeListener = (history, pickParams) => {
    const params = getListParams(history, pickParams)
    return { ...params, type: id }
  }
  return {
    action: getProductCategoryList,
    stateName: STATE.PRODUCT_CATEGORY_LIST,
    mapper,
    changeListener,
    pickParams: ['brand', 'country', 'option', 'page', 'ordering']
  }
}

const SPLITTER = '-'
const CategoriesContainer = props => {
  const { id, pathname, query } = props

  const history = useContext(History)
  const queryParams = getParamsFormHistory(history)
  const { results: menuItems } = useSelector(getDataFromState(STATE.MENU_AS), equals)
  const productData = useFetchList(getProductParams(id))
  const filterData = useFetchList(getFilterParams(id))

  const onReset = () => history.push(pathname)
  const onItemReset = (key, value) => {
    const restIds = removeItemFromParams(query, key, value)
    replaceParamsRoute({ [key]: restIds }, history)
  }
  const onChange = useCallback((name, ids) => {
    const selectedProducts = ids.join(SPLITTER)
    replaceParamsRoute({ [name]: selectedProducts }, history)
  }, [])

  const filterActions = {
    ...filterData,
    queryParams,
    onChange,
    onReset,
    onItemReset
  }

  return (
    <Categories
      productData={productData}
      filterData={filterActions}
      menuItems={menuItems}
      id={Number(id)}
    />
  )
}

CategoriesContainer.propTypes = {
  id: PropTypes.string,
  pathname: PropTypes.string,
  query: PropTypes.object
}

export default CategoriesContainer
