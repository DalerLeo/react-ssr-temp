import React from 'react'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import ReactHighcharts from 'react-highcharts'
import StatDropDown from './StatDropDown'
import { crossBrowserify, fallbacksStyle, LINK_COLOR } from 'constants/styles'
import Title from 'components/Title/Title'
import fp from 'lodash/fp'
import moment from 'moment'

const enhance = compose(
  injectSheet({
    chartWrap: {
    },
    chart: {
      background: '#fff',
      borderRadius: '4px',
      padding: '36px 30px',
      boxShadow: '0 5px 12px 2px rgba(0, 0, 0, 0.04)',
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

const StatisticsChart = enhance((props) => {
  const {
    height = '360px',
    classes,
    title,
    onChartPeriodChange,
    filter
  } = props

  const tooltipDate = ['1 Jan', '6 Jan', '12 Jan', '18 Jan', '22 Jan', '15 Jan', '28 Jan', '31 Jan']

  const config = {
    chart: {
      type: 'areaspline',
      height: height,
      spacing: [0, 0, 0, 0]
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
      categories: tooltipDate,
      tickmarkPlacement: 'on',
      title: {
        text: '',
        style: {
          display: ''
        }
      }
    },
    yAxis: {
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      gridLineColor: 'transparent'
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
      // PointFormat: '<b>{y.point}</b>'
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
      name: 'Просмотры всех вакансий',
      data: [0, 70, 40, 20, 87, 10, 10, 65],
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
      name: 'Показы всех вакансий',
      data: [0, 40, 30, 62, 44, 86, 10, 35],
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
      text: 'За неделю',
      value: week
    },
    {
      onClick: () => onPeriod('month'),
      text: 'За месяц',
      value: month
    },
    {
      onClick: () => onPeriod('year'),
      text: 'За год',
      value: year
    },
    {
      onClick: () => null,
      text: 'За весь период'
    }
  ]
  const periodHeader = fp.flow(fp.find({ value: filter.getParam('from') }), fp.getOr('За неделю', 'text'))(periods)

  return (
    <div className={classes.chartWrap}>
      <div className={classes.statHeader}>
        <Title medium={true} text={'Инженер комутационных сетей'}/>
        <StatDropDown style={{ marginBottom: '24px' }} text={'За этот месяц'}>
          <div>
            <div className={classes.statMenu}>{periodHeader}</div>
            dsd dsdsd
            sd
            s
            d
            sdi
            <div>dasdsa</div>
          </div>
        </StatDropDown>
      </div>
      <div className={classes.chart}>

        <div className={classes.statTitle}>Статистика просмотров и показов</div>
        <ReactHighcharts config={config} neverReflow={true} isPureConfig={true}/>
      </div>
    </div>
  )
})

StatisticsChart.propTypes = {
//  TooltipTitle: PropTypes.any.isRequired,
//  PrimaryValues: PropTypes.array.isRequired,
//  PrimaryText: PropTypes.string.isRequired,
}

export default StatisticsChart
