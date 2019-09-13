import React from 'react'
import PropTypes from 'prop-types'
import loIsEmpty from 'lodash/isEmpty'
import injectSheet from 'react-jss'
import { LIGHT_GREY_BORDER_STYLE } from 'constants/styles'
import { hexToRgb } from 'helpers'

const withStyles = injectSheet({
  emptyState: {
    borderRadius: '4px',
    border: LIGHT_GREY_BORDER_STYLE,
    color: hexToRgb('#000', '0.7'),
    padding: '60px 100px',
    textAlign: 'center'
  }
})

const EmptyState = props => {
  const { classes, data, loading, text, children } = props
  return loIsEmpty(data) && !loading ? (
    <div className={classes.emptyState}>
      {children || text}
    </div>
  ) : null
}

EmptyState.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  data: PropTypes.any,
  loading: PropTypes.any,
  text: PropTypes.string
}

EmptyState.defaultProps = {
  text: 'Нет данных'
}

export default withStyles(EmptyState)
