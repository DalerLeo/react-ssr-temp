import React from 'react'
import styled from 'styled-components'
import { pathOr, path } from 'ramda'
import { Row, Col } from 'components/Grid'

const MyOrders = styled.div`
    display: flex;
`
const ProductCard = styled.div`
    background-color: #FFF;
    padding: 20px;
    margin-right: 10px;
    border-radius: 7px;
    border: 1px solid lightgrey;
    width: 900px;
    margin-bottom: 10px;
`
const ProductDetail = styled.div`
    background-color: #FFF;
    padding: 20px;
    margin-right: 10px;
    border-radius: 7px;
    border: 1px solid lightgrey;
    width: 300px;
    margin-bottom: 10px;
`
const ProductTitle = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 164.57%;
    color: #818591;
    margin-bottom: 10px;
`
const MyOrderList = (props) => {
  const { myOrderList } = props
  const data = pathOr([], ['data'], myOrderList)
  return (
    <div>
      {data.map((item, key) => {
        const totalPrice = path(['totalPrice'], item)
        const productItem = pathOr([], ['orderProducts'], item)
        return (
          <MyOrders key={key}>
            <ProductCard>
              <Row>
                <div>Заказ № {item.dealType} - {item.status}</div>
              </Row>
              <br />
              <Row>
                <Col span={4}>
                  <ProductTitle>ФОТО ТОВАРА</ProductTitle>
                </Col>
                <Col span={13}>
                  <ProductTitle>НАИМЕНОВАНИЕ ТОВАРА</ProductTitle>
                </Col>
                <Col span={4}>
                  <ProductTitle>КОЛИЧЕСТВО</ProductTitle>
                </Col>
                <Col span={3}>
                  <ProductTitle>ЦЕНА ЗА 1 ШТ.</ProductTitle>
                </Col>
              </Row>
              {productItem.map((productDetail, key1) => {
                const productName = path(['product', 'name'], productDetail)
                const productAmount = path(['amount'], productDetail)
                const productPrice = path(['price'], productDetail)
                return (
                  <>
                    <Row key={key1}>
                      <Col span={4}>
                        <div>image</div>
                      </Col>
                      <Col span={13}>
                        <div>{productName}</div>
                      </Col>
                      <Col span={4}>
                        <div>{productAmount}</div>
                      </Col>
                      <Col span={3}>
                        <div>{productPrice}</div>
                      </Col>
                    </Row>
                    <br />
                  </>
                )
              })}
            </ProductCard>
            <ProductDetail>
              <Row>
           Бесплатная доставка по Ташкенту
              </Row>
              <Row>
           Дата доставки: с 25 по 26 дек.
              </Row>
              <hr />
              <Row>
                <Col span={8}>Товары(2)</Col>
                <Col span={8} />
                <Col span={8}>5000 сум</Col>
              </Row>
              <Row>
                <Col span={8}> Доставка</Col>
                <Col span={8} />
                <Col span={8}>0 сум</Col>
              </Row>
              <Row>
                <Col span={8}> Итого</Col>
                <Col span={8} />
                <Col span={8}>{totalPrice} сум</Col>
              </Row>
              <Row>
                <Col span={6} />
                <Col span={12}>
                  Детали заказ
                </Col>
                <Col span={6} />
              </Row>
            </ProductDetail>
          </MyOrders>
        )
      })}

    </div>
  )
}

export default MyOrderList
