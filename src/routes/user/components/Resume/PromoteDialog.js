import fp from 'lodash/fp'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { serviceDurationFormat } from 'constants/services'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import { getStateData, getStateLoading } from 'helpers/get'
import numberFormat from 'helpers/numberFormat'
import toast from 'helpers/toast'
import { getApplicantServicesList } from 'routes/services/actions'
import { Checkbox } from 'components/FormComponents'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Dialog from 'components/Dialog'
import Title from 'components/Title'
import { Button } from 'components/Button'
import T from 'components/T'

const mapStateToProps = state => ({
  balance: fp.toNumber(fp.get(['user', 'data', 'balance'], state)),
  ...getStateData('service.applicant', 'services', state, false),
  ...getStateLoading('order.create', 'order', state),
  ...getStateLoading('order.makePayment', 'payment', state),
  ...getStateLoading('order.activate', 'activate', state)
})

const withStyles = compose(
  connect(mapStateToProps, {
    getApplicantServicesList
  }),
  injectSheet({
    wrapper: {
      color: 'black',
      padding: '40px 60px 35px'
    },
    title: {
      marginBottom: '12px'
    },
    services: {
      margin: '0 -60px'
    },
    checkboxWrapper: {
      '&:nth-child(even)': {
        background: hexToRgb('#fff', '0.6')
      }
    },
    checkbox: {
      ...crossBrowserify('alignItems', 'baseline'),
      color: 'black',
      height: 'auto',
      padding: '14px 60px 14px 80px',
      width: '100%',
      '& .ant-checkbox': {
        top: '2px',
        '& + span': {
          display: 'block',
          width: '100%'
        }
      }
    },
    row: {
      '& > div:last-child': {
        textAlign: 'right'
      }
    },
    period: {
      color: hexToRgb('#000', '0.6'),
      fontStyle: 'italic'
    },
    total: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      borderTop: '1px solid #EFF1F2',
      fontSize: '16px',
      fontWeight: '500',
      marginLeft: '20px',
      padding: '20px 0'
    },
    button: {
      textAlign: 'right',
      marginTop: '10px'
    }
  })
)

const PromoteDialog = props => {
  const {
    classes,
    open,
    handleClose,
    handleSubmit,
    servicesList,
    balance,
    ...otherProps
  } = props

  const orderLoading = fp.get('orderLoading', otherProps)
  const paymentLoading = fp.get('paymentLoading', otherProps)
  const activateLoading = fp.get('activateLoading', otherProps)
  const buttonLoading = orderLoading || paymentLoading || activateLoading

  const [selected, setSelected] = useState([])
  const list = fp.get('data', servicesList)
  const loading = fp.get('loading', servicesList)

  const selectedList = fp.filter(item => {
    return fp.includes(item.code, selected)
  }, list)
  const totalPrice = fp.sumBy(item => {
    return fp.toNumber(fp.get('defaultPrice', item))
  }, selectedList)

  const onChange = (checked, service) => {
    if (fp.includes(service, selected)) {
      return setSelected(
        fp.filter(item => item !== service, selected)
      )
    }
    return setSelected(
      fp.concat(service, selected)
    )
  }

  useEffect(() => {
    if (open) {
      setSelected([])
      otherProps.getApplicantServicesList()
    }
  }, [open])

  const onSubmit = () => {
    if (fp.isEmpty(selected)) {
      return toast({
        title: 'Выберите услугу',
        message: 'Вы ничего не выбрали',
        type: 'error'
      })
    }
    if (balance < totalPrice) {
      return toast({
        title: 'Недостаточно средств',
        message: 'На вашем балансе не хватает средств',
        type: 'error'
      })
    }
    return handleSubmit(selectedList)
  }

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={755}>
      <div className={classes.wrapper}>
        <Title
          text={'resume_promotion'}
          className={classes.title}
          isStatic={true}
          medium={true}
        />
        <div className={classes.services}>
          {fp.map(item => {
            const id = fp.get('id', item)
            const name = fp.get('name', item)
            const code = fp.get('code', item)
            const defaultPrice = fp.get('defaultPrice', item)
            const description = fp.get('description', item)
            const activeDays = fp.get('activeDays', item)
            const period = fp.get(activeDays, serviceDurationFormat)
            const isChecked = fp.includes(code, selected)
            if (code === 'AS3') return null
            return (
              <Checkbox
                key={id}
                checked={isChecked}
                onChange={event => onChange(event.target.checked, code)}
                wrapperClassName={classes.checkboxWrapper}
                className={classes.checkbox}>
                <Row className={classes.row} type={'flex'} gutter={20}>
                  <Col span={18}>
                    {name}
                    <div className={classes.period}>
                      <div>{description}</div>
                      <div>{period}</div>
                    </div>
                  </Col>
                  <Col span={6}>{numberFormat(defaultPrice, 'UZS')}</Col>
                </Row>
              </Checkbox>
            )
          }, list)}
        </div>
        <div className={classes.total}>
          <div className={classes.balance}>
            <T>main_balance</T>: {numberFormat(balance, 'UZS')}
          </div>
          <div className={classes.totalPrice}>
            <T>serv_total</T>: {numberFormat(totalPrice, 'UZS')}
          </div>
        </div>
        <div className={classes.button}>
          <Button
            loading={buttonLoading}
            onClick={onSubmit}
            text={'button_apply'}
            type={'medium'}
          />
        </div>
      </div>
    </Dialog>
  )
}

PromoteDialog.propTypes = {
  classes: PropTypes.object,
  balance: PropTypes.number,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  servicesList: PropTypes.object.isRequired
}

export default withStyles(PromoteDialog)
