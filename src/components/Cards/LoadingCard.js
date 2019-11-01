import {
  crossBrowserify,
  fallbacksStyle,
  PRIMARY_COLOR,
  WHITE_COLOR,
  GREY_BORDER_STYLE,
  BLACK_COLOR,
  FADE_IN_ANIMATE,
  ANCHOR_DISABLED
} from '../../constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  VACANCY,
  COMPANY,
  VACANCY_BIG,
  VACANCY_CUSTOM,
  RESUME,
  BACK_WHITE,
  SEARCH,
  APP,
  APP_BIG
} from './constants'

const enhance = compose(
  injectSheet({
    '@keyframes wave': {
      '0%': { backgroundColor: '#f2f6ff' },
      '20%': { backgroundColor: '#ecf0fb' },
      '40%': { backgroundColor: '#f2f6ff' },
      '60%': { backgroundColor: '#ecf0fb' },
      '80%': { backgroundColor: '#f2f6ff' },
      '100%': { backgroundColor: '#ecf0fb' }
    },
    animation: {
      ...crossBrowserify('animationName', 'wave'),
      ...crossBrowserify('animationDuration', '1.5s'),
      'animation-iteration-count': 'infinite'
    },

    vacancy: {
      ...fallbacksStyle('display', 'flex'),
      fontSize: '12px',
      overflow: 'hidden',
      width: '100%',
      border: GREY_BORDER_STYLE,
      borderRadius: '4px',
      animationName: 'fadeIn',
      animationDuration: '500ms',
      color: BLACK_COLOR,
      ...ANCHOR_DISABLED
    },

    flex: {
      ...fallbacksStyle('display', 'flex')
    },
    ...FADE_IN_ANIMATE,
    pinned: {
      '& $body': {
        background: PRIMARY_COLOR,
        color: WHITE_COLOR,
        '& $position': {
          color: 'inherit'
        }
      }
    },

    image: {
      extend: 'animation',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      height: '131px',
      width: '131px',
      minWidth: '131px'
    },

    body: {
      padding: '19px 22px 16px 25px',
      position: 'relative',
      width: '100%'
    },

    position: {
      marginTop: '4px',
      extend: 'animation',
      width: '40%',
      color: BLACK_COLOR,
      fontWeight: '500',
      fontSize: '14px',
      height: '21px',
      background: '#efefef'
    },
    animator: {
      marginTop: '4px',
      extend: 'animation',
      color: BLACK_COLOR,
      height: '21px',
      background: '#efefef'
    },
    oneFourth: {
      extend: 'animator',
      marginTop: '4px',
      width: '25%'
    },
    oneThird: {
      extend: 'animator',
      marginTop: '4px',
      width: '33%'
    },
    half: {
      extend: 'animator',
      marginTop: '4px',
      width: '50%'
    },
    threeFourth: {
      extend: 'animator',
      width: '75%'
    },
    desc: {
      extend: 'animation',
      width: '100%',
      height: '14px',
      marginTop: '4px',
      fontSize: '13px',
      paddingRight: '120px',
      background: '#efefef'
    },
    photo: {
      extend: 'animation',
      borderRadius: '4px',
      marginRight: '8px',
      height: '56px',
      width: '56px'
    },
    bodyInfo: { margin: '15px 0' },
    margin: { marginBottom: '20px' },
    loadingList: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      border: '1px solid rgba(198, 203, 212, 0.65)',
      borderRadius: '4px',
      padding: '18px 20px 18px',
      height: '58px',
      marginBottom: '20px'
    },
    vacancyBig: {
      border: GREY_BORDER_STYLE,
      borderRadius: '4px',
      marginBottom: '20px',
      padding: '20px 22px'
    },
    white: {
      background: '#fff'
    }
  })
)

const LoadingCard = props => {
  const { classes, marginBottom, type } = props

  if (type === SEARCH) {
    return (
      <div className={classes.loadingList}>
        <div className={classes.position} />
        <div className={classes.oneFourth} />
      </div>
    )
  }

  if (type === VACANCY_BIG || type === APP_BIG || type === RESUME) {
    return (
      <div
        className={classNames(classes.vacancyBig, {
          [classes.margin]: marginBottom
        })}
      >
        <div className={classes.threeFourth} />
        <div className={classes.bodyInfo}>
          <div className={classes.flex}>
            <div className={classes.photo} />
            <div style={{ width: '100%' }}>
              <div className={classes.oneThird} />
              <div className={classes.oneFourth} />
            </div>
          </div>
          <div className={classes.desc} />
          <div className={classes.desc} />
          <div className={classes.desc} />
        </div>
        <div className={classes.oneFourth} />
      </div>
    )
  }
  return (
    <a
      className={classNames(classes.vacancy, {
        [classes.margin]: marginBottom,
        [classes.white]: type === BACK_WHITE
      })}
    >
      <div className={classes.image} style={{ background: '#efefef' }} />
      <div className={classes.body}>
        <div className={classes.position} />
        <div className={classes.desc} />
        <div className={classes.desc} />
        <div className={classes.position} />
      </div>
    </a>
  )
}

LoadingCard.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.oneOf([
    RESUME,
    SEARCH,
    VACANCY,
    APP_BIG,
    VACANCY_BIG,
    APP,
    COMPANY,
    VACANCY_CUSTOM
  ]),
  marginBottom: PropTypes.bool
}

export default enhance(LoadingCard)
