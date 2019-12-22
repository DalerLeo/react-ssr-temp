import * as STATE from 'constants/stateNames'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import History from '../../HistoryProvider'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import { replaceParamsRoute } from '../../utils/route'
import { getDataFromState, getParamsFormHistory } from '../../utils/get'
import { removeItemFromSelect, removeItemFromParams } from '../../utils/urls'
import Categories from './components/Categories'
import { getProductCategoryList, filterListFetch } from './actions'

const filterMapper = (type) => {
  return { type }
}
const getFilterParams = (id) => {
  const changeListener = (history, pickParams) => {
    const params = getListParams(history, pickParams)
    return { ...params, type: id }
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
    pickParams: ['brand', 'country', 'option', 'page']
  }
}

const CategoriesContainer = props => {
  const { id, pathname, query } = props

  const history = useContext(History)
  const queryParams = getParamsFormHistory(history)
  const { results: menuItems } = useSelector(getDataFromState(STATE.MENU_AS), equals)
  const productCategoryData = useFetchList(getProductParams(id))
  const filterData = useFetchList(getFilterParams(id))

  const onChange = (name, ids) => {
    const selectedProducts = ids.join('-')
    replaceParamsRoute({ [name]: selectedProducts }, history)
  }

  const onReset = () => history.push(pathname)
  const onItemReset = (key, value) => {
    const restIds = removeItemFromParams(query, key, value)
    replaceParamsRoute({ [key]: restIds }, history)
  }
  const filterActions = {
    ...filterData,
    queryParams,
    onChange,
    onReset,
    onItemReset
  }
  return (
    <Categories
      productCategoryData={productCategoryData}
      filterData={filterActions}
      menuItems={menuItems}
      id={Number(id)}
    />
  )
}

CategoriesContainer.propTypes = {
  id: PropTypes.string,
  pathname: PropTypes.string
}

export default CategoriesContainer
