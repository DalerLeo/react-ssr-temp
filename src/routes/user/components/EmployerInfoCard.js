import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import injectSheet from 'react-jss'
import sprintf from 'sprintf'
import { compose } from 'recompose'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  FIELD_BORDER_COLOR
} from 'constants/styles'
import {
  USER_SETTING_URL,
  EMPLOYER_ITEM_URL,
  SERVICE_ITEM_URL
} from 'constants/routes'
import Link from 'components/Link'
import hexToRgb from 'helpers/hexToRgb'
import numberFormat from 'helpers/numberFormat'
import ArrowRight from 'icons/ChevRight'
import Settings from 'icons/Settings'
import ProfilePic from 'components/ProfilePic/ProfilePic'
import CompanyName from 'components/Cards/CompanyName'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    cardWrapper: {
      transition: 'all 700ms',
      padding: '36px 30px 22px',
      maxWidth: '278px',
      minWidth: '277px',
      height: 'fit-content',
      borderRadius: '4px',
      boxShadow: '0 5px 12px 2px rgba(0, 0, 0, 0.04)',
      '& > div:first-child': {
        marginBottom: '18px'
      },
      '& a': {
        color: '#8798ad',
        fontWeight: '500',
        marginTop: '10px',
        display: 'inline-block'
      }
    },
    header: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      '& svg': {
        color: '#a1a7b3',
        cursor: 'pointer',
        display: 'block',
        fontSize: '26px'
      }
    },
    profilePic: {
      marginBottom: '0'
    },
    vacancyCount: {
      color: '#8F95A3',
      marginTop: '6px',
      '& > span': {
        fontWeight: '500'
      }
    },
    compProfile: {
      marginTop: '12px',
      color: '#8f95a3',
      '& span': {
        fontWeight: '600',
        color: MAIN_COLOR
      }
    },
    views: {
      '& span': {
        fontWeight: '500'
      }
    },
    prof: {
      lineHeight: '1.57',
      margin: '7px 0'
    },
    block: {
      margin: '14px 0 22px',
      padding: '14px 0',
      borderTop: '1px solid',
      borderBottom: '1px solid',
      borderBottomColor: hexToRgb(FIELD_BORDER_COLOR, '0.3'),
      borderColor: hexToRgb(FIELD_BORDER_COLOR, '0.3')
    },
    label: {
      color: '#a1a7b3'
    },
    field: {
      fontWeight: '500',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      '& u': {
        color: MAIN_COLOR
      }
    },
    balance: {
      background: '#f8f9fb',
      borderRadius: '4px',
      color: '#9dabbc',
      cursor: 'pointer',
      padding: '14px 12px',
      position: 'relative',
      whiteSpace: 'nowrap',
      '& span': {
        color: 'black',
        fontWeight: '500',
        marginLeft: '5px'
      },
      '& svg': {
        fontSize: '18px',
        marginLeft: '10px',
        position: 'absolute',
        top: '18px',
        right: '12px'
      }
    }
  })
)

const EmployerInfoCard = props => {
  const { classes, history, viewCount, stats } = props
  const userType = fp.get(['data', 'userType'], props)
  const isStaff = userType === 'employer_staff'
  const data = isStaff ? fp.get(['data', 'employer'], props) : fp.get('data', props)
  const name = fp.get('title', data)
  const balance = numberFormat(fp.get('balance', data), 'сум')
  const logo = fp.get('logo.file', data)
  const completed = fp.round(fp.get('completed', data))
  const activeVacancyCount = fp.getOr('0', 'activeVacancyCount', stats)

  const toBalanceUrl = () => {
    history.push(sprintf(SERVICE_ITEM_URL, 'payment'))
  }

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.header}>
        <ProfilePic type={'mini'} className={classes.profilePic} image={logo}/>
        {!isStaff && (
          <Settings onClick={() => history.push(USER_SETTING_URL)}/>
        )}
      </div>
      <CompanyName big={true} name={name} underline={false}/>
      <div className={classes.vacancyCount}><T>emp_active_vacancies</T>: <span>{activeVacancyCount}</span></div>
      <div className={classes.compProfile}>
        <T>emp_profile_completed</T> <span>{completed}%</span>
      </div>
      {!isStaff && (
        <Link to={USER_SETTING_URL}><T>button_fill_profile</T></Link>
      )}
      <div className={classes.block}>
        <div className={classes.views}>
          <T views={viewCount}>emp_view_count</T>
        </div>
        <Link to={sprintf(EMPLOYER_ITEM_URL, 'guest')}><T>button_view_guest</T></Link>
      </div>
      {!isStaff && (
        <div className={classes.balance} onClick={toBalanceUrl}>
          <T>main_balance</T>:<span>{balance}</span>
          <ArrowRight/>
        </div>
      )}
    </div>
  )
}

EmployerInfoCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  history: PropTypes.object,
  viewCount: PropTypes.number,
  stats: PropTypes.object
}

export default enhance(EmployerInfoCard)
