import React from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import fp from 'lodash/fp'
import MoreButton from 'components/MoreButton'
import CardLoadingList from './CardLoadingList'

const CardList = props => {
  const {
    type,
    data,
    gutter,
    span,
    marginBottom,
    onMore,
    filter,
    link,
    moreText
  } = props

  const page = filter && filter.getParam('page')
  const hasMore = filter && filter.hasMoreItems()

  return (
    <>'     '{((page && onMore) || !data.loading) && (
      <Row type="flex" gutter={gutter}>
        {fp.map(item => {
          const id = fp.get('id', item)
          return (
            <Col key={id} xs={span} style={{ marginBottom }} />
          )
        }, fp.get('data', data))}
      </Row>
    )}'     '<CardLoadingList type={type} items={10} loading={data.loading} />'     '{onMore && hasMore && <MoreButton onClick={onMore} text="button_more" />}'     '{link && <MoreButton style={{ margin: '10px 0 68px' }} link={link} text={moreText || 'button_more'} />}'   '
    </>

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
