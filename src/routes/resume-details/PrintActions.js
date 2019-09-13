import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  fallbacksStyle,
  crossBrowserify,
  MAIN_COLOR
} from 'constants/styles'
import Download from 'react-icons/lib/md/file-download'
import Print from 'react-icons/lib/md/print'
import T from 'components/T'

const withStyles = injectSheet({
  printWrap: {
    padding: '25px'
  },
  iconWrap: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    cursor: 'pointer',
    fontWeight: '500',
    lineHeight: '22px',
    '& > svg': {
      marginRight: '5px'
    },
    '&:not(:last-child)': {
      marginBottom: '7px'
    }
  },
  download: {
    color: MAIN_COLOR
  },
  print: {
    color: '#A1A7B3'
  },
  descr: {
    color: '#9A9A9A',
    fontSize: '13px',
    lineHeight: '20px'
  }
})

const PrintActions = props => {
  const { classes } = props

  return (
    <div className={classes.printWrap}>
      <div>
        <div className={classNames(classes.iconWrap, classes.download)}>
          <Download/> <T>button_resume_download</T> (doc)
        </div>
        <div className={classNames(classes.iconWrap, classes.download)}>
          <Download/> <T>button_resume_download</T> (pdf)
        </div>
        <div className={classNames(classes.iconWrap, classes.print)}>
          <Print/> <T>button_resume_print</T>
        </div>
      </div>
    </div>
  )
}

PrintActions.propTypes = {
  classes: PropTypes.object
}

export default withStyles(PrintActions)
