import { MAIN_COLOR, ZERO } from 'constants/styles'
import loReplace from 'lodash/replace'
import fp from 'lodash/fp'
import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import withHistory from 'helpers/withHistory'
import t from 'helpers/translate'
import Affix from 'antd/lib/affix'
import TW from 'components/TW'

const style = {
  sideNav: {
    paddingRight: '75px',
    minWidth: '225px',
    width: '225px'
  },
  anchor: {

  },
  navigationLink: {
    color: '#99A0AA',
    cursor: 'pointer',
    display: 'block',
    fontSize: '14px',
    lineHeight: 'normal',
    transition: 'all 300ms',
    marginBottom: '16px',
    '&:hover:not($navigationLinkActive)': {
      color: '#99A0AA'
    },
    '&:last-child': {
      marginBottom: '0'
    }
  },
  navigationLinkActive: {
    color: 'black',
    position: 'relative',
    '&:before': {
      content: '""',
      background: MAIN_COLOR,
      position: 'absolute',
      top: '0',
      bottom: '0',
      right: 'calc(100% + 8px)',
      width: '3px'
    }
  }
}

const withStyles = compose(
  withHistory,
  injectSheet(style)
)

const SideNav = props => {
  const { classes, history, list, offsetTop, offsetBottom } = props

  const locationHash = fp.get(['location', 'hash'], history)

  const sideNavRef = useRef(null)
  const listFirstHref = fp.flow(
    fp.first,
    fp.get('href')
  )(list)
  const [activeAnchor, setActiveAnchor] = useState(listFirstHref)

  const listener = () => {
    const element = fp.get('current.children.0.children.0', sideNavRef)
    const parentEl = fp.get('current', sideNavRef)
    const elementRect = element.getBoundingClientRect()
    const parentRect = parentEl.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const bottomThreshold = (parentRect.height - elementRect.height - scrollTop)

    if (bottomThreshold <= ZERO) {
      element.style.position = 'absolute'
      element.style.bottom = `${offsetBottom}px`
      element.style.top = 'unset'
    } else {
      element.style.position = 'fixed'
      element.style.top = `${offsetTop}px`
      element.style.bottom = 'unset'
    }

    fp.forEach(item => {
      const href = fp.get('href', item)
      const el = document.getElementById(href)
      if (el) {
        const elementPositions = el.getBoundingClientRect()
        const startPoint = scrollTop + elementPositions.top
        const elHeight = elementPositions.height
        if ((startPoint <= (scrollTop + offsetTop)) && (scrollTop <= (startPoint + elHeight))) {
          setActiveAnchor(href)
        }
      }
    }, list)
  }

  useEffect(() => {
    setActiveAnchor(listFirstHref)
  }, [list, listFirstHref])

  useEffect(() => {
    listener()
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [listener])

  const handleClick = useCallback((href, custom) => {
    const scrollVal = window.pageYOffset
    const element = document.getElementById(href)
    const isFirst = href === listFirstHref
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const elementPositionTop = elementRect.top + scrollVal
      window.scrollTo({
        top: isFirst ? ZERO : (elementPositionTop - offsetTop),
        behavior: 'smooth'
      })
    }
  })

  useEffect(() => {
    if (locationHash) {
      handleClick(loReplace(locationHash, '#', ''), true)
    }
  }, [handleClick, locationHash])

  return (
    <div ref={sideNavRef} className={classes.sideNav}>
      <Affix offsetTop={offsetTop}>
        <TW>
          {lang => fp.map(item => {
            const isTranslated = fp.get('isTranslated', item)
            const name = fp.get('name', item)
            const title = isTranslated ? name : t(name, lang)
            const href = fp.get('href', item)
            const hash = `#${href}`
            const isActive = locationHash
              ? hash === locationHash
              : href === activeAnchor
            return (
              <div
                key={hash}
                onClick={() => handleClick(href)}
                title={title}
                className={classNames(classes.navigationLink, {
                  [classes.navigationLinkActive]: isActive
                })}
              >
                {title}
              </div>
            )
          }, list)}
        </TW>
      </Affix>
    </div>
  )
}

SideNav.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  disableListener: PropTypes.bool,
  list: PropTypes.array.isRequired
}

SideNav.defaultProps = {
  disableListener: false,
  offsetTop: 108,
  offsetBottom: 582
}

export default withStyles(SideNav)
