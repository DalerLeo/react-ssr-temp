import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { MAIN_COLOR } from 'constants/styles'
import T from 'components/T'

const style = {
  title: {
    marginBottom: '7px',
    lineHeight: '22зч',
    fontSize: '15px',
    fontWeight: '500'
  },
  wrapper: {
    marginBottom: '25px',
    '& ul': {
      listStyle: 'none',
      padding: '0',
      paddingLeft: '18px'
    },
    '& li': {
      lineHeight: '1.67',
      fontSize: '15px',
      marginBottom: '14px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    '& li:before': {
      content: '"\\2022"',
      color: MAIN_COLOR,
      fontWeight: 'bold',
      display: 'inline-block',
      marginLeft: '-14px',
      paddingRight: '7px',
      borderRadius: '50%'
    }
  }
}
const SectionList = props => {
  const { classes, title, children } = props
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}><T>{title}</T></div>
      {children}
    </div>
  )
}

SectionList.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.node
}

export default injectSheet(style)(SectionList)
