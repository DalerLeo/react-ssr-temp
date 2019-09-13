import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import LoadingCard from './LoadingCard'
import { VACANCY } from './constants'

const CardList = props => {
  const {
    type,
    items,
    gutter,
    span,
    marginBottom,
    loading,
    margin
  } = props

  if (!loading) return null
  return (
    <Row gutter={gutter} style={{ margin }}>
      {_.map(_.range(items), (item, index) => (
        <Col key={index} xs={span} style={{ marginBottom }}>
          <LoadingCard type={type} marginBottom={true} data={item}/>
        </Col>
      ))}
    </Row>

  )
}

CardList.propTypes = {
  type: PropTypes.string,
  marginBottom: PropTypes.string,
  margin: PropTypes.string,
  span: PropTypes.number,
  small: PropTypes.bool,
  gutter: PropTypes.number,
  items: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}

CardList.defaultProps = {
  gutter: 0,
  span: 24,
  type: VACANCY
}

export default CardList
