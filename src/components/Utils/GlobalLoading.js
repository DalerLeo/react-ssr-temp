import { crossBrowserify, MAIN_COLOR } from 'constants/styles'
import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import fp from 'lodash/fp'
import hexToRgb from 'utils/hexToRgb'

const loaderStyle = {
  border: '6px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '6px solid ' + MAIN_COLOR,
  width: '100px',
  height: '100px',
  display: 'inline-block',
  'WebkitAnimation': 'spin 1000ms linear infinite',
  animation: 'spin 1000ms linear infinite'
}

const loadWrap = {
  'WebkitAnimation': 'opacityAnim 1000ms',
  animation: 'opacityAnim 1000ms',
  display: 'block',
  zIndex: '99998',
  background: '#fff9',
  position: 'fixed',
  top: '0',
  textAlign: 'center',
  paddingTop: '300px',
  height: '120vh',
  width: '1200px'
}

const mapStateToProps = (state) => ({
  loading: fp.get(['asyncLoading', 'loading'], state)
})

const enhance = compose(
  connect(mapStateToProps),
  injectSheet({
    loadWrap: {
      ...crossBrowserify('animation', 'opacityAnim 1000ms'),
      display: 'block',
      zIndex: '2000',
      background: '#ffffff5e',
      position: 'fixed',
      top: '0',
      left: '0',
      bottom: '0',
      textAlign: 'center',
      width: '100%'
    },
    linearActivity: {
      overflow: 'hidden',
      width: '100%',
      height: '3px',
      backgroundColor: hexToRgb(MAIN_COLOR, '0.3')
    },

    indeterminate: {
      position: 'relative',
      width: '100%',
      height: '100%',
      '&:before': {
        ...crossBrowserify('animation', 'indeterminate_first 1.5s infinite ease-out'),
        backgroundColor: MAIN_COLOR,
        content: '""',
        position: 'absolute',
        height: '100%'
      },
      '&:after': {
        ...crossBrowserify('animation', 'indeterminate_second 1.5s infinite ease-in'),
        backgroundColor: hexToRgb(MAIN_COLOR, '0.7'),
        content: '""',
        position: 'absolute',
        height: '100%'
      }
    },

    '@keyframes indeterminate_first': {
      '0%': {
        left: '-100%',
        width: '100%'
      },
      '100%': {
        left: '100%',
        width: '10%'
      }
    },

    '@keyframes indeterminate_second': {
      '0%': {
        left: '-150%',
        width: '100%'
      },
      '100%': {
        left: '100%',
        width: '10%'
      }
    }
  })
)
const TRUE = true
const GlobalLoading = ({ loading, classes }) => {
  if (loading) {
    return (
      <div className={classes.loadWrap}>
        <div className={classes.linearActivity}>
          <div className={classes.indeterminate} />
        </div>
      </div>
    )
  }
  if (!TRUE) {
    return (
      <div style={loadWrap}>
        <div style={loaderStyle} />
      </div>
    )
  }

  return null
}

GlobalLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.object
}

export default enhance(GlobalLoading)
