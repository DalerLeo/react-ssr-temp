import * as STATE from 'constants/stateNames'
import React from 'react'
import styled from 'styled-components'
import { path, find, propEq } from 'ramda'
import Header from 'components/UI/Header'
import ContainerUI from 'components/StyledElems/Container'
import ProductCard from 'components/Cards/ProductCard'
import Pagination from 'components/Pagination'
import Skelet from 'components/UI/Skelet/Skelet'
import { Row, Col } from 'components/Grid'
import { useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import { getDataFromState } from 'utils/get'
import Filter from './Filter'

const Container = styled(ContainerUI)`
   display: flex;
   justify-content: center;
`

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100%)
`

const Categories = (props) => {
  const { productCategoryData, filterData, onChange, id } = props

  const menuData = useSelector(getDataFromState(STATE.MENU_AS), equals)
  const menuItem = path(['results'], menuData)
  const titleItem = find(propEq('id', id))(menuItem)
  const titleName = path(['name'], titleItem)
  const items = path(['results'], productCategoryData)
  const count = path(['data', 'count'], productCategoryData)
  const loading = path(['loading'], productCategoryData)

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col span={5}>
            <Filter {...filterData} onChange={onChange} />
          </Col>
          <Col span={1} />
          <Col span={18}>
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
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Categories
