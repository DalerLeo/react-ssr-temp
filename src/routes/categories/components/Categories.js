import * as STATE from 'constants/stateNames'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { path, find, propEq } from 'ramda'
import Header from 'components/UI/Header'
import ContainerUI from 'components/StyledElems/Container'
import ProductCard from 'components/Cards/ProductCard'
import Pagination from 'components/Pagination'
import Skelet from 'components/UI/Skelet/Skelet'
import { Row, Col } from 'components/Grid'
import { getItemFromTree } from 'utils/get'
import Filter from './Filter'

const Container = styled(ContainerUI)`
   display: flex;
   justify-content: center;
`
const ColUI = styled(Col)`
  min-width: ${props => props.minWidth}px;
`
const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100%)
`

const Categories = (props) => {
  const {
    productCategoryData,
    filterData,
    menuItems,
    onChange,
    tagsData,
    id
  } = props

  const titleItem = find(propEq('id', id))(menuItems)
  const titleName = path(['name'], titleItem)
  const items = path(['results'], productCategoryData)
  const count = path(['data', 'count'], productCategoryData)
  const loading = path(['loading'], productCategoryData)
  const getList = '[]'
  const parsedList = JSON.parse(getList)

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <ColUI span={5} minWidth="250">
            <Filter
              {...filterData}
              tagsData={tagsData}
              onChange={onChange}
              parsedList={parsedList} />
          </ColUI>
          <ColUI span={1} minWidth="50" />
          <ColUI span={18} minWidth="900">
            <Row>
              <h1>{titleName}</h1>
            </Row>
            <Row>
              {loading ? <Skelet count={9} />
                : (
                  <ProductListBlock>
                    {items.map((item, key) => {
                      return (
                        <ProductCard key={key} item={item} column={3} />
                      )
                    })}
                  </ProductListBlock>
                )}
            </Row>
            <Row>
              <Pagination count={count} pageSize={12} />
            </Row>
          </ColUI>
        </Row>
      </Container>
    </div>
  )
}

Categories.propTypes = {
  productCategoryData: PropTypes.object,
  filterData: PropTypes.object,
  onChange: PropTypes.func,
  id: PropTypes.number,
  menuItems: PropTypes.array
}
export default Categories
