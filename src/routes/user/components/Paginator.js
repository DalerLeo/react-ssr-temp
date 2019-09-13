import injectSheet from 'react-jss'
import propTypes from 'prop-types'
import styles from './styles'
import React from 'react'
import classNames from 'classnames'

const Paginator = injectSheet(styles)(({ classes, className }) => {
  return (
    <div className={classNames(classes.paginator, className)}>
      <div>Вы просмотрели 5 из 10</div>
      <div className={classes.progress}>
        <div/>
      </div>
    </div>
  )
})

Paginator.propTypes = {
  className: propTypes.string
}
export default Paginator
