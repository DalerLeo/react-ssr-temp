import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { crossBrowserify } from 'constants/styles'
import { serviceDurationFormat } from 'constants/services'
import hexToRgb from 'helpers/hexToRgb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import T from 'components/T'
import { Checkbox } from 'components/FormComponents'

const withStyles = compose(
  withHandlers({
    onCheckAll: props => ({ target }) => {
      const isChecked = fp.get('checked', target)
      const { input, items } = props
      const services = fp.map(fp.get('service.id'), items)
      if (isChecked) input.onChange(services)
      else input.onChange([])
    },
    onChange: props => (isChecked, id) => {
      const { input } = props
      if (fp.includes(id, input.value)) {
        input.onChange(fp.filter(item => item !== id, input.value))
      } else {
        input.onChange(fp.flow(
          fp.concat(id),
          fp.filter(item => item)
        )(input.value))
      }
    }
  }),
  injectSheet({
    row: {
      padding: '14px 20px',
      '&:nth-child(even)': {
        background: hexToRgb('#EEF1F6', '0.55')
      }
    },
    header: {
      color: hexToRgb('#000', '0.5')
    },
    checkbox: {
      ...crossBrowserify('alignItems', 'end'),
      height: 'auto',
      width: '100%',
      '& .ant-checkbox': {
        top: '2px'
      }
    },
    alignRight: {
      textAlign: 'right'
    },
    duration: {
      color: hexToRgb('#000', '0.6'),
      fontStyle: 'italic'
    }
  })
)

const ServicesGroup = props => {
  const { classes, input, items, onChange, onCheckAll, itemClassName } = props

  const isCheckedAll = fp.size(input.value) === fp.size(items)
  const isIndeterminate = !fp.isEmpty(input.value) && fp.size(input.value) !== fp.size(items)

  return (
    <div>
      <Row className={classNames(classes.row, classes.header, itemClassName)} type={'flex'}>
        <Col span={18}>
          <Checkbox
            checked={isCheckedAll}
            indeterminate={isIndeterminate}
            onChange={onCheckAll}
            className={classes.checkbox}>
            <T>main_service</T>
          </Checkbox>
        </Col>
        <Col span={6} className={classes.alignRight}>
          <T>serv_discounts_count</T>
        </Col>
      </Row>
      {fp.map(item => {
        const id = fp.get('service.id', item)
        const code = fp.get('service.code', item)
        const service = fp.get('service.name', item)
        const activeDays = fp.get('service.activeDays', item)
        const amount = fp.get('count', item)
        const duration = fp.get(activeDays, serviceDurationFormat)
        const isChecked = fp.includes(code, input.value)
        return (
          <Row key={id} className={classNames(classes.row, itemClassName)} type={'flex'}>
            <Col span={16}>
              <Checkbox
                checked={isChecked}
                onChange={({ target }) => onChange(target.checked, code)}
                className={classes.checkbox}>
                <div>{service}</div>
                <div className={classes.duration}>{duration}</div>
              </Checkbox>
            </Col>
            <Col span={8} className={classes.alignRight}>{amount}</Col>
          </Row>
        )
      }, items)}
    </div>
  )
}

ServicesGroup.propTypes = {
  classes: PropTypes.object,
  itemClassName: PropTypes.string,
  items: PropTypes.array,
  input: PropTypes.object,
  onChange: PropTypes.func,
  onCheckAll: PropTypes.func
}

export default withStyles(ServicesGroup)
