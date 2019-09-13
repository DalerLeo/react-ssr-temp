import React from 'react'
import { compose, withState, lifecycle } from 'recompose'
import _ from 'lodash'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { BLACK_COLOR, MAIN_COLOR } from 'constants/styles'
import hexToRgb from '../../../helpers/hexToRgb'
import Anchor from 'antd/lib/anchor'
const anchorRef = React.createRef()
const { Link } = Anchor

const OFFSET = 275
const style = {
  sideNav: {
    width: '225px',
    paddingRight: '75px',
    '& .ant-anchor-link-title': {
      color: hexToRgb(BLACK_COLOR, '0.2'),
      lineHeight: '1.54'
    },
    '& .ant-anchor-link-title-active': {
      color: '#000 !important'
    },
    '& .ant-anchor-link': {
      paddingLeft: '5px !important'
    },
    '& .ant-anchor-ink-ball': {
      border: 'none',
      width: '2px',
      marginTop: '-3px',
      background: MAIN_COLOR,
      height: '15px'
    },
    '& .ant-anchor-ink::before': {
      display: 'none'
    },
    '& .ant-anchor-wrapper': {
      background: 'transparent'
    },
    '& .ant-anchor': {
      fontFamily: 'inherit !important',
      '& > div': {
        '& > a': {
          lineHeight: '1.54',
          fontWeight: '500'
        },
        '& > div > a': {
          fontSize: '12px',
          color: hexToRgb(BLACK_COLOR, '0.5')
        }
      }
    }
  },
  head: {
    color: hexToRgb('#000', '0.2'),
    paddingLeft: '5px',
    borderLeft: '2px solid transparent',
    marginTop: '20px',
    transition: 'all 500ms',
    transitionDelay: '1s'
  },
  active: {
    borderLeftColor: MAIN_COLOR + '!important',
    color: BLACK_COLOR
  }
}
const listener = () => {
  const elem = _.get(anchorRef, 'current.children.0.children.0')
  const parentEl = _.get(anchorRef, 'current')
  // Const parentEl = elem.parentElement
  const parentRect = parentEl.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const parentPos = parentRect.bottom + scrollTop

  if (parentPos < (scrollTop + OFFSET)) {
    elem.style.position = 'absolute'
    elem.style.bottom = '140px'
    elem.style.top = 'unset'
  } else {
    elem.style.position = 'fixed'
    elem.style.top = '100px'
  }
}
const enhance = compose(
  withState(
    'active',
    'setActive',
    'Пожелания'),
  injectSheet(style),
  lifecycle({
    componentDidMount () {
      window.addEventListener('scroll', listener)
    },
    componentWillUnmount () {
      window.removeEventListener('scroll', listener)
    }
  })
)
const SideNav = props => {
  const { classes, list } = props
  //
  return (
    <div className={classes.sideNav} ref={anchorRef}>
      <Anchor offsetTop={100} offsetBottom={422}>
        {_.map(list, item => {
          return (
            <Link
              key={item.href}
              href={'#' + item.href}
              title={item.name} >
              {_.map(_.get(item, 'children'), child => (
                <Link
                  key={child.href}
                  href={'#' + child.href}
                  title={child.name}/>
              ))}
            </Link>
          )
        })}
      </Anchor>
    </div>
  )
}

SideNav.propTypes = {
  classes: PropTypes.object,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

export default enhance(SideNav)
