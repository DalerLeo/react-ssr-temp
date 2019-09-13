import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { reduxForm } from 'redux-form'
import loGet from 'lodash/get'
import { fallbacksStyle, crossBrowserify } from 'constants/styles'
import Container from 'components/Container'
import Title from 'components/Title'
import TitleTab from 'components/Title/TitleTab'
import PromoteVacancy from './PromoteVacancy'
import Payment from './Payment'
import DataBase from './DataBase'
import VIP from './VIP'
import Cart from './Cart'

const styles = {
  wrapper: {
    margin: '58px 0 75px'
  },
  contentWrap: {
    ...fallbacksStyle('display', 'flex'),
    paddingTop: '30px',
    position: 'relative'
  },
  content: {
    ...crossBrowserify('flexGrow', '1'),
    paddingRight: '40px'
  }
}

const enhance = compose(
  withState('openDialog', 'setOpenDialog', false),
  injectSheet(styles),
  reduxForm({
    form: 'ServicesForm',
    enableReinitialize: true
  })
)
const tabs = [
  {
    value: 'vacancy',
    label: 'serv_vacancy_buy'
  },
  {
    value: 'database',
    label: 'serv_db_buy'
  },
  {
    value: 'vip',
    label: 'serv_vip_buy'
  },
  {
    value: 'payment',
    label: 'serv_balance_buy'
  }
]

const Services = props => {
  const {
    classes,
    userData,
    onTabChange,
    params,
    formValues,
    cartList,
    discountsDetail,
    servicesList,
    databaseAccessList,
    databasePeriodDetail,
    vipPacketList,
    onFillBalance,
    fillBalanceLoading,
    onOrderCreate,
    orderCreateLoading,
    searchFaceted,
    ...otherProps
  } = props

  const userEmail = loGet(userData, 'username') || loGet(userData, 'email')

  const componentName = loGet(params, 'child')
  const component = {
    'vacancy': (
      <PromoteVacancy
        servicesList={servicesList}
        discountsDetail={discountsDetail}
        setItemsToCart={otherProps.setItemsToCartAction}
        userEmail={userEmail}
      />
    ),
    'database': (
      <DataBase
        formData={formValues}
        data={databaseAccessList}
        detailData={databasePeriodDetail}
        setItemsToCart={otherProps.setItemsToCartAction}
        userEmail={userEmail}
        searchFaceted={searchFaceted}
      />
    ),
    'vip': (
      <VIP
        data={vipPacketList}
        cartList={cartList.data}
        removeItemCart={otherProps.removeCartItemAction}
        setItemsToCart={otherProps.setItemsToCartAction}
        userEmail={userEmail}
      />
    ),
    'payment': (
      <Payment
        onFillBalance={onFillBalance}
        loading={fillBalanceLoading}
      />
    )
  }
  return (
    <div className={classes.wrapper}>
      <Container>
        <Title text={'main_mj_serv'} isStatic={true} margin={'0 0 20px 0'}/>
        <TitleTab type={'small'} onChange={onTabChange} tabs={tabs} value={componentName}/>
        <div className={classes.contentWrap}>
          <div className={classes.content}>{component[componentName] || 'Not found'}</div>
          <Cart
            data={cartList.data}
            onRemoveItem={otherProps.removeCartItemAction}
            onClearCart={otherProps.clearCartAction}
            onOrderCreate={onOrderCreate}
            createLoading={orderCreateLoading}
            userEmail={userEmail}
          />
        </div>
      </Container>
    </div>
  )
}

Services.propTypes = {
  classes: PropTypes.object,
  userData: PropTypes.object,
  onTabChange: PropTypes.func,
  params: PropTypes.object,
  formValues: PropTypes.object,
  discountsDetail: PropTypes.object,
  cartList: PropTypes.object,
  servicesList: PropTypes.object,
  databaseAccessList: PropTypes.object,
  databasePeriodDetail: PropTypes.object,
  vipPacketList: PropTypes.object,
  onFillBalance: PropTypes.func,
  fillBalanceLoading: PropTypes.bool,
  onOrderCreate: PropTypes.func,
  orderCreateLoading: PropTypes.bool,
  searchFaceted: PropTypes.object
}

export default enhance(Services)
