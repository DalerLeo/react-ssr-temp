import React from 'react'
import loGet from 'lodash/get'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import sprintf from 'sprintf'
import {
  crossBrowserify,
  fallbacksStyle,
  PRIMARY_COLOR,
  GREY_BORDER_STYLE,
  BLACK_COLOR,
  FADE_IN_ANIMATE,
  ANCHOR_DISABLED, MAIN_COLOR
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import { getOnlyString, getVacancySalary } from 'helpers/get'
import dateFormat from 'helpers/dateFormat'
import withHistory from 'helpers/withHistory'
import Link from 'components/Link'
import { VACANCY_ITEM } from 'constants/routes'
import Image from 'images/myjob.png'
import CompanyName from './CompanyName'
import CompanyAddress from './CompanyAddress'

const enhance = compose(
  withHistory,
  injectSheet({
    vacancy: {
      display: 'block',
      ...ANCHOR_DISABLED
    },
    vacancyWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('animation', 'fadeIn 2s'),
      border: GREY_BORDER_STYLE,
      borderRadius: '4px',
      color: BLACK_COLOR,
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative',
      width: '100%'
    },
    ...FADE_IN_ANIMATE,
    pinned: {
      borderColor: MAIN_COLOR
    },

    image: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      height: '131px',
      width: '131px',
      minWidth: '131px'
    },

    body: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('flexDirection', 'column'),
      ...crossBrowserify('justifyContent', 'space-between'),
      padding: '19px 22px 16px 25px',
      position: 'relative',
      width: '100%'
    },

    header: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginBottom: '3px',
      lineHeight: '1.57'
    },

    position: {
      color: BLACK_COLOR,
      fontWeight: '500',
      fontSize: '14px'
    },
    premium: {
      ...crossBrowserify('borderRadius', '4px'),
      background: hexToRgb('#FFB701', '0.75'),
      fontSize: '12px',
      fontWeight: 'normal',
      padding: '2px 8px',
      marginLeft: '20px'
    },

    createdDate: {
      fontSize: '13px',
      textAlign: 'right',
      color: hexToRgb(BLACK_COLOR, '0.4')
    },

    desc: {
      ...crossBrowserify('flexGrow', '1'),
      maxHeight: '42px',
      overflow: 'hidden',
      lineHeight: '1.62',
      fontSize: '13px',
      paddingRight: '120px',
      color: hexToRgb(BLACK_COLOR, '0.7')
    },

    salary: {
      fontSize: '14px',
      lineHeight: '1.57'
    },

    footer: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginTop: '7px',
      lineHeight: 'normal',
      position: 'relative'
    },
    companyInfo: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      width: '300px'
    },

    comName: {
      paddingTop: '2px',
      display: '-webkit-box',
      fontSize: '13px',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all'
    },
    addr: {

    },

    rating: {
      whiteSpace: 'nowrap',
      fontSize: '11px',
      marginLeft: '10px',
      color: PRIMARY_COLOR,
      '& > li': {
        marginRight: '2px',
        '&:last-child': {
          marginRight: '0'
        }
      }
    },

    moreButton: {
      cursor: 'pointer',
      position: 'absolute',
      padding: '7px 16px',
      right: '0',
      top: 'calc(50% - 19px)',
      '& > div': {
        background: '#95989A',
        borderRadius: '50%',
        marginTop: '3px',
        height: '6px',
        width: '6px',
        '&:first-child': {
          marginTop: '0'
        }
      }
    },
    margin: { marginBottom: '20px' }
  })
)

const VacancyCard = props => {
  const { history, classes, data, marginBottom, smooth } = props

  const id = loGet(data, 'id')
  const name = loGet(data, 'title')
  const photo = loGet(data, 'owner.logo.file') || Image
  const desc = getOnlyString(loGet(data, 'duties'))
  const createdDate = dateFormat(loGet(data, 'publicationDate'))
  const salaryCurrency = loGet(data, 'currency.name')
  const companyId = loGet(data, ['owner', 'id'])
  const companyName = loGet(data, ['owner', 'title'])
  const companyIsApproved = loGet(data, ['owner', 'generalStatus']) === 'moderated'
  const region = loGet(data, ['place', 'name'])
  const pinned = loGet(data, 'isHighlighted')
  const isPremium = loGet(data, 'isPremium')
  const salaryFrom = loGet(data, 'salaryFrom')
  const salaryTo = loGet(data, 'salaryTo')
  const salaryFromTo = getVacancySalary(salaryFrom, salaryTo, salaryCurrency, 'main_resume_salary_no')
  // Const query = paramsToQuery(loGet(hashHistory, ['location', 'search']))
  // Const openServicesDialog = toBoolean(loGet(query, 'servicesDialog'))
  return (
    <div
      onClick={() => history.push(sprintf(VACANCY_ITEM, id), smooth)}
      className={classNames(classes.vacancyWrap, {
        [classes.pinned]: pinned,
        [classes.margin]: marginBottom
      })}>
      <div className={classes.image} style={{ backgroundImage: 'url(' + photo + ')' }}/>
      <div className={classes.body}>
        <div className={classes.header}>
          <div className={classes.position} title={name}>
            {name}
            {isPremium && <span className={classes.premium}>Премиум вакансия</span>}
          </div>
          <div className={classes.createdDate}>
            {createdDate}
          </div>
        </div>
        <div className={classes.desc}>{desc}</div>
        <div className={classes.footer}>
          <div className={classes.companyInfo}>
            <CompanyName id={companyId} name={companyName} isApproved={companyIsApproved}/>
            <span className={classes.addr}><CompanyAddress name={region}/></span>
          </div>
          <span>{salaryFromTo}</span>
        </div>
      </div>
    </div>
  )
}

VacancyCard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['new', 'top']),
  marginBottom: PropTypes.bool,
  smooth: PropTypes.bool
}

export default enhance(VacancyCard)
