import React from 'react'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { animationStyle, ONE } from 'constants/styles'
import * as API from 'constants/api'
import t, { getTranslate } from 'helpers/translate'
import hexToRgb from 'helpers/hexToRgb'
import numberFormat from 'helpers/numberFormat'
import getDiscountPrice from 'helpers/getDiscountPrice'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import T from 'components/T'
import TW from 'components/TW'
import Title from 'components/Title'
import RenderOrNull from 'components/Utils/RenderOrNull'
import { SearchFieldConfig } from 'components/FormComponents'
import ModelSelectField from 'components/FormComponents/ModelSelectField'
import RadioGroup from 'components/FormComponents/RadioGroup'
import RadioServices from 'components/FormComponents/Radio/RadioServices'
import { Button, YELLOW } from 'components/Button'

const withStyles = injectSheet({
  descr: {
    color: hexToRgb('#000', '0.6'),
    lineHeight: '22px',
    whiteSpace: 'pre-line'
  },
  field: {
    margin: '40px 0'
  },
  period: {
    marginBottom: '25px'
  },
  total: {
    paddingTop: '22px',
    borderTop: '1px solid #EFF1F2',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'right',
    marginBottom: '30px'
  }
})

const daysObject = {
  '7': {
    label: '1 неделя',
    info: 'Для срочного поиска кандидатов в течении недели'
  },
  '30': {
    label: '1 месяц',
    info: 'Для срочного поиска кандидатов в течении месяца'
  },
  '90': {
    label: '3 месяца',
    info: 'Для срочного поиска кандидатов в течении трех месяцев'
  },
  '180': {
    label: '6 месяцев',
    info: 'Для срочного поиска кандидатов в течении пол года'
  },
  '360': {
    label: '1 год',
    info: 'Для срочного поиска кандидатов в течении года'
  }
}

const periodsList = [
  { id: 7 },
  { id: 30 },
  { id: 90 },
  { id: 180 },
  { id: 360 }
]

const DataBase = props => {
  const {
    classes,
    detailData,
    formData,
    setItemsToCart,
    userEmail,
    searchFaceted
  } = props

  const period = fp.get('period', formData)
  const databaseSphere = fp.get('databaseSphere', formData)

  const detailLoading = fp.get('loading', detailData)

  const getPeriodDiscount = days => fp.flow(
    fp.get('data'),
    fp.first,
    fp.get(`discountPercentage${days}`)
  )(detailData)

  const periodDiscount = getPeriodDiscount(period)

  const periodIds = fp.flow(
    fp.get('data'),
    fp.map(fp.get(`id${period}`))
  )(detailData)

  const periodPrices = fp.flow(
    fp.get('data'),
    fp.map(fp.get(`defaultPrice${period}`)),
    fp.sumBy(item => fp.toNumber(item))
  )(detailData)

  const specialities = fp.map(
    fp.get('speciality'),
    fp.get('data', detailData)
  )

  const periodBonuses = fp.flow(
    fp.get('data'),
    fp.map(fp.get('bonusRules')),
    fp.flatten
  )(detailData)

  const totalPrice = getDiscountPrice(periodPrices, periodDiscount)

  const onAddCart = () => setItemsToCart({
    id: periodIds,
    name: 'Доступ к базе',
    activeDays: period,
    defaultPrice: periodPrices,
    discountPercentage: periodDiscount,
    specialities
  }, ONE, userEmail)

  return (
    <div style={animationStyle}>
      <Title isStatic={true} isProfile={true} text={'main_serv_db_title'}/>
      <div className={classes.descr}>
        <T>serv_db_desc</T>
      </div>
      <div className={classes.field}>
        <TW>
          {lang => (
            <Field
              api={API.PROFESSIONS_LIST}
              params={{ parents_only: true }}
              component={ModelSelectField}
              label={t('main_sphere', lang)}
              selectLabel={fp.isEmpty(databaseSphere)
                ? t('main_sphere_select', lang)
                : t('button_change', lang)}
              name={'databaseSphere'}
              lang={lang}
              parentsOnly={true}
              searchFaceted={searchFaceted}
            />
          )}
        </TW>
      </div>
      <RenderOrNull value={databaseSphere}>
        <React.Fragment>
          <TW>
            {lang => (
              <Field name={'period'} label={t('serv_db_period', lang)} component={RadioGroup}>
                <Row type={'flex'} gutter={20}>
                  {loMap(periodsList, (value, key) => {
                    const days = fp.get('id', value)
                    const label = fp.get([days, 'label'], daysObject)
                    const info = fp.get([days, 'info'], daysObject)
                    const discount = getPeriodDiscount(days)
                    const bonuses = fp.filter(item => {
                      return fp.get('activeDays', item) === days
                    }, periodBonuses)
                    return (
                      <Col className={classes.period} key={days} span={8}>
                        <RadioServices
                          info={info}
                          label={label}
                          value={days}
                          bonuses={bonuses}
                          discount={discount}
                        />
                      </Col>
                    )
                  })}
                </Row>
              </Field>
            )}
          </TW>
          <div className={classes.total}>
            <span><T>serv_total</T>: {numberFormat(totalPrice, 'UZS')}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button
              type={'medium'}
              disabled={!period}
              text={'serv_add_cart'}
              color={YELLOW}
              style={{ width: '200px' }}
              rounded={true}
              onClick={onAddCart}
            />
          </div>
        </React.Fragment>
      </RenderOrNull>
    </div>
  )
}

DataBase.propTypes = {
  classes: PropTypes.object,
  searchFaceted: PropTypes.object,
  formData: PropTypes.object,
  userEmail: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  detailData: PropTypes.object.isRequired,
  setItemsToCart: PropTypes.func.isRequired
}

export default withStyles(DataBase)
