import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { BLACK_COLOR, fallbacksStyle, MAIN_BORDER, MAIN_COLOR } from 'constants/styles'
import classNames from 'classnames'
import loMap from 'lodash/map'
import hexToRgb from 'helpers/hexToRgb'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    title: {
      ...fallbacksStyle('display', 'inline-block'),
      transition: 'all 300ms',
      cursor: 'pointer',
      fontWeight: '600',
      margin: '0',
      marginRight: '22px',
      lineHeight: '1.91',
      position: 'relative',
      fontSize: '22px',
      borderBottom: '2px solid transparent',
      color: hexToRgb(BLACK_COLOR, '0.2')
    },
    small: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '1.57',
      color: hexToRgb(BLACK_COLOR, '0.5')
    },
    medium: {
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: '2.0'
    },
    active: {
      borderBottom: MAIN_BORDER,
      borderBottomWidth: '2px',
      color: BLACK_COLOR
    },
    badge: {
      color: MAIN_COLOR,
      fontSize: '13px',
      fontWeight: '600',
      marginLeft: '3px'
    }
  })
)

const TitleTab = props => {
  const { className, classes, value, type, tabs, onChange, ...defaultProps } = props
  const small = type === 'small'
  const medium = type === 'medium'

  return loMap(tabs, (title, index) => {
    const badge = fp.get('badge', title)
    const isTranslated = fp.get('isTranslated', title)
    return (
      <span
        key={index}
        onClick={() => onChange(title.value)}
        className={classNames({
          [classes.title]: true,
          [className]: true,
          [classes.small]: small,
          [classes.medium]: medium,
          [classes.active]: value === title.value
        })}
        {...defaultProps}>
        {isTranslated ? title.label : <T>{title.label}</T>}
        {Boolean(badge) && <span className={classes.badge}>+{badge}</span>}
      </span>
    )
  })
}

TitleTab.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  tabs: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

export default enhance(TitleTab)
