import fp from 'lodash/fp'
import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field } from 'redux-form'
import { animationStyle } from 'constants/styles'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import ServiceCheckBoxGroup from 'components/FormComponents/CheckboxGroup/ServiceCheckBoxGroup'
import VacancyCard from './VacancyCard'

const enhance = compose(
  withStyles({
    promoteWrap: {
      marginBottom: '50px'
    }
  })
)

const vacancyServiceCodes = ['ES5', 'ES7']
const PromoteVacancy = props => {
  const {
    classes,
    servicesList,
    discountsDetail,
    setItemsToCart,
    userEmail
  } = props

  const services = servicesList.data
  const vacancyServices = fp.filter(item => {
    return fp.includes(item.code, vacancyServiceCodes)
  }, services)
  const additionalServices = fp.filter(item => {
    return !fp.includes(item.code, vacancyServiceCodes)
  }, services)

  return (
    <div style={animationStyle}>
      <Row className={classes.promoteWrap} type={'flex'} gutter={20}>
        {fp.map(item => {
          const code = fp.get('code', item)
          const discounts = fp.find({ service: code }, fp.get('data', discountsDetail))
          return (
            <Col key={item.id} span={12}>
              <VacancyCard
                item={item}
                discounts={discounts}
                features={[
                  'Размещение на 30 дней',
                  'Второй блок в результатах поиска',
                  'Экономное решение'
                ]}
                onAddCart={setItemsToCart}
                userEmail={userEmail}
              />
            </Col>
          )
        }, vacancyServices)}
      </Row>

      <Field
        name={'services'}
        component={ServiceCheckBoxGroup}
        title={'serv_additional_emp'}
        items={additionalServices}
        userEmail={userEmail}
      />
    </div>
  )
}

PromoteVacancy.propTypes = {
  classes: PropTypes.object,
  userEmail: PropTypes.string,
  formData: PropTypes.object,
  servicesList: PropTypes.object,
  discountsDetail: PropTypes.object,
  setItemsToCart: PropTypes.func
}

export default enhance(PromoteVacancy)
