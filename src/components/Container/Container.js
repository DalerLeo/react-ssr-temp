import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const enhance = compose(
  injectSheet({
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 30px'
    }
  })
)

const Container = ({ className, classes, children }) => {
  return (
    <div className={classNames(classes.container, className)}>
      {children}
    </div>
  )
}

Container.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.node.isRequired
}
export default enhance(Container)
