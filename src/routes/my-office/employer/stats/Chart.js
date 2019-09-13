import React from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import TW from 'components/TW'
import EmployerChart from 'components/Chart'

const Chart = props => {
  const { card, filter, data, onChartPeriodChange } = props

  return (
    <Row gutter={20}>
      <Col span={6}>{card}</Col>
      <Col span={18}>
        <TW>
          {lang => (
            <EmployerChart
              lang={lang}
              filter={filter}
              data={data}
              onChartPeriodChange={onChartPeriodChange}
            />
          )}
        </TW>
      </Col>
    </Row>
  )
}

Chart.propTypes = {
  classes: PropTypes.object,
  card: PropTypes.node,
  filter: PropTypes.object,
  data: PropTypes.object,
  onChartPeriodChange: PropTypes.func
}

export default Chart
