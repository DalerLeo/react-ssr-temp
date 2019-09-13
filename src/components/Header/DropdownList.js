import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import sprintf from 'sprintf'
import {
  crossBrowserify,
  fallbacksStyle,
  ANCHOR_DISABLED
} from 'constants/styles'
import {
  APPLICANT_ITEM_URL,
  EMPLOYER_ITEM_URL,
  USER_SETTING_URL,
  SUBSCRIPTION_URL
} from 'constants/routes'
import withHistory from 'helpers/withHistory'
import caughtCancel from 'helpers/caughtCancel'
import hexToRgb from 'helpers/hexToRgb'
import { isEmployer, isApplicant } from 'helpers/get'
import MdExpandMore from 'react-icons/lib/md/keyboard-arrow-down'
import Dropdown from 'antd/lib/dropdown/dropdown'
import Menu from 'antd/lib/menu/index'
import Link from '../Link'
import T from '../T'
import RenderOrNull from 'components/Utils/RenderOrNull'
import ProfilePic from 'components/ProfilePic'
import BadgePulse from 'components/BadgePulse'

const style = {
  settings: {
    fontFamily: 'inherit',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },
  item: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('transition', 'all 500ms'),
    cursor: 'pointer',
    position: 'relative',
    whiteSpace: 'nowrap',
    '&.ant-dropdown-open $arrow': {
      ...crossBrowserify('transform', 'rotate(180deg)')
    }
  },
  icon: {
    fontSize: '20px',
    opacity: '0.5'
  },
  text: {
    borderBottom: `1px dashed ${hexToRgb('#000', '0.24')}`,
    marginLeft: '6px',
    marginRight: '3px'
  },
  arrow: {
    ...crossBrowserify('transition', 'all 200ms'),
    fontSize: '22px'
  },
  arrowExpanded: {
    ...crossBrowserify('transform', 'rotate(180deg)')
  },
  dropDown2: {
    fontFamily: '\'Montserrat\', sans-serif',
    '& .ant-dropdown-menu-item': {
      width: '272px',
      cursor: 'unset',
      padding: '0 25px',
      '&:hover': {
        background: 'none'
      }
    },
    '& .ant-dropdown-menu-item-active': {
      background: 'none'
    }
  },
  contact: {
    display: 'block',
    padding: '20px 30px 16px',
    margin: '0 -25px',
    '& a': {
      ...ANCHOR_DISABLED
    },
    '& div:nth-child(1)': {
      lineHeight: 'normal',
      marginBottom: '1px',
      fontWeight: '600',
      color: '#202124'
    },
    '& div:nth-child(2)': {
      lineHeight: 'normal',
      color: '#969ba8'
    }
  },
  menuItems: {
    padding: '8px 25px',
    margin: '0 -25px',
    borderTop: 'solid 1px #F6F6F6'
  },
  menuLink: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'space-between'),
    ...crossBrowserify('borderRadius', '4px'),
    ...crossBrowserify('transition', 'all 300ms'),
    color: '#202124 !important',
    cursor: 'pointer',
    fontWeight: '500',
    lineHeight: '18px',
    padding: '7px 6px 7px 8px',
    '&:hover': {
      backgroundColor: hexToRgb('#8798ad', '0.08')
    }
  },
  counter: {
    color: '#fff',
    background: '#f46090',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '9px',
    padding: '1px 6px',
    lineHeight: 'normal'
  }
}

const mapStateToProps = state => ({
  notifications: fp.get('notifications.data', state)
})

const enhance = compose(
  withHistory,
  connect(mapStateToProps),
  withHandlers({
    onLogout: props => () => {
      const timeout = 500
      const redirectToHome = () => props.history.replace('/')
      redirectToHome()
      setTimeout(() => {
        props.logout()
          .then(() => redirectToHome())
          .catch(caughtCancel)
      }, timeout)
    }
  }),
  injectSheet(style)
)

const formatFullName = fullName => {
  /* eslint-disable no-magic-numbers */
  const splitted = fp.slice(0, 2, fp.split(' ', fullName))
  const [firstName, lastName] = splitted
  const lastNameFirstWord = lastName ? lastName.substring(0, 1) : ''
  return `${firstName} ${lastNameFirstWord}`
}

const DropDownList = props => {
  const { classes, user, onLogout, setChatDialog, notifications } = props
  const newMessagesCount = fp.get('newMessageCount', notifications)
  const allNotificationsCount = fp.flow(
    fp.map(value => value),
    fp.sumBy(value => value)
  )(notifications)
  const restNotificationsCount = allNotificationsCount - newMessagesCount

  const name = fp.get('fullName', user) || fp.get('title', user)
  const username = fp.get('username', user)
  const email = fp.get('email', user)
  const photo = fp.get('photo.file', user) || fp.get('logo.file', user)
  const path = isEmployer(user) ? sprintf(EMPLOYER_ITEM_URL, 'stats') : sprintf(APPLICANT_ITEM_URL, 'resume')

  const messagesLink = isEmployer(user) ? sprintf(EMPLOYER_ITEM_URL, 'vip') : ''
  const onOpenChatDialog = () => setChatDialog()

  const messagesContent = (
    <React.Fragment>
      <T>menu_my_messages</T>
      <RenderOrNull value={newMessagesCount}>
        <span className={classes.counter}>{newMessagesCount}</span>
      </RenderOrNull>
    </React.Fragment>
  )

  const isAuthMenu = (
    <Menu className={classes.dropDown2}>
      <Menu.Item>
        <div className={classes.contact}>
          <div>{name}</div>
          <div>{username || email}</div>
        </div>
        <div className={classes.menuItems}>
          <Link className={classes.menuLink} to={path}>
            <T>menu_my_office</T>
            <RenderOrNull value={restNotificationsCount}>
              <span className={classes.counter}>{restNotificationsCount}</span>
            </RenderOrNull>
          </Link>
          <Link className={classes.menuLink} to={SUBSCRIPTION_URL}>
            <T>menu_subscriptions</T>
          </Link>
          {isApplicant(user)
            ? <span className={classes.menuLink} style={{ cursor: 'pointer' }} onClick={onOpenChatDialog}>{messagesContent}</span>
            : <Link className={classes.menuLink} to={messagesLink}>
              {messagesContent}
            </Link>}
          <Link className={classes.menuLink} to={USER_SETTING_URL}>
            <T>menu_my_settings</T>
          </Link>
        </div>
        <div className={classes.menuItems}>
          <a className={classes.menuLink} onClick={onLogout}>
            <T>menu_logout</T>
          </a>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={classes.settings}>
      <Dropdown
        overlay={isAuthMenu}
        trigger={['hover']}
        placement={'bottomCenter'}>
        <div className={classes.item}>
          <ProfilePic type={'xxs'} image={photo}/>
          <span className={classes.text}>
            {isEmployer(user)
              ? <T>menu_my_office</T>
              : formatFullName(name)}
          </span>
          <MdExpandMore className={classes.arrow}/>
          <RenderOrNull value={allNotificationsCount}>
            <BadgePulse positions={{ top: -3, left: -3 }}/>
          </RenderOrNull>
        </div>
      </Dropdown>
    </div>
  )
}

DropDownList.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object.isRequired,
  setChatDialog: PropTypes.func,
  onLogout: PropTypes.func.isRequired,
  notifications: PropTypes.object
}

export default enhance(DropDownList)
