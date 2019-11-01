import { MAIN_COLOR } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import injectSHeet from 'react-jss'

const withStyles = injectSHeet({
  content: {
    lineHeight: ({ lineHeight }) => `${lineHeight}px`,
    '& ul': {
      listStyle: 'none',
      padding: '0',
      paddingLeft: '18px !important',
      '& li:before': {
        borderRadius: '50%',
        content: '"\\2022"',
        color: MAIN_COLOR,
        fontWeight: 'bold',
        display: 'inline-block',
        marginLeft: '-14px',
        paddingRight: '7px',
        position: 'absolute'
      },
      '& br': {
        display: 'none'
      }
    },
    '& ol': {
      padding: '0',
      paddingLeft: '18px !important'
    },
    '& ul, & ol': {
      '&:last-child': { margin: '0' }
    },
    '& li': {
      fontSize: '15px',
      '& span': {
        fontSize: 'inherit !important',
        fontFamily: 'inherit !important'
      },
      '&:last-child': {
        marginBottom: '0'
      }
    },
    '& p': {
      margin: '0'
    },
    '& img': {
      maxWidth: '100%'
    }
  }
})

const HtmlContent = ({ children, classes }) => {
  return (
    <div
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

HtmlContent.propTypes = {
  classes: PropTypes.object,
  lineHeight: PropTypes.any,
  children: PropTypes.any
}

HtmlContent.defaultProps = {
  lineHeight: 22
}

export default withStyles(HtmlContent)
