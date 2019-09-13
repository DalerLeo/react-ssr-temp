import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import ProfilePic from 'components/ProfilePic'
import Link from 'components/Link'
import { USER_SETTING_URL } from 'constants/routes'
import fp from 'lodash/fp'
import hexToRgb from 'helpers/hexToRgb'
import { getAgeFromDate } from 'helpers/get'
import {
  ANCHOR_DISABLED,
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'

const style = {
  infoWrap: {
    ...fallbacksStyle('display', 'flex'),
    background: hexToRgb('#eef1f3', '0.7'),
    marginTop: '33px',
    marginBottom: '40px',
    padding: '25px'
  },
  isView: {
    marginTop: '0',
    marginBottom: '30px',
    padding: '30px 0 0',
    background: 'transparent'
  },
  info: {
    width: 'calc(100% - 132px)',
    marginLeft: '20px'
  },
  name: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.22',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between')
  },

  age: {
    color: '#a1a7b3',
    lineHeight: '1.57',
    fontWeight: '500',
    fontSize: '14px'
  },
  edit: {
    ...ANCHOR_DISABLED,
    extend: 'age',
    color: LABEL_COLOR,
    '&:hover': {
      color: LABEL_COLOR,
      textDecoration: 'underline'
    }
  },
  city: {
    lineHeight: '22px',
    marginTop: '7px'
  },
  contacts: {
    extend: 'city',
    color: MAIN_COLOR
  }
}

const ResumeUserInfo = props => {
  const { classes, userDetail, isView } = props
  const userName = fp.get('data.fullName', userDetail)
  const birthdate = fp.get('data.birthdate', userDetail)
  const livingPlace = fp.get('data.livingPlace.name', userDetail)
  const phone = fp.get('data.phone', userDetail)
  const email = fp.get('data.email', userDetail)
  const photo = fp.get('data.photo.file', userDetail)
  const age = getAgeFromDate(birthdate)

  return (
    <div className={classNames({
      [classes.infoWrap]: true,
      [classes.isView]: isView }
    )}>
      <ProfilePic image={photo} type={'medium'}/>
      <div className={classes.info}>
        <div className={classes.name}>
          <div>{userName} {birthdate && <span className={classes.age}>({age})</span>}</div>
          <Link to={USER_SETTING_URL} className={classes.edit}>Настройки</Link>
        </div>
        <div className={classes.city}>{livingPlace}</div>
        <div className={classes.contacts}>{phone}</div>
        <div className={classes.contacts}>{email}</div>
      </div>
    </div>
  )
}

ResumeUserInfo.propTypes = {
  classes: PropTypes.object,
  userDetail: PropTypes.object.isRequired,
  isView: PropTypes.bool
}

export default injectSheet(style)(ResumeUserInfo)
