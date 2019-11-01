import {
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  GREY_BORDER_STYLE
} from 'constants/styles'
import * as ROUTE from 'constants/routes'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import React from 'react'
import moment from 'moment'
import sprintf from 'sprintf'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import classNames from 'classnames'
import hexToRgb from 'helpers/hexToRgb'
import PhoneSimple from 'react-icons/lib/md/phone'
import Download from 'react-icons/lib/md/file-download'
import T from 'components/T'
import Link from 'components/Link'
import Container from 'components/Container'
import LogoTitle from 'components/Title/LogoTitle'
import UsersOnline from './UsersOnline'

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
      color: hexToRgb(BLACK_COLOR, '0.32'),
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

const getDynamicUrl = (pageData) => {
  return {
    title: fp.get('nameRu', pageData),
    url: sprintf(ROUTE.STATIC_PAGE_ITEM_URL, fp.get('keyName', pageData))
  }
}

const Footer = props => {
  const { classes, isEmployer, isApplicant, staticPagesList } = props

  const pagesList = fp.get('data', staticPagesList)
  const pageForApplicants = fp.find({ keyName: 'specialists' }, pagesList)
  const pageForEmployers = fp.find({ keyName: 'companies' }, pagesList)
  const pageAdvertising = fp.find({ keyName: 'advertizers' }, pagesList)

  const menuItems = [
    {
      title: 'menu_applicant',
      isStatic: true,
      url: '',
      childs: [
        getDynamicUrl(pageForApplicants),
        {
          title: 'menu_create_resume',
          isStatic: true,
          url: ROUTE.RESUME_CREATE_URL,
          condition: isApplicant
        },
        {
          title: 'footer_faq_resume',
          isStatic: true,
          url: {
            pathname: ROUTE.FAQ_URL,
            search: '',
            hash: ''
          }
        }
      ]
    },
    {
      title: 'menu_employer',
      isStatic: true,
      url: '',
      childs: [
        getDynamicUrl(pageForEmployers),
        {
          title: 'menu_create_vacancy',
          isStatic: true,
          url: ROUTE.VACANCY_CREATE_URL,
          condition: isEmployer
        },
        {
          title: 'menu_services',
          isStatic: true,
          url: sprintf(ROUTE.SERVICE_ITEM_URL, 'vacancy'),
          condition: isEmployer
        },
        {
          title: <span className={classes.iconMenu}><Download /> <T>footer_offer</T></span>,
          url: '',
          color: true
        }
      ]
    },
    {
      title: 'footer_useful',
      isStatic: true,
      url: '',
      childs: [
        {
          title: 'menu_company_catalog',
          isStatic: true,
          url: {
            pathname: ROUTE.SEARCH_RESULTS_URL,
            search: 'type=employer&catalogue=true'
          }
        },
        false && {
          title: 'menu_events',
          isStatic: true,
          url: ''
        },
        { title: 'FAQ', url: ROUTE.FAQ_URL },
        getDynamicUrl(pageAdvertising)
      ]
    },
    {
      title: 'footer_contact',
      isStatic: true,
      url: '',
      childs: [
        { title: 'contact_form_title', url: ROUTE.CONTACT_URL, isStatic: true },
        { title: <span className={classes.iconMenu}><PhoneSimple />+998 71 123-45-67</span> },
        { title: 'myjob@info.uz' }
      ]
    }
  ]

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.navigation}>
          <div className={classes.menu}>
            <LogoTitle simple={true} />
          </div>
          {loMap(menuItems, (item, index) => {
            const title = fp.get('title', item)
            const isStatic = fp.get('isStatic', item)
            const childs = fp.get('childs', item)
            return (
              <div key={index} className={classes.menu}>
                <div className={classes.menuTitle}>{isStatic ? <T>{title}</T> : title}</div>
                <ul className={classes.childMenus}>
                  {loMap(childs, (child, key) => {
                    const childTitle = fp.get('title', child)
                    const childIsStatic = fp.get('isStatic', child)
                    const childUrl = fp.get('url', child)
                    const condition = fp.get('condition', child)
                    const color = fp.get('color', child)
                    if (condition === false) return null
                    if (childUrl) {
                      return (
                        <Link
                          to={childUrl}
                          key={key}
                          className={classNames({
                            [classes.childMenu]: true,
                            [classes.color]: color
                          })}
                        >
                          {childIsStatic ? <T>{childTitle}</T> : childTitle}
                        </Link>
                      )
                    }
                    return (
                      <span
                        key={key}
                        className={classNames({
                          [classes.childMenu]: true,
                          [classes.color]: color
                        })}
                      >
                        {childIsStatic ? <T>{childTitle}</T> : childTitle}
                      </span>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        <div className={classes.copyrightWrap}>
          <div className={classes.copyright}>© {moment().format('YYYY')} Myjob.uz. <T>footer_copyright</T></div>
          <div className={classes.copyDesc}><T>footer_copyright_desc</T></div>
          <UsersOnline />
        </div>
      </Container>
    </div>
  )
}

Footer.propTypes = {
  classes: PropTypes.object,
  isAuth: PropTypes.bool,
  isEmployer: PropTypes.bool,
  isApplicant: PropTypes.bool,
  staticPagesList: PropTypes.object
}

export default enhance(Footer)
