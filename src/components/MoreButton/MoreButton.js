import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  BLACK_COLOR,
  ANCHOR_DISABLED
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import Link from 'components/Link'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    wrapper: {
      ...ANCHOR_DISABLED,
      display: 'block',
      textAlign: 'right',
      marginTop: '30px'
    },
    button: {
      background: hexToRgb('#ececec', '0.5'),
      border: 'none',
      borderRadius: '4px',
      outline: 'none',
      cursor: 'pointer',
      color: hexToRgb(BLACK_COLOR, '0.73'),
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: '600',
      padding: '0',
      lineHeight: '45px',
      width: '100%',
      ...crossBrowserify('display', 'block'),
      ...crossBrowserify('transition', 'all 300ms'),
      '&:hover': {
        background: hexToRgb('#ececec', '0.7')
      }
    }
  })
)

const MoreButton = ({ ...props }) => {
  const { className, classes, text, onClick, style, link } = props
  return (
    <Link to={link} style={style} className={classes.wrapper}>
      <button
        type={'button'}
        className={classNames(classes.button, className)}
        onClick={onClick}
        {...props}>
        <T>{text}</T>
      </button>
    </Link>
  )
}

MoreButton.propTypes = {
  classes: PropTypes.object,
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
  link: PropTypes.any,
  style: PropTypes.object,
  onClick: PropTypes.func
}

export default enhance(MoreButton)
