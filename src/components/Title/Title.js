import { BLACK_COLOR } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    title: {
      color: BLACK_COLOR,
      fontSize: '22px',
      fontWeight: '600',
      lineHeight: 'normal',
      marginBottom: '24px',
      margin: '0',
      position: 'relative'
    },
    isProfile: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '16px'
    },
    small: {
      fontSize: '16px',
      fontWeight: 'normal'
    },
    medium: {
      fontSize: '20px',
      fontWeight: '500'
    }
  })
)

const Title = props => {
  const {
    className,
    classes,
    margin,
    text,
    small,
    isProfile,
    fontSize,
    medium,
    isStatic,
    ...defaultProps
  } = props
  return (
    <h2
      className={classNames(className, {
        [classes.title]: true,
        [classes.small]: small,
        [classes.medium]: medium,
        [classes.isProfile]: isProfile
      })} {...defaultProps} style={{ fontSize, margin }}
    >
      {isStatic ? <T>{text}</T> : text}
    </h2>
  )
}

Title.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  text: PropTypes.node,
  isStatic: PropTypes.bool,
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isProfile: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool

}

export default enhance(Title)
