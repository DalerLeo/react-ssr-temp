import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Link from 'components/Link'
import { USER_SETTING_URL } from 'constants/routes'
import fp from 'lodash/fp'
import hexToRgb from 'helpers/hexToRgb'
import {
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import ProfilePic from 'components/ProfilePic'
import T from 'components/T'

const style = {
  infoWrap: {
    marginTop: '33px',
    padding: '25px',
    background: hexToRgb('#eef1f3', '0.7'),
    ...fallbacksStyle('display', 'flex')
  },
  isView: {
    padding: '30px 0 25px',
    marginTop: '0',
    background: '#fbfcfd'
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
  edit: {
    color: LABEL_COLOR,
    fontSize: '14px',
    '&:hover': {
      color: LABEL_COLOR,
      textDecoration: 'underline'
    }
  },
  city: {
    marginTop: '7px'
  },
  contacts: {
    extend: 'city',
    color: MAIN_COLOR
  }
}
const VacancyUserInfo = props => {
  const { classes, userDetail, isView } = props
  const userName = fp.get('data.title', userDetail)
  const livingPlace = fp.get('data.address', userDetail)
  const phone = fp.get('data.phone', userDetail)
  const email = fp.get('data.username', userDetail)
  const logo = fp.get('data.logo.file', userDetail)

  return (
    <div className={classNames({
      [classes.infoWrap]: true,
      [classes.isView]: isView }
    )}>
      <ProfilePic image={logo} type={'medium'}/>
      <div className={classes.info}>
        <div className={classes.name}>
          <div>{userName}</div>
          <Link to={USER_SETTING_URL} className={classes.edit}><T>main_global_edit</T></Link>
        </div>
        <div className={classes.city}>{livingPlace}</div>
        <div className={classes.contacts}>{phone}</div>
        <div className={classes.contacts}>{email}</div>
      </div>
    </div>
  )
}

VacancyUserInfo.propTypes = {
  classes: PropTypes.object,
  userDetail: PropTypes.object.isRequired,
  isView: PropTypes.bool
}

export default injectSheet(style)(VacancyUserInfo)
