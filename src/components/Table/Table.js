import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { CardLoadingList, SEARCH } from 'components/Cards'
import EmptyState from 'components/EmptyState'
import tableStyles from './tableStyles'

const withStyles = injectSheet(tableStyles)

const Table = props => {
  const { classes, header, list, loading, emptyStateText } = props

  const isEmpty = fp.isEmpty(list) && !loading

  return (
    <div className={classes.table}>
      <EmptyState data={list} loading={loading} text={emptyStateText} />
      {!isEmpty &&
      <Row type="flex" gutter={20} className={classNames(classes.row, classes.rowHeader)}>
        {loMap(header, (item, index) => {
          const size = fp.get('size', item)
          const title = fp.get('title', item)
          const alignRight = fp.get('right', item)
          return (
            <Col
              span={size} key={index} className={classNames(classes.column, {
                [classes.columnRight]: alignRight
              })}
            >{title}
            </Col>
          )
        })}
      </Row>}
      {loading ? <CardLoadingList type={SEARCH} items={5} loading={loading} /> : list}
    </div>
  )
}

Table.propTypes = {
  classes: PropTypes.object,
  header: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  emptyStateText: PropTypes.string
}

export default withStyles(Table)
