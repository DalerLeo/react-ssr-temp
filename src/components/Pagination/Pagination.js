import { WHITE_COLOR, MAIN_COLOR } from 'constants/styles'
import React from 'react'
import injectSheet from 'react-jss'
import withHistory from 'helpers/withHistory'
import fpMap from 'lodash/fp/map'
import fpGet from 'lodash/fp/get'
import curryRight from 'lodash/curryRight'
import { compose, lifecycle } from 'recompose'
import PropTypes from 'prop-types'
import PaginationAnt from 'antd/lib/pagination/Pagination'

const reff = React.createRef()
const withStyles = {
  showMore: {
    background: WHITE_COLOR,
    borderRadius: '4px',
    fontSize: '13px',
    lineHeight: '42px',
    height: '42px',
    marginTop: '5px',
    textAlign: 'center',
    '& .ant-pagination ': { lineHeight: '42px' },
    '& .ant-pagination-prev': { display: 'none' },
    '& .ant-pagination-next': { display: 'none' },
    '& .ant-pagination-item': {
      minWidth: '26px',
      height: '29px',
      '& span': {
        cursor: 'pointer',
        minWidth: '28px',
        padding: '0 4px',
        height: '28px',
        fontSize: '15px',
        fontFamily: '\'Montserrat\', sans-serif',
        lineHeight: '29px',
        borderRadius: '4px',
        display: 'inline-block'
      },
      margin: '0',
      border: 'none'
    },
    '& .ant-pagination-item-active': {
      '& span': {
        color: '#fff !important',
        background: MAIN_COLOR
      }
    }
  }
}

const enhance = compose(
  injectSheet(withStyles),
  withHistory,
  lifecycle({
    componentDidMount () {
      const elems = fpGet('current.firstChild.childNodes', reff)
      fpMap(el => {
        el.title = ''
        return null
      }, elems)
    }
  })
)
const onChange = (item, { history, filter }, smooth) => {
  const params = filter.getParams({ page: item })
  const query = filter.createURL(params)
  return history.push(query, { smooth })
}

const itemRender = curryRight((current, type, originalElement, classes) => {
  if (type === 'jump-prev') return null
  if (type === 'jump-next') return null
  if (type === 'next') return null
  if (type === 'prev') return null

  if (type === 'page') {
    return <span>
      {current}
    </span>
  }
  return originalElement
})

const Pagination = enhance(props => {
  const { classes, filter, smooth } = props
  const itemCount = filter.getCounts()

  if (!itemCount) return null

  const page = filter.getCurrentPage()
  const pageSize = filter.getPageRange()

  return (
    <div className={classes.showMore} ref={reff}>
      <PaginationAnt
        pageSize={pageSize}
        current={page}
        total={itemCount}
        itemRender={itemRender(classes)}
        defaultCurrent={1}
        hideOnSinglePage={true}
        onChange={(v) => onChange(v, props, smooth)}
      />
    </div>
  )
})
Pagination.propTypes = {
  filter: PropTypes.object.isRequired,
  classes: PropTypes.object,
  smooth: PropTypes.bool
}

export default Pagination
