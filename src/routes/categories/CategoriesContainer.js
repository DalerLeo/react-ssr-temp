import * as STATE from 'constants/stateNames'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import History from '../../HistoryProvider'
import useFetchList from '../../hooks/useFetchList'
import { replaceParamsRoute } from '../../utils/route'
import { getDataFromState, getParamsFormHistory } from '../../utils/get'
import Categories from './components/Categories'
import { getProductCategoryList, filterListFetch } from './actions'

const filterMapper = (type) => {
  return { type }
}

const getProductParams = (id) => {
  const mapper = (_, params) => {
    return { type: id, ...params }
  }

  return {
    action: getProductCategoryList,
    stateName: STATE.PRODUCT_CATEGORY_LIST,
    mapper,
    pickParams: ['brand', 'country', 'option', 'page']
  }
}
const getFilterParams = (id) => {
  return {
    action: filterListFetch,
    stateName: STATE.FILTER_LIST,
    mapper: () => filterMapper(id)
  }
}
const CategoriesContainer = ({ id, ...props }) => {
  const history = useContext(History)
  const queryParams = getParamsFormHistory(history)
  const { results: menuItems } = useSelector(getDataFromState(STATE.MENU_AS), equals)
  const productCategoryData = useFetchList(getProductParams(id))
  const filterData = useFetchList(getFilterParams(id))

  const tagsData = {
    menuItems, queryParams
  }
  const onChange = (name, ids) => {
    const selectedProducts = ids.join('-')
    replaceParamsRoute({ [name]: selectedProducts }, history)
  }
  return (
    <Categories
      productCategoryData={productCategoryData}
      filterData={{...filterData, queryParams}}
      menuItems={menuItems}
      tagsData={tagsData}
      onChange={onChange}
      id={Number(id)}
    />
  )
}

CategoriesContainer.propTypes = {
  id: PropTypes.string
}

export default CategoriesContainer
