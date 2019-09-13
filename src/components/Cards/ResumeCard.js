import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import sprintf from 'sprintf'
import {
  crossBrowserify,
  fallbacksStyle,
  GREY_BORDER_STYLE,
  BLACK_COLOR,
  FADE_IN_ANIMATE
} from 'constants/styles'
import { RESUME_ITEM } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import dateFormat from 'helpers/dateFormat'
import { getExperience } from 'helpers/get'
import Rating from './CardRating'
import ProfilePic from 'components/ProfilePic'
import Link from 'components/Link'
import T from 'components/T'
import TW from 'components/TW'

const enhance = compose(
  injectSheet({
    resume: {
      background: '#fff',
      ...fallbacksStyle('display', 'flex'),
      fontSize: '12px',
      overflow: 'hidden',
      width: '100%',
      border: GREY_BORDER_STYLE,
      animationName: 'fadeIn',
      animationDuration: '2s',
      borderRadius: '4px'
    },
    ...FADE_IN_ANIMATE,
    image: {
      padding: '22px 20px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'baseline'),
      ...crossBrowserify('justifyContent', 'center')
    },

    body: {
      padding: '22px 20px 15px 0',
      position: 'relative',
      width: '100%'
    },
    date: {
      fontSize: '13px',
      color: '#A1A7B3'
    },
    header: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginBottom: '3px',
      marginTop: '3px',
      lineHeight: '1.57',
      color: BLACK_COLOR,
      fontWeight: '500',
      fontSize: '14px'
    },

    desc: {
      overflow: 'hidden',
      lineHeight: '1.62',
      fontSize: '13px',
      color: hexToRgb(BLACK_COLOR, '0.7'),
      marginTop: '1px'
    },
    rating: {
      extend: 'desc',
      marginTop: '6px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between')
    },
    status: {
      lineHeight: '29px',
      borderRadius: '15px',
      padding: '0 15px',
      color: '#fff'
    }
  })
)

const ResumeCard = ({ data, smooth, style, ...props }) => {
  const { classes } = props
  const name = _.get(data, 'title')
  const date = _.get(data, 'date')
  const fullName = _.get(data, 'owner.fullName')
  const mail = _.get(data, 'owner.email')
  const phone = _.get(data, 'owner.phone')
  const rating = _.get(data, 'owner.rating')
  const photo = _.get(data, 'owner.photo.file')
  const id = _.get(data, 'id')
  const status = _.get(data, 'status')

  const statuses = {
    'viewed': 'applicant_vacancy_appeal_viewed',
    'accepted': 'applicant_vacancy_appeal_accepted',
    'rejected': 'applicant_vacancy_appeal_rejected'
  }
  const styles = {
    'viewed': { background: '#EEF1F6', color: '#000' },
    'accepted': { background: '#7560F4', color: '#fff' },
    'rejected': { background: '#F46090', color: '#fff' },
    'requested': { background: '#fff', color: '#fff' }
  }
  const experience = getExperience(_.get(data, 'workExperience'))
  const statusText = statuses[status]
  return (
    <Link
      style={style}
      to={sprintf(RESUME_ITEM, id)}
      smooth={smooth}
      className={classNames(classes.resume)}>
      <div className={classes.image}>
        <ProfilePic type={'mini'} image={photo}/>
      </div>
      <div className={classes.body}>
        <div className={classes.date}>
          <TW>{lang => dateFormat(date, true, lang)}</TW>
        </div>
        <div className={classes.header}>{name}</div>
        <div className={classes.desc}>{fullName}</div>
        <div className={classes.desc}>{mail} {phone}</div>
        <div className={classes.desc}><T>main_work_experience</T>: {experience}</div>
        <div className={classes.rating}>
          <Rating rating={rating}/>
          {statusText && <div style={styles[status]} className={classes.status}>
            <T>{statusText}</T>
          </div>}
        </div>
      </div>
    </Link>
  )
}

ResumeCard.propTypes = {
  data: PropTypes.object.isRequired,
  style: PropTypes.object,
  classes: PropTypes.object,
  smooth: PropTypes.bool

}

export default enhance(ResumeCard)
