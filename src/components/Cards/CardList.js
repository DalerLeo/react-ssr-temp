import React from 'react'
import PropTypes from 'prop-types'
import { map, prop } from 'ramda'
import { Row, Col } from '../Grid'

const CardList = props => {
  const {
    data,
    gutter,
    span,
    marginBottom,
    onMore,
    filter
  } = props

  const page = filter && filter.getParam('page')

  return ((page && onMore) || !data.loading) &&
    (
      <Row gutter={gutter}>
        {map(item => {
          const id = prop('id', item)
          return (
            <Col key={id} xs={span} style={{ marginBottom }} />
          )
        }, prop('data', data))}
      </Row>
    )
}

CardList.defaultProps = {
  gutter: 0,
  span: 24,
  smooth: false
}

CardList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  filter: PropTypes.object,
  marginBottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  span: PropTypes.number,
  small: PropTypes.bool,
  page: PropTypes.string,
  link: PropTypes.string,
  moreText: PropTypes.any,
  gutter: PropTypes.number,
  onMore: PropTypes.func,
  smooth: PropTypes.bool
}

export default CardList
