/* eslint-disable no-magic-numbers */
import fp from 'lodash/fp'
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import { getApplicantRate } from './actions'
import Star from 'react-icons/lib/md/star'

const stateToProps = () => ({})

const ratings = [1, 2, 3, 4, 5]
const withStyles = compose(
  connect(stateToProps, { getApplicantRate }),
  injectSheet({
    container: {
      display: 'none'
    },
    loading: {
      pointerEvents: 'none',
      opacity: '0.6'
    },
    rating: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('borderRadius', '50px'),
      ...crossBrowserify('boxShadow', '0px 5px 16px rgba(0, 0, 0, 0.08)'),
      background: '#fff',
      lineHeight: 'normal',
      height: '36px',
      padding: '0 11px',
      marginTop: '10px'
    },
    ratingStatic: {
      cursor: 'pointer',
      '& $star': {
        fontSize: '16px',
        marginRight: '4px',
        pointerEvents: 'none'
      },
      '& span': {
        pointerEvents: 'none'
      }
    },
    star: {
      ...crossBrowserify('transition', 'all 200ms'),
      boxSizing: 'content-box',
      fontSize: '20px',
      color: '#CBD0D8',
      cursor: 'pointer',
      padding: '3px',
      '&:last-child': {
        marginRight: '0'
      }
    },
    starActive: {
      color: '#FFB701'
    }
  })
)

const Rating = props => {
  const {
    classes,
    loading,
    applicant,
    rating,
    onRate,
    canRate,
    ...otherProps
  } = props

  const [openRate, setOpenRate] = useState(false)
  const [hoveredRate, setHoveredRate] = useState(null)
  const [applicantRate, setApplicantRate] = useState(null)

  const container = useRef(null)

  const handleClick = event => {
    event.cancelBubble = true
    const isOutside = !container.current.contains(event.target)
    if (isOutside) {
      setOpenRate(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  useEffect(() => {
    if (applicant && canRate) {
      otherProps.getApplicantRate(applicant)
        .then(({ value }) => {
          setApplicantRate(fp.get('rate', value))
        })
    }
  }, [applicant, rating])

  return (
    <div ref={container} className={classNames(classes.container, {
      [classes.loading]: loading
    })}>
      {(openRate && canRate)
        ? <div className={classes.rating}>
          {fp.map(item => {
            const colored = (applicantRate >= item) || (item <= hoveredRate)
            return (
              <Star
                key={item}
                className={classNames(classes.star, {
                  [classes.starActive]: colored
                })}
                onClick={() => {
                  setOpenRate(false)
                  if (applicantRate === item) return null
                  return onRate({
                    applicant,
                    rate: item
                  })
                }}
                onMouseOver={() => setHoveredRate(item)}
                onMouseLeave={() => setHoveredRate(null)}
              />
            )
          }, ratings)}
        </div>
        : <div className={classNames(classes.rating, classes.ratingStatic)} onClick={() => setOpenRate(true)}>
          <Star className={classNames(classes.star, classes.starActive)}/>
          <span>{rating}/5</span>
        </div>}
    </div>
  )
}

Rating.propTypes = {
  classes: PropTypes.object,
  rating: PropTypes.number,
  loading: PropTypes.bool,
  applicant: PropTypes.number,
  canRate: PropTypes.bool.isRequired,
  onRate: PropTypes.func.isRequired
}

export default withStyles(Rating)
