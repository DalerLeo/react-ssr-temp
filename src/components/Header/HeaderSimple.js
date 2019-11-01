import {
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import fp from 'lodash/fp'
import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import withHistory from 'helpers/withHistory'
import hexToRgb from 'helpers/hexToRgb'

import Container from 'components/Container'

const enhance = compose(
  withHistory,
  connect(state => ({
    isAuth: fp.get('login.data.token', state),
    userData: fp.get('user.data', state) || {},
    authLoading: fp.get('login.loading', state)
  })),

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
    classes
  } = props

  return (
    <div className={classes.headerContainer}>
      <Container>
        Header Simple
      </Container>
    </div>
  )
}
HeaderSimple.propTypes = {
  classes: PropTypes.object

}
export default enhance(HeaderSimple)
