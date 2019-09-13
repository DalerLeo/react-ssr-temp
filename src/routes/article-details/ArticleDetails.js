import fpGet from 'lodash/fp/get'
import fpMap from 'lodash/fp/map'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { DATE_COLOR } from 'constants/styles'
import dateFormat from 'helpers/dateFormat'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import T from 'components/T'
import Container from 'components/Container'
import HtmlContent from 'components/HtmlContent'
import Title from 'components/Title'
import ArticleCard from 'routes/articles/ArticleCard'

const styles = {
  wrapper: {
    width: '862px',
    padding: '53px 0 56px 0',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '23px'
  },
  date: {
    marginTop: '14px',
    color: DATE_COLOR
  },
  content: {
    padding: '0 42px',
    lineHeight: '25px',
    fontSize: '15px',
    color: '#000',
    '& img': {
      width: '100%',
      margin: '5px 0'
    }
  }
}

const enhance = compose(
  withState('openDialog', 'setOpenDialog', false),
  injectSheet(styles)
)

const ArticleDetails = props => {
  const {
    classes,
    articleList,
    articleDetail: { data, loading }
  } = props

  const title = fpGet('title', data)
  const createdDate = dateFormat(fpGet('createdDate', data))
  const content = fpGet('content', data)
  const list = fpGet('data', articleList)

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Title margin={0} text={title}/>
          <div className={classes.date}><T>main_published_date</T> {createdDate}</div>
        </div>
        <div className={classes.content}>
          <HtmlContent>{content}</HtmlContent>
        </div>
        <Title margin={'30px 0 22px 0'} text={'Похожие статьи'}/>
        <Row type={'flex'} gutter={20}>
          {fpMap(item => (
            <Col key={item.id} span={8}>
              <ArticleCard smooth={true} id={item.id} data={item}/>
            </Col>
          ), list)}
        </Row>
      </div>
    </Container>
  )
}

ArticleDetails.propTypes = {
  classes: PropTypes.object,
  articleDetail: PropTypes.object.isRequired,
  articleList: PropTypes.object.isRequired,
  id: PropTypes.number
}

export default enhance(ArticleDetails)
