import React from 'react'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import loMapValues from 'lodash/mapValues'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import numberFormat from 'helpers/numberFormat'
import { setArrayToCartAction } from 'routes/action-common/cart'
import { Field, change } from 'redux-form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { Checkbox } from 'components/FormComponents'
import CounterField from 'components/FormComponents/CounterField'
import T from 'components/T'
import Title from 'components/Title'
import { Button, YELLOW } from 'components/Button'
import ServiceDiscount from 'routes/services/components/ServiceDiscount'

const style = {
  titleWrap: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    marginBottom: '24px'
  },
  title: {
    margin: '0'
  },
  checkbox: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start'),
    margin: '0',
    position: 'relative',
    height: 'auto',
    '& span': {
      paddingLeft: '0 !important',
      '&:nth-child(2)': {
        display: 'block'
      }
    },
    '& .ant-checkbox': {
      marginRight: '10px'
    }
  },
  row: {
    padding: '14px 20px',
    '&:nth-child(even)': {
      background: hexToRgb('#EEF1F6', '0.55')
    }
  },
  parent: {
    color: hexToRgb('#000', '0.5'),
    fontWeight: '500'
  },
  content: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between')
  },
  serviceName: {

  },
  serviceDecr: {
    color: hexToRgb('#000', '0.6'),
    fontStyle: 'italic',
    marginTop: '4px'
  },
  price: {
    minWidth: '150px',
    textAlign: 'right'
  },
  flex: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },
  alignRight: {
    textAlign: 'right'
  },
  counterField: {
    ...fallbacksStyle('display', 'inline-flex')
  },
  footer: {
    borderTop: '1px solid #EFF1F2',
    textAlign: 'right'
  },
  total: {
    fontWeight: '500',
    fontSize: '16px',
    marginTop: '22px',
    marginBottom: '30px'
  },
  buttonWrap: {
    textAlign: 'right'
  }
}

const enhace = compose(
  connect(() => ({}), {
    change,
    onAddCart: setArrayToCartAction
  }),
  withHandlers({
    onCheckAll: ({ meta, input, ...props }) => ({ target }) => {
      const newValues = loMapValues(input.value, value => {
        if (value) return { ...value, checked: target.checked }
        return null
      })
      props.change(meta.form, input.name, fp.omitBy(fp.isNull, newValues))
    }
  }),
  injectSheet(style)
)

const ServiceCheckBoxGroup = props => {
  const {
    input,
    classes,
    title,
    items,
    userEmail,
    onAddCart,
    totalPadding,
    onCheckAll,
    itemClassName
  } = props

  const formDataArray = fp.filter(
    item => item,
    loMap(input.value, (item, key) => {
      return item && { ...item, id: fp.toInteger(key) }
    })
  )
  const selected = fp.flow(
    fp.filter(fp.get('checked')),
    fp.map(fp.get('id'))
  )(formDataArray)

  const fieldName = fp.get('name', input)
  const indeterminate = !fp.isEmpty(selected) && !fp.isEqual(fp.size(items), fp.size(selected))
  const allChecked = fp.isEqual(fp.size(items), fp.size(selected))

  const selectedItems = fp.filter(item => {
    return fp.includes(fp.get('id', item), selected)
  }, items)

  const selectedItemsFull = fp.map(item => {
    const amount = fp.flow(
      fp.find({ id: fp.get('id', item) }),
      fp.get('amount')
    )(formDataArray)
    return { ...item, amount }
  }, selectedItems)

  const totalSum = fp.sumBy(item => {
    const amount = fp.get('amount', item)
    return fp.toNumber(fp.get('defaultPrice', item)) * amount
  }, selectedItemsFull)

  const discount = fp.flow(fp.first, fp.get('discountPercentage'))(items)

  return (
    <div>
      {title &&
      <div className={classes.titleWrap}>
        <Title
          className={classes.title}
          isStatic={true}
          medium={true}
          text={title}
        />
        <ServiceDiscount discount={discount}/>
      </div>}
      <div>
        <Row type={'flex'} gutter={20} align={'middle'} className={classNames(classes.row, classes.parent, itemClassName)}>
          <Col span={16} className={classes.flex}>
            <Checkbox
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={onCheckAll}
              className={classes.checkbox}>
              <T>main_service</T>
            </Checkbox>
          </Col>
          <Col span={4} className={classes.alignRight}><T>serv_discounts_count</T></Col>
          <Col span={4} className={classes.alignRight}><T>main_cost</T></Col>
        </Row>
        {fp.map(item => {
          const id = fp.get('id', item)
          const name = fp.get('name', item)
          const amount = fp.get(['value', id, 'amount'], input)
          const description = fp.get('description', item)
          const price = fp.toNumber(fp.get('defaultPrice', item)) * amount
          return (
            <Row key={id} gutter={20} className={classNames(classes.row, itemClassName)}>
              <Col span={16}>
                <Field
                  name={`${fieldName}.${id}.checked`}
                  component={Checkbox}
                  className={classes.checkbox}>
                  <div className={classes.serviceName}>{name}</div>
                  {description && <div className={classes.serviceDecr}>{description}</div>}
                </Field>
              </Col>
              <Col span={4} className={classes.alignRight}>
                <Field
                  name={`${fieldName}.${id}.amount`}
                  component={CounterField}
                  className={classes.counterField}
                />
              </Col>
              <Col span={4} className={classes.alignRight}>{numberFormat(price, 'UZS')}</Col>
            </Row>
          )
        }, items)}
      </div>
      <div className={classes.footer} style={{ paddingRight: totalPadding }}>
        <div className={classes.total}>
          <span><T>serv_total</T>: {numberFormat(totalSum, 'UZS')} </span>
        </div>
        <Button
          type={'medium'}
          text={'serv_add_cart'}
          disabled={fp.isEmpty(selected)}
          color={YELLOW}
          style={{ width: '200px' }}
          rounded={true}
          onClick={() => onAddCart(selectedItemsFull, userEmail)}
        />
      </div>
    </div>
  )
}

ServiceCheckBoxGroup.propTypes = {
  classes: PropTypes.object,
  itemClassName: PropTypes.string,
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  onCheckAll: PropTypes.func,
  onAddCart: PropTypes.func,
  totalPadding: PropTypes.any
}

export default enhace(ServiceCheckBoxGroup)
