import React from 'react'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import loGet from 'lodash/get'
import injectSheet from 'react-jss'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import T from 'components/T'
import ArticleCard from 'routes/articles/ArticleCard'

const withStyles = injectSheet({
  news: {
    padding: '36px 0 75px',
    position: 'relative'
  },
  newsSide: {
    background: 'inherit',
    borderBottom: 'inherit',
    content: '""',
    position: 'absolute',
    top: '0',
    bottom: '-1px',
    width: '100%'
  }
})

const News = props => {
  const { classes, data, titleClassName } = props

  const list = loGet(data, 'data')

  return (
    <div className={classes.news}>
      <div className={titleClassName}><T>emp_nae</T></div>
      <Row type={'flex'} gutter={20}>
        {loMap(list, (item) => {
          return (
            <Col key={item.id} span={6}>
              <ArticleCard id={item.id} data={item}/>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

News.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  titleClassName: PropTypes.string
}

export default withStyles(News)
