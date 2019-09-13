import fp from 'lodash/fp'
import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import { animationStyle } from 'constants/styles'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import VIPCard from './VIPCard'

const styles = {
  vipWrap: {
    paddingBottom: '140px'
  }
}
const DataBase = props => {
  const { classes, data, userEmail, cartList, setItemsToCart, removeItemCart } = props
  const list = fp.get('data', data)
  const loading = fp.get('loading', data)

  return (
    <div className={classes.vipWrap} style={animationStyle}>
      <Row type={'flex'} gutter={20}>
        {fp.map(item => {
          const id = fp.get('id', item)
          return (
            <Col key={id} span={12}>
              <VIPCard
                item={item}
                onAddCart={setItemsToCart}
                onRemoveCartItem={removeItemCart}
                cartList={cartList}
                userEmail={userEmail}
              />
            </Col>
          )
        }, list)}
      </Row>
    </div>
  )
}

DataBase.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
  cartList: PropTypes.object.isRequired,
  setItemsToCart: PropTypes.func.isRequired,
  removeItemCart: PropTypes.func.isRequired
}

export default withStyles(styles)(DataBase)
