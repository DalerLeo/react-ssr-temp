import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { BLACK_COLOR, PRIMARY_COLOR } from '../../constants/styles'
import hexToRgb from '../../helpers/hexToRgb'
import classNames from 'classnames'

const enhance = compose(
  injectSheet({
    title: {
      color: hexToRgb(BLACK_COLOR, '0.75'),
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: '36px',
      margin: '0',
      padding: '0 25px',
      position: 'relative',
      '&:after': {
        content: '""',
        background: PRIMARY_COLOR,
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        width: '4px'
      }
    }
  })
)

const PageTitle = ({ className, classes, text, ...defaultProps }) => {
  return (
    <h2 className={classNames(classes.title, className)} {...defaultProps}>{text}</h2>
  )
}

PageTitle.propTypes = {
  text: PropTypes.node.isRequired
}

export default enhance(PageTitle)
