/* eslint-disable react/prop-types */
import React from 'react'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  MAIN_COLOR,
  PRIMARY_COLOR } from 'constants/styles'
import AntRadio from 'antd/lib/radio'
import T from 'components/T'
import numberFormat from 'helpers/numberFormat'

const enhance = compose(
  injectSheet({
    active: {
      borderColor: MAIN_COLOR
    },
    radio: {
      ...crossBrowserify('transition', 'all 300ms'),
      background: '#FBFBFD',
      border: '1px solid #DFE1E7',
      borderRadius: '4px',
      color: '#000',
      height: '100%',
      margin: '0',
      minHeight: '160px',
      padding: '18px 15px',
      whiteSpace: 'normal',
      '&.ant-radio-wrapper-checked': {
        borderColor: MAIN_COLOR
      },
      '&:hover': {
        '& .ant-radio-inner': {
          borderColor: `${PRIMARY_COLOR} !important`
        }
      },
      '& span.ant-radio+*': {
        padding: '0 0 0 5px',
        fontFamily: '\'Montserrat\', sans-serif'
      },
      // DEFAULT
      '& .ant-radio': {
        '& .ant-radio-inner': {
          height: '18px',
          width: '18px',
          border: '1px #cfcfcf solid',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
          '&:after': {
            background: MAIN_COLOR,
            border: 'none !important',
            top: '4px',
            left: '4px',
            height: '8px',
            width: '8px'
          }
        }
      },
      // CHECKED
      '& .ant-radio-checked': {
        '& .ant-radio-inner': {
          boxShadow: 'none',
          background: '#fff',
          borderColor: `${MAIN_COLOR} !important`,
          '&:after': crossBrowserify('transform', 'scale(1)')
        },
        '&:after': {
          border: `1px ${PRIMARY_COLOR} solid`
        }
      }
    },
    content: {
      paddingLeft: '23px'
    },
    info: {
      color: '#9197A4',
      marginTop: '4px',
      fontSize: '13px'
    },
    discount: {
      fontWeight: '500',
      marginBottom: '3px'
    },
    line: {
      width: '100%',
      height: '1px',
      margin: '12px 0',
      background: 'linear-gradient(270deg, rgba(248, 248, 248, 0.196105) 2.6%, #E7E7E7 49.83%, rgba(248, 248, 248, 0.200945) 99.29%)'
    },
    bonuses: {

    },
    bonusType: {
      fontSize: '13px'
    }
  })
)

const bonusTypes = {
  standard_vacancy: 'Стандартная вакансия',
  premium_vacancy: 'Премиум вакансия',
  units: 'Несграяемые единицы',
  line: 'Текстовая строка'
}

const Radio = props => {
  const {
    className,
    classes,
    label,
    info,
    bonuses,
    discount,
    ...defaultProps
  } = props

  return (
    <AntRadio
      className={classNames(classes.radio, className)}
      {...defaultProps}>
      {label}
      <div className={classes.content}>
        <div className={classes.info}>
          {discount &&
          <div className={classes.discount}>
            <T>serv_discount</T> {discount}%
          </div>}
          {info}
        </div>
        <div className={classes.line}/>
        <div className={classes.bonuses}>
          {loMap(bonuses, (item, index) => {
            const bonusCount = fp.get('bonus', item)
            const type = fp.get('bonusActionType', item)
            const bonusType = fp.get(type, bonusTypes)
            return (
              <div className={classes.bonusType} key={index}>
                + {numberFormat(bonusCount)} {bonusType}
              </div>
            )
          })}
        </div>
      </div>
    </AntRadio>

  )
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any
}

export default enhance(Radio)
