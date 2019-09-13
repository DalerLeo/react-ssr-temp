import React from 'react'
import PropTypes from 'prop-types'
import loGet from 'lodash/get'
import loCurry from 'lodash/curryRight'
import sprintf from 'sprintf'
import injectSheet from 'react-jss'
import { EMPLOYER_ITEM_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import ArrowRight from 'icons/ChevRight'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import T from 'components/T'
import BadgePulse from 'components/BadgePulse'

const withStyles = injectSheet({
  wrapper: {
    margin: '20px -10px 25px'
  },
  card: {
    position: 'relative',
    borderRadius: '4px',
    boxShadow: '0 5px 12px 2px rgba(0, 0, 0, 0.04)',
    padding: '27px 30px 21px'
  },
  grabber: {
    color: '#282d32',
    fontWeight: '500',
    fontSize: '28px'
  },
  cardInfo: {
    color: '#9197a4',
    fontSize: '18px',
    fontWeight: '500',
    paddingLeft: '18px'
  },
  cardLabel: {
    color: '#282d32',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  cardBtn: {
    top: '50%',
    position: 'absolute',
    transform: 'translateY(-50%)',
    right: '20px',
    padding: '4px 11px',
    background: hexToRgb('#eef1f6', '0.4'),
    borderRadius: '50%',
    '&:hover': {
      cursor: 'pointer'
    },
    '& svg': {
      color: '#8798ad'
    }
  },
  totalAppeal: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#9197A4',
    marginLeft: '18px'
  }
})

const GeneralStats = props => {
  const { classes, history, generalStats } = props

  const onCardClick = loCurry((event, item) => {
    history.push(sprintf(EMPLOYER_ITEM_URL, item), { smooth: true })
  })

  const activeServiceCount = loGet(generalStats, 'activeServiceCount')
  const unusedServiceCount = loGet(generalStats, 'unusedServiceCount')
  const activeVacancyCount = loGet(generalStats, 'activeVacancyCount')
  const newAppealCount = loGet(generalStats, 'newAppealCount')
  const searchRequestCount = loGet(generalStats, 'searchRequestCount')
  const totalAppealCount = loGet(generalStats, 'totalAppealCount')

  return (
    <Row className={classes.wrapper} type={'flex'} gutter={20}>
      <Col span={6}>
        <div className={classes.card}>
          <span className={classes.grabber}>{totalAppealCount}</span>
          {Boolean(newAppealCount) && <span className={classes.totalAppeal}>{newAppealCount}</span>}
          <div className={classes.cardLabel}><T>menu_feedback</T></div>
          {Boolean(newAppealCount) && <BadgePulse positions={{ top: 8, right: 8 }}/>}
          <div
            className={classes.cardBtn}
            onClick={onCardClick('vacancy')}>
            <ArrowRight/>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className={classes.card}>
          <span className={classes.grabber}>{activeVacancyCount}</span>
          <div className={classes.cardLabel}><T>emp_active_vacancy_f</T></div>
          <div className={classes.cardBtn} onClick={onCardClick('vacancy')}><ArrowRight/></div>
        </div>

      </Col>
      <Col span={6}>
        <div className={classes.card}>
          <span className={classes.grabber}>{searchRequestCount}</span>
          <div className={classes.cardLabel}><T>emp_search_requests</T></div>
          <div className={classes.cardBtn} onClick={onCardClick('history')}><ArrowRight/></div>
        </div>
      </Col>
      <Col span={6}>
        <div className={classes.card}>
          <span className={classes.grabber}>{activeServiceCount} / {unusedServiceCount}</span>
          <div className={classes.cardLabel}><T>emp_my_services</T></div>
          <div className={classes.cardBtn} onClick={onCardClick('service')}><ArrowRight/></div>
        </div>
      </Col>
    </Row>
  )
}

GeneralStats.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  generalStats: PropTypes.object
}

export default withStyles(GeneralStats)
