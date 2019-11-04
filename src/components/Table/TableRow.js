import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import classNames from 'classnames'
import tableStyles from './tableStyles'

const withStyles = injectSheet(tableStyles)

const TableRow = props => {
  const { classes, columns, onClick, ...otherProps } = props
  return (
    <Row
      type="flex"
      gutter={20}
      className={classNames(classes.row, {
        [classes.rowClickable]: onClick
      })}
      onClick={onClick}
      {...otherProps}
    >
      {loMap(columns, (item, index) => {
        const size = fp.get('size', item)
        const content = fp.get('content', item)
        const alignRight = fp.get('right', item)
        return (
          <Col
            key={index} span={size} className={classNames({
              [classes.columnRight]: alignRight
            })}
          >{content}
          </Col>
        )
      })}
    </Row>
  )
}

TableRow.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  columns: PropTypes.array.isRequired
}

export default withStyles(TableRow)
