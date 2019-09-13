import loMap from 'lodash/map'
import fpGet from 'lodash/fp/get'
import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import Title from 'components/Title'
import Container from 'components/Container'
import Pagination from 'components/Pagination'
import ArticleCard from './ArticleCard'
import styles from './styles'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'

const enhance = compose(
  withState('openDialog', 'setOpenDialog', false),
  injectSheet(styles)
)

const Articles = props => {
  const { classes, articleFilter, articleList } = props
  const list = fpGet('data', articleList)
  const loading = fpGet('loading', articleList)
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.pageTitle}>
          <Title text={'Статьи'}/>
        </div>
        <Row type={'flex'} gutter={20}>
          {loMap(list, (item) => {
            return (
              <Col key={item.id} span={6} className={classes.articleWrapper}>
                <ArticleCard id={item.id} data={item}/>
              </Col>
            )
          })}
        </Row>
        <Pagination filter={articleFilter}/>
      </Container>
    </div>
  )
}

Articles.propTypes = {
  classes: PropTypes.object,
  articleFilter: PropTypes.object.isRequired,
  articleList: PropTypes.object.isRequired
}

export default enhance(Articles)
