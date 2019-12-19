import * as STATE from 'constants/stateNames'
import React, { useContext } from 'react'
import History from '../../HistoryProvider'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import { replaceParamsRoute } from '../../utils/route'
import Categories from './Categories'
import { getProductCategoryList, filterListFetch } from './actions'

const CategoriesContainer = ({ id, ...props }) => {
  const history = useContext(History)

  const mapper = (history, params) => {
    return { type: id, ...params }
  }

  const filterMapper = (history, params) => {
    return { type: id }
  }

  const productCategoryData = useFetchList({
    action: getProductCategoryList,
    stateName: STATE.PRODUCT_CATEGORY_LIST,
    mapper,
    pickParams: ['brand', 'country', 'options']
  })
  const filterData = useFetchList({
    action: filterListFetch,
    stateName: STATE.FILTER_LIST,
    mapper: filterMapper
  })

  const onChange = (name, typeId) => {
    const selectedProducts = typeId.join('-')
    replaceParamsRoute({ [name]: selectedProducts }, history)
  }
  return <Categories productCategoryData={productCategoryData} filterData={filterData} onChange={onChange} id={Number(id)} />
}

export default CategoriesContainer
