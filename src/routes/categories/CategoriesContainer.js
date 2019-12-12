import * as STATE from 'constants/stateNames'
import React from 'react'
import useFetchList from '../../hooks/useFetchList'
import Categories from './Categories'

import { getProductCategoryList, filterListFetch } from './actions'

const CategoryContainer = ({ id, ...props }) => {
  const mapper = (history, params) => {
    return { type: id }
  }

  const productCategoryData = useFetchList({
    action: getProductCategoryList,
    stateName: STATE.PRODUCT_CATEGORY_LIST,
    mapper
  })

  console.warn(productCategoryData)

  const filterData = useFetchList({
    action: filterListFetch,
    stateName: STATE.FILTER_LIST,
    mapper
  })

  return <Categories productCategoryData={productCategoryData} filterData={filterData} />
}

export default CategoryContainer
