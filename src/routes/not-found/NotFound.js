import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { MAIN_COLOR } from 'constants/styles'
import My404 from 'icons/404'
import Link from 'components/Link'
import T from 'components/T'

const withStyles = injectSheet({
  wrapper: {
    padding: '200px 0',
    textAlign: 'center'
  },
  errorCode: {
    color: '#5A308D',
    fontSize: '100px',
    fontWeight: 'bold',
    '& span': {
      marginLeft: '10px'
    }
  },
  errorText: {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '10px'
  },
  goHome: {
    color: MAIN_COLOR,
    fontWeight: '500',
    '&:hover': {
      color: '#5A308D'
    }
  }
})

const NotFound = props => {
  const { classes } = props

  return (
    <div className={classes.wrapper}>
      <div className={classes.errorCode}>
        <My404/><span>404</span>
      </div>
      <div className={classes.errorText}><T>page_not_found_text</T></div>
      <Link to={'/'} className={classes.goHome}><T>page_not_found_go_home</T></Link>
    </div>
  )
}

NotFound.propTypes = {
  classes: PropTypes.object
}

export default withStyles(NotFound)
