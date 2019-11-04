import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  GREY_BORDER_STYLE
} from 'constants/styles'
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import Container from 'components/Container'

const enhance = compose(
  injectSheet({
    wrapper: {
      background: '#f9fafb',
      color: '#3a3a3a',
      padding: '56px 0 32px'
    },
    navigation: {
      margin: '0 -25px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'center')
    },
    menu: {
      width: '20%',
      padding: '0 25px',
      textAlign: 'left'
    },
    menuTitle: {
      fontSize: '15px',
      fontWeight: '500',
      marginBottom: '22px'
    },
    childMenus: {
      listStyle: 'none',
      margin: '0',
      padding: '0'
    },
    childMenu: {
      display: 'list-item',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: '14px',
      marginBottom: '15px',
      '&:hover': {
        color: 'inherit'
      },
      '&:focus': {
        color: 'inherit'
      }
    },

    socials: {
      marginTop: '70px'
    },
    socialTitle: {
      fontSize: '14px',
      color: '#4d4d4d',
      lineHeight: '28px',
      marginBottom: '24px'
    },
    socialIcons: {

    },
    icon: {
      ...fallbacksStyle('display', 'inline-flex'),
      border: '2px #373737 solid',
      height: '20px',
      margin: '0 28px',
      position: 'relative',
      width: '13px',
      '&:last-child:after': {
        display: 'none'
      },
      '&:after': {
        background: '#676767',
        content: '""',
        position: 'absolute',
        right: '-28px',
        top: '0',
        bottom: '0',
        width: '1px'
      }
    },

    logo: {
      fontSize: '60px',
      margin: '40px 0 20px'
    },
    copyrightWrap: {
      borderTop: GREY_BORDER_STYLE,
      paddingTop: '25px',
      marginTop: '50px',
      position: 'relative'
    },
    copyright: {
      marginBottom: '6px'
    },
    copyDesc: {
      fontSize: '13px',
      paddingRight: '350px'
    },
    color: {
      fontWeight: '500',
      color: MAIN_COLOR,
      '&:hover': {
        color: MAIN_COLOR
      }
    },
    iconMenu: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'baseline'),
      '& svg': {
        color: MAIN_COLOR,
        fontSize: '16px',
        marginRight: '5px',
        minWidth: '16px',
        position: 'relative',
        top: '2px'
      }
    },

    // MEDIA QUERIES
    '@media (max-width: 1024px)': {

    }
  })
)

const Footer = props => {
  const { classes } = props

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.navigation}>
          <div className={classes.menu} />
        </div>
        <div className={classes.copyrightWrap}>
          <div className={classes.copyright}>© {moment().format('YYYY')} Myjob.uz.footer_copyright</div>
        </div>
      </Container>
    </div>
  )
}

Footer.propTypes = {
  classes: PropTypes.object
}

export default enhance(Footer)
