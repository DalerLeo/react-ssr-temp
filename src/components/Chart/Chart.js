/* eslint-disable func-names */
import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import moment from 'moment'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import ReactHighcharts from 'react-highcharts'
import {
  crossBrowserify,
  fallbacksStyle,
  LINK_COLOR,
  ZERO
} from 'constants/styles'
import dateFormat from 'helpers/dateFormat'
import t from 'helpers/translate'
import StatDropDown from './StatDropDown'

const enhance = compose(
  injectSheet({
    chartWrap: {
      ...crossBrowserify('boxShadow', '0 5px 12px 2px rgba(0, 0, 0, 0.04)'),
      background: '#fff',
      borderRadius: '4px',
      padding: '36px 30px',
      '& .highcharts-point': {
        'y': '8'
      },
      '& .highcharts-axis-labels': {
        fontFamily: 'Montserrat'
      }
    },
    statHeader: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between')
    },
    statTitle: {
      fontWeight: '500',
      textTransform: 'uppercase',
      fontSize: '13px',
      letterSpacing: '0.5px',
      color: LINK_COLOR
    }
  })
)

const StatisticsChart = enhance(props => {
  const {
    lang,
    height,
    classes,
    title,
    data,
    filter,
    onChartPeriodChange
  } = props

  const list = fp.get('data', data)
  const loading = fp.get('loading', data)
  const byDate = fp.groupBy(fp.get('createdDay'), list)

  const datesList = loMap(byDate, (value, date) => dateFormat(date))
  const getViews = (action) => loMap(byDate, value => {
    return fp.flow(
      fp.find({ action }),
      fp.getOr(ZERO, 'totalViews')
    )(value)
  })
  const viewList = getViews('retrieve')
  const showList = getViews('list')

  const config = {
    chart: {
      type: 'areaspline',
      height: height,
      spacing: [ZERO, ZERO, ZERO, ZERO]
    },
    title: {
      text: '',
      style: {
        display: 'none'
      }
    },
    legend: {
      enabled: true,
      verticalAlign: 'top',
      align: 'left',
      itemStyle: {
        fontWeight: '400',
        color: '#8798ad',
        background: 'blue',
        fontFamily: 'Montserrat',
        fontSize: '14px'
      },
      style: {
        background: 'red',
        color: 'red'
      },
      symbolHeight: 7,
      symbolWidth: 7,
      margin: 0,
      itemMarginBottom: 40
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: datesList,
      gridLineColor: 'transparent',
      crosshair: false,
      tickmarkPlacement: 'on',
      title: {
        text: '',
        style: {
          display: 'none'
        }
      }
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: {
        text: '',
        style: {
          display: 'none'
        }
      }
    },
    plotOptions: {
      series: {
        lineWidth: 0,
        pointPlacement: 'on'
      },
      areaspline: {
        fillOpacity: 0.7
      }
    },
    tooltip: {
      shared: false,
      padding: 0,
      backgroundColor: '#5e77ff',
      style: {
        color: '#fff',
        fontSize: '14px',
        fontFamily: 'Montserrat',
        fontWeight: '500'
      },
      borderRadius: 4,
      borderWidth: 0,
      shadow: false,
      enabled: true,
      useHTML: true,
      crosshairs: [true],
      formatter: function () {
        return '<span style="padding:3px 20px; display: inline-block">' + this.y + '</b>'
      }
    },
    series: [{
      marker: {
        fillColor: '#fff',
        symbol: 'circle',
        radius: 1,
        width: 3,
        height: 3,
        enabled: false,
        lineWidth: 2,
        lineColor: 'linear-gradient(to left, rgba(94, 119, 255, 0.83), #5e77ff)'
      },
      name: t('emp_all_vacancy_view', lang),
      data: viewList,
      color: '#c887eb'
    },
    {
      marker: {
        fillColor: '#fff',
        symbol: 'circle',
        radius: 1,
        width: 1,
        height: 1,
        enabled: false,
        lineWidth: '10px',
        lineColor: 'linear-gradient(to left, rgba(94, 119, 255, 0.83), #5e77ff)'
      },
      name: t('emp_all_vacancy_show', lang),
      data: showList,
      color: '#5e77ff'
    }]
  }

  const week = moment().subtract('7', 'days').format('YYYY-MM-DD')
  const month = moment().format('YYYY-MM-01')
  const year = moment().format('YYYY-01-01')
  const onPeriod = (type) => {
    if (type === 'week') {
      return onChartPeriodChange(week)
    }
    if (type === 'month') {
      return onChartPeriodChange(month)
    }
    if (type === 'year') {
      return onChartPeriodChange(year)
    }

    return onChartPeriodChange(moment().format('YYYY-MM-DD'))
  }
  const periods = [
    {
      onClick: () => onPeriod('week'),
      text: 'emp_weekly',
      value: week
    },
    {
      onClick: () => onPeriod('month'),
      text: 'emp_monthly',
      value: month
    },
    {
      onClick: () => onPeriod('year'),
      text: 'emp_yearly',
      value: year
    },
    {
      onClick: () => null,
      text: 'emp_all_period'
    }
  ]
  const periodHeader = fp.flow(
    fp.find({ value: filter.getParam('from') }),
    fp.getOr('emp_weekly', 'text')
  )(periods)

  return (
    <div className={classes.chartWrap}>
      <div className={classes.statHeader}>
        <div className={classes.statTitle}>{title || t('emp_view_stat_graph', lang)}</div>
        <StatDropDown text={t(periodHeader, lang)}>
          <div>
            {loMap(periods, (item, index) => (
              <div key={index} onClick={item.onClick}>{t(item.text, lang)}</div>
            ))}
          </div>
        </StatDropDown>
      </div>
      <div style={{ height }}>
        {loading && 'LOADING...'}
        {!loading && <ReactHighcharts config={config} neverReflow={true} isPureConfig={true}/>}
      </div>
    </div>
  )
})

StatisticsChart.propTypes = {
  lang: PropTypes.string.isRequired,
  onChartPeriodChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
}

StatisticsChart.defaultProps = {
  height: '378px'
}

export default StatisticsChart
