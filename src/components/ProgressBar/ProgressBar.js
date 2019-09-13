import React, { useEffect, useRef } from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import {
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import Container from 'components/Container'
import T from 'components/T'

const withStyles = injectSheet({
  wrapper: {
    background: '#f2f4f6',
    position: 'fixed',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '10',
    '& > div': {
      padding: '16px 260px 26px 226px'
    }
  },
  info: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    marginBottom: '11px'
  },
  continueLater: {
    color: LABEL_COLOR,
    cursor: 'pointer'
  },
  bar: {
    position: 'relative',
    height: '5px',
    background: '#c6cbd4',
    borderRadius: '4.5px'
  },
  progress: {
    transition: 'width 200ms',
    borderRadius: '4.5px',
    position: 'absolute',
    background: MAIN_COLOR,
    height: '100%',
    left: '0'
  }
})

const percentStyle = {
  color: MAIN_COLOR,
  fontWeight: '500'
}

const listener = wrapper => {
  const elem = wrapper.current
  const parentContainer = elem.parentNode
  const headerHeight = 68
  const parentContainerHeight = parentContainer.clientHeight
  const footerHeight = document.body.clientHeight - headerHeight - parentContainerHeight

  const parentEl = elem.parentElement
  const parentRect = parentEl.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowBottom = scrollTop + document.documentElement.clientHeight
  const parentPos = parentRect.bottom + scrollTop
  if (parentPos < windowBottom) {
    elem.style.position = 'absolute'
    elem.style.bottom = `${footerHeight}px`
  } else {
    elem.style.position = 'fixed'
    elem.style.bottom = '0'
  }
}

const ProgressBar = props => {
  const { classes, text, percent, isView, onResumeLater } = props

  const wrapper = useRef(null)
  const onScroll = () => listener(wrapper)
  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={wrapper} className={classes.wrapper}>
      <Container>
        <div className={classes.info}>
          <div><T>{text}</T> <span style={percentStyle}>{`${percent}%`}</span></div>
          {!isView && <span onClick={onResumeLater} className={classes.continueLater}><T>button_to_postpone</T></span>}
        </div>
        <div className={classes.bar}>
          <div
            className={classes.progress}
            style={{ width: `${percent}%` }}/>
        </div>
      </Container>
    </div>
  )
}

ProgressBar.propTypes = {
  classes: PropTypes.object,
  text: PropTypes.string,
  isView: PropTypes.bool,
  percent: PropTypes.number.isRequired,
  onResumeLater: PropTypes.func.isRequired
}

export default withStyles(ProgressBar)
