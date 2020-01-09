import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { path, prop } from 'ramda'
import Container from 'components/StyledElems/Container'
import { ChevronButton } from 'components/UI/Button'
import ProductCard from 'components/Cards/ProductCard'
import Pagination from 'components/Pagination'
import Skelet from 'components/UI/Skelet/Skelet'
import { Row, Col } from 'components/Grid'
import { getItemFromTree } from 'utils/get'
import Filter from './Filter'

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%
`

const Pages = styled.div`
  text-align: center;
  margin-top: 20px;
`
const Categories = (props) => {
  const {
    productCategoryData,
    filterData,
    menuItems,
    id
  } = props

  const category = getItemFromTree(menuItems, id)
  const categoryName = prop('name', category)
  const items = path(['results'], productCategoryData)
  const count = path(['data', 'count'], productCategoryData)
  const loading = path(['loading'], productCategoryData)
  return (
    <div>
      <Container>
        <Row gutter={50}>
          <Col span={5} minWidth="250">
            <Filter {...filterData} />
          </Col>
          <Col span={18}>
            <Row>
              <h1>{categoryName}</h1>
            </Row>
            <Row gutter={20}>
              <Col span={3}>
                <ChevronButton />
              </Col>
              <Col span={4}>
                <ChevronButton />
              </Col>
              <Col span={14} />
            </Row>
            <br />
            <Row>
              {loading ? <Skelet count={9} col={3} />
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
            <Pages>
              <Pagination count={count} pageSize={12} />
            </Pages>
          </Col>
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
