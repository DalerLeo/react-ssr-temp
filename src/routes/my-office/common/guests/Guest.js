import React from 'react'
import moment from 'moment'
import sprintf from 'sprintf'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { COMPANIES_ITEM_URL } from 'constants/routes'
import MyJobImage from 'images/myjob.png'
import Col from 'antd/lib/col'
import T from 'components/T'
import Link from 'components/Link'
import Rating from 'components/Cards/CardRating'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'

const borderStyle = '1px solid rgba(198, 203, 212, 0.65)'
const withStyles = injectSheet({
  cardWrapper: {
    position: 'relative',
    '&:nth-child(n + 3)': {
      marginTop: '20px'
    }
  },
  card: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('borderRadius', '4px'),
    background: '#fff',
    border: borderStyle,
    overflow: 'hidden',
    position: 'relative',
    minHeight: '110px',
    height: '100%'
  },
  companyCard: {
    border: 'none',
    '& $body': {
      ...crossBrowserify('borderRadius', '0 4px 4px 0'),
      border: borderStyle
    }
  },
  applicantCard: {
    '& $photo': {
      ...crossBrowserify('alignSelf', 'center'),
      ...crossBrowserify('borderRadius', '50%'),
      borderRight: 'none',
      marginLeft: '20px',
      height: '70px',
      width: '70px'
    }
  },
  photo: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '110px'
  },
  body: {
    ...crossBrowserify('flexGrow', '1'),
    padding: '20px 25px 25px'
  },
  title: {
    fontWeight: '500',
    lineHeight: '22px',
    marginBottom: '3px'
  },
  viewCount: {
    color: '#8798ad',
    fontSize: '13px'
  },
  lastVisit: {
    extend: 'viewCount'
  },
  createdDate: {
    color: '#a1a7b3',
    fontSize: '13px',
    lineHeight: '16px',
    marginBottom: '8px'
  },
  vacancyCount: {
    fontSize: '13px',
    lineHeight: '16px',
    marginTop: '8px'
  }
})

const getVacancyCount = count => {
  if (count) return `${count} вакансии`
  return 'нет вакансий'
}

const dateFormat = {
  sameDay: '[сегодня]',
  lastDay: '[вчера]',
  lastWeek: 'D MMMM YYYY',
  sameElse: 'D MMMM YYYY'
}

const Guest = props => {
  const {
    id,
    classes,
    userType,
    fullName,
    viewCount,
    vacancyCount,
    rating,
    lastVisit
  } = props

  const isAnonymous = typeof userType === 'undefined'
  const photo = props.photo || MyJobImage

  const isApplicant = userType === 'applicant'
  const isEmployer = userType === 'employer'
  const dateFormatted = moment(lastVisit).calendar(null, dateFormat)

  return (
    <Col span={12} className={classes.cardWrapper}>
      <div className={classNames(classes.card, {
        [classes.companyCard]: isEmployer,
        [classes.applicantCard]: isApplicant
      })}>
        {!isAnonymous && <div className={classes.photo} style={{ backgroundImage: `url(${photo})` }}/>}
        {isEmployer && <Link absolute={true} to={sprintf(COMPANIES_ITEM_URL, id)}/>}
        <div className={classes.body}>
          <div className={classes.title}>{fullName}</div>
          {Boolean(viewCount) && <div className={classes.viewCount}><T>main_visits</T>: {viewCount}</div>}
          {Boolean(lastVisit) &&
          <div className={classes.lastVisit}>
            Последнее посещение: {dateFormatted}
          </div>}
          {vacancyCount && <div className={classes.vacancyCount}>{getVacancyCount(vacancyCount)}</div>}
          {userType === 'applicant' && <Rating style={{ marginTop: '8px' }} rating={rating}/>}
        </div>
      </div>
    </Col>
  )
}

Guest.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.number,
  userType: PropTypes.string,
  photo: PropTypes.string,
  fullName: PropTypes.string,
  viewCount: PropTypes.number,
  vacancyCount: PropTypes.number,
  rating: PropTypes.number,
  lastVisit: PropTypes.string
}

export default withStyles(Guest)
