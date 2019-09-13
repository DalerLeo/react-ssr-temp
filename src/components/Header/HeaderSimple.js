import fp from 'lodash/fp'
import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import withHistory from 'helpers/withHistory'
import hexToRgb from 'helpers/hexToRgb'
import { logoutAction } from 'routes/user/actions'
import LeftIcon from 'react-icons/lib/md/keyboard-arrow-left'
import T from 'components/T'
import Container from 'components/Container'
import LogoTitle from 'components/Title/LogoTitle'
import DropdownList from './DropdownList'

const enhance = compose(
  withHistory,
  connect(state => ({
    isAuth: fp.get('login.data.token', state),
    userData: fp.get('user.data', state) || {},
    authLoading: fp.get('login.loading', state)
  }), { logoutAction }),

  injectSheet({
    headerContainer: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '100',
      background: '#fcfcfd'
    },

    back: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      fontWeight: '500',
      cursor: 'pointer',
      '& svg': {
        fontSize: '18px'
      }
    },
    header: {
      background: 'inherit',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('alignItems', 'center'),
      height: '68px',
      position: 'relative'
    },

    item: {
      color: hexToRgb(BLACK_COLOR, '0.75'),
      fontSize: '14px'
    },
    auth: {
      extend: 'languages',
      marginLeft: '16px',
      paddingLeft: '30px'
    }
  })
)

const HeaderSimple = props => {
  const {
    classes,
    history,
    isAuth,
    userData,
    query
  } = props

  const goBack = () => query.re ? history.push(query.re) : history.goBack()
  return (
    <div className={classes.headerContainer}>
      <Container>
        <div className={classes.header}>
          <div className={classes.back} onClick={goBack}>
            <LeftIcon/>
            <T>button_back</T>
          </div>

          <LogoTitle simple/>

          <div className={classNames(classes.item, classes.auth)}>
            {isAuth &&
            <DropdownList
              user={userData}
              logout={props.logoutAction}
            />}
          </div>
        </div>
      </Container>
    </div>
  )
}
HeaderSimple.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  isAuth: PropTypes.any,
  logoutAction: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired

}
export default enhance(HeaderSimple)
