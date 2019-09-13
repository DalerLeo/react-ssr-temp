import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import hexToRgb from 'helpers/hexToRgb'
import { crossBrowserify } from 'constants/styles'

const enhance = compose(
  injectSheet({
    wrapper: {
    },
    button: {
      background: hexToRgb('#dfdfdf', '0.7'),
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      color: hexToRgb('#242424', '0.73'),
      display: 'inline-block',
      fontSize: '12px',
      lineHeight: '30px',
      padding: '0 20px',
      ...crossBrowserify('transition', 'all 300ms'),
      '&:hover': {
        background: hexToRgb('#dfdfdf', '0.9')
      }
    }
  })
)

const MoreButtonLarge = ({ ...props }) => {
  const { classes, text, onClick, alignRight, style } = props
  return (
    <div className={classes.wrapper} style={{ textAlign: alignRight ? 'right' : 'left' }}>
      <button
        style={style}
        type={'button'}
        className={classNames(classes.button)}
        onClick={onClick}
        {...props}>
        {text}
      </button>
    </div>
  )
}

MoreButtonLarge.propTypes = {
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default enhance(MoreButtonLarge)
