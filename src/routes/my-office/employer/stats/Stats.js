import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import {
  crossBrowserify,
  fallbacksStyle,
  ANCHOR_DISABLED,
  LINK_COLOR,
  animationStyle
} from 'constants/styles'
import withHistory from 'helpers/withHistory'
import Title from 'components/Title'
import Container from 'components/Container'
import ServicesCarousel from 'components/ServicesCarousel'
import Chart from './Chart'
import GeneralStats from './GeneralStats'
import SuitableResumes from './SuitableResumes'
import News from './News'

const enhance = compose(
  withHistory,
  injectSheet({
    title: {
      ...crossBrowserify('justifyContent', 'space-between'),
      ...fallbacksStyle('display', 'flex'),
      textTransform: 'uppercase',
      color: LINK_COLOR,
      fontSize: '13px',
      fontWeight: '500',
      marginBottom: '24px',
      '& a': {
        ...ANCHOR_DISABLED,
        color: LINK_COLOR,
        textTransform: 'none',
        fontSize: '14px'
      }
    }
  })
)

const Stats = props => {
  const {
    classes,
    card,
    history,
    viewsStatsDetail,
    suitableResumeList,
    generalStatsDetail,
    articlesFilter,
    onChartPeriodChange,
    articlesList
  } = props

  return (
    <div style={animationStyle}>
      <Container>
        <Title isProfile={true} isStatic={true} text={'menu_emp_stat'}/>
        <Chart
          card={card}
          filter={articlesFilter}
          data={viewsStatsDetail}
          onChartPeriodChange={onChartPeriodChange}
        />
        <GeneralStats
          history={history}
          generalStats={generalStatsDetail}
        />
        <ServicesCarousel/>
        <SuitableResumes
          resumeData={suitableResumeList}
          titleClassName={classes.title}
        />
        <News
          data={articlesList}
          titleClassName={classes.title}
        />
      </Container>
    </div>
  )
}

Stats.propTypes = {
  classes: PropTypes.object,
  generalStatsDetail: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  card: PropTypes.node.isRequired,
  suitableResumeList: PropTypes.object.isRequired,
  onChartPeriodChange: PropTypes.func.isRequired,
  viewsStatsDetail: PropTypes.object.isRequired,
  articlesList: PropTypes.object.isRequired,
  articlesFilter: PropTypes.object
}
export default enhance(Stats)
