import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { path, prop } from 'ramda'
import Container from 'components/StyledElems/Container'
import { ChevronButton } from 'components/UI/Button'
import Pagination from 'components/Pagination'
import { Row, Col } from 'components/Grid'
import { getItemFromTree } from 'utils/get'
import BorderSplitter from 'components/UI/BorderedSplitter/BorderedSplitter'
import ProductCardListNew from '../../../components/Cards/ProductCardListNew'
import Filter from './Filter'

const ContainerWrapper = styled.div`
  background-color: #fff;
 padding-top: 70px;
`
const Pages = styled.div`
  text-align: center;
  margin-top: 20px;
`
const Categories = (props) => {
  const {
    productData,
    filterData,
    menuItems,
    id
  } = props

  const category = getItemFromTree(menuItems, id)
  const categoryName = prop('name', category)
  const items = path(['results'], productData)
  const count = path(['data', 'count'], productData)
  const loading = path(['loading'], productData)
  return (
    <ContainerWrapper>
      <Container>
        <Row gutter={50}>
          <Col span={5} minWidth="250">
            <Filter {...filterData} />
          </Col>
          <Col span={18}>
            <BorderSplitter left={categoryName}>
              <ChevronButton label="по цене" value="price" />
            </BorderSplitter>
            <Row gutter={20}>
              <Col span={3} />
              <Col span={14} />
            </Row>
            <br />
            <ProductCardListNew list={items} loading={loading}/>
            <Pages>
              <Pagination count={count} pageSize={12} />
            </Pages>
          </Col>
        </Row>
      </Container>
    </ContainerWrapper>
  )
}

Categories.propTypes = {
  productData: PropTypes.object,
  filterData: PropTypes.object,
  onChange: PropTypes.func,
  id: PropTypes.number,
  menuItems: PropTypes.array
}
export default Categories
