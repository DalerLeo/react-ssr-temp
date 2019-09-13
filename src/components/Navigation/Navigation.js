import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import sprintf from 'sprintf'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import * as ROUTES from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import queryToParams from 'helpers/queryToParams'
import Link from 'components/Link'
import T from 'components/T'

/* eslint-disable standard/computed-property-even-spacing */

const withStyles = injectSheet({
  addButtons: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },
  button: {
    ...crossBrowserify('transition', 'all 300ms'),
    color: MAIN_COLOR,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: '500',
    lineHeight: '38px',
    marginLeft: '43px',
    '&:hover': {
      color: hexToRgb(MAIN_COLOR, '0.8')
    }
  },
  menu: {
    ...fallbacksStyle('display', 'flex'),
    listStyle: 'none',
    height: '63px',
    margin: '0',
    padding: '0',
    zIndex: '2'
  },
  dropWrap: {
    background: '#eef1f6',
    borderBottom: '3px solid transparent',
    marginRight: '35px',
    position: 'relative',
    '&:hover': {
      borderColor: MAIN_COLOR,
      '& > $menus': {
        opacity: '1',
        visibility: 'visible'
      }
    },
    '& span': {
      cursor: 'pointer',
      fontSize: '15px',
      lineHeight: '63px',
      whiteSpace: 'nowrap'
    }
  },
  link: {
    ...crossBrowserify('transition', 'all 300ms'),
    color: '#000 !important',
    cursor: 'pointer',
    position: 'relative',
    lineHeight: '63px',
    whiteSpace: 'nowrap',
    marginRight: '36px',
    borderBottom: '3px solid transparent',
    '&:hover': {
      borderColor: MAIN_COLOR
    }
  },
  activeLink: {
    borderColor: MAIN_COLOR
  },
  menus: {
    ...crossBrowserify('transition', 'all 300ms'),
    background: 'inherit',
    fontSize: '15px',
    lineHeight: 'normal',
    top: 'calc(100% + 3px)',
    left: '0',
    opacity: '0',
    padding: '22px 24px 7px',
    position: 'absolute',
    visibility: 'hidden',
    whiteSpace: 'nowrap',
    '& > a': {
      ...crossBrowserify('transition', 'color 300ms'),
      color: '#000',
      cursor: 'pointer',
      display: 'block',
      marginBottom: '15px',
      '&:hover': {
        color: MAIN_COLOR
      }
    }
  }
})

const companiesCatalogue = `${ROUTES.SEARCH_RESULTS_URL}?catalogue=true&type=employer`
const employerMenu = {
  drop: [
    {
      title: 'menu_my_office',
      rootUrl: ROUTES.EMPLOYER_URL,
      url: sprintf(ROUTES.EMPLOYER_ITEM_URL, 'stats')
    },
    {
      title: 'main_vacancy',
      url: '',
      items: [
        {
          title: 'menu_create_vacancy',
          url: ROUTES.VACANCY_CREATE_URL
        },
        {
          title: 'menu_my_vacancy',
          url: sprintf(ROUTES.EMPLOYER_ITEM_URL, 'vacancy')
        }
      ]
    },
    {
      title: 'main_resume',
      items: [
        {
          title: 'menu_favorites_resume',
          url: sprintf(ROUTES.EMPLOYER_ITEM_URL, 'fav')
        },
        {
          title: 'menu_my_search',
          url: sprintf(ROUTES.EMPLOYER_ITEM_URL, 'history')
        }
      ]
    },
    {
      title: 'menu_services',
      rootUrl: ROUTES.SERVICES_URL,
      url: sprintf(ROUTES.SERVICE_ITEM_URL, 'vacancy')
    },
    {
      title: 'menu_company_catalog',
      url: companiesCatalogue
    }
  ],
  links: [
    {
      title: 'menu_create_vacancy',
      url: ROUTES.VACANCY_CREATE_URL
    }
  ]
}

const applicantMenu = {
  drop: [
    {
      title: 'menu_my_office',
      url: sprintf(ROUTES.APPLICANT_ITEM_URL, 'resume')
    },
    {
      title: 'main_resume',
      url: '',
      items: [
        {
          title: 'menu_my_resume',
          url: sprintf(ROUTES.APPLICANT_ITEM_URL, 'resume')
        },
        {
          title: 'menu_create_resume',
          url: ROUTES.RESUME_CREATE_URL
        }
      ]
    },
    {
      title: 'main_vacancy',
      items: [
        {
          title: 'menu_favorites_vacancy',
          url: sprintf(ROUTES.APPLICANT_ITEM_URL, 'fav')
        },
        {
          title: 'menu_my_search',
          url: sprintf(ROUTES.APPLICANT_ITEM_URL, 'history')
        }
      ]
    },
    {
      title: 'menu_company_catalog',
      url: companiesCatalogue
    }
  ],
  links: [
    {
      title: 'menu_create_resume',
      url: ROUTES.RESUME_CREATE_URL
    }
  ]
}

const Navigation = props => {
  const { classes, history, setRegOpen } = props

  const onOpenRegDialog = kind => {
    history.replace({
      pathname: history.location.pathname,
      search: history.location.search,
      state: { regTab: kind }
    })
    setRegOpen(true)
  }

  const unauthorizedMenu = {
    drop: [
      {
        title: 'menu_applicant',
        url: '',
        items: [
          {
            title: 'menu_create_resume',
            url: ROUTES.RESUME_CREATE_URL,
            func: () => onOpenRegDialog('applicant')
          },
          {
            title: 'menu_vacancy_catalog',
            url: `${ROUTES.SEARCH_RESULTS_URL}?type=vacancy`
          }
        ]
      },
      {
        title: 'menu_employer',
        items: [
          {
            title: 'menu_create_vacancy',
            url: ROUTES.VACANCY_CREATE_URL,
            func: () => onOpenRegDialog('employer')
          },
          {
            title: 'menu_resume_catalog',
            url: `${ROUTES.SEARCH_RESULTS_URL}?type=resume`
          }
        ]
      },
      {
        title: 'menu_company_catalog',
        url: companiesCatalogue
      }
    ],
    links: [
      {
        title: 'menu_create_resume',
        url: '',
        func: () => onOpenRegDialog('applicant')
      },
      {
        title: 'menu_create_vacancy',
        url: '',
        func: () => onOpenRegDialog('employer')
      }
    ]
  }

  const isNonAuth = _.isEmpty(_.get(props, 'userData'))
  const isEmployer = Boolean(_.get(props, 'userData.username'))

  const query = queryToParams(props.pathname.query)
  const pathname = props.pathname.pathname + query

  const data = isNonAuth ? unauthorizedMenu : isEmployer ? employerMenu : applicantMenu
  const getMenu = (values) => (
    <React.Fragment>
      <ul className={classes.menu}>
        {_.map(values.drop, (item, index) => {
          const title = _.get(item, 'title')
          const rootUrl = _.get(item, 'rootUrl')
          const url = _.get(item, 'url')
          const isActive = _.startsWith(pathname, rootUrl) || _.startsWith(pathname, url)
          return (
            <React.Fragment key={index}>
              {item.items
                ? <div className={classes.dropWrap}>
                  <span><T>{title}</T></span>
                  <div className={classes.menus}>
                    {_.map(item.items, child => {
                      return (
                        <Link
                          onClick={child.func}
                          key={child.title}
                          to={child.func ? '#' : child.url}>
                          <T>{child.title}</T>
                        </Link>
                      )
                    })}
                  </div>
                </div>
                : <Link
                  className={classNames(classes.link, {
                    [classes.activeLink]: isActive
                  })}
                  to={url}>
                  <T>{item.title}</T>
                </Link>}
            </React.Fragment>
          )
        })}
      </ul>
      <div className={classes.addButtons}>
        {_.map(values.links, link => (
          <Link
            onClick={link.func}
            key={link.title}
            to={link.url}
            className={classes.button}>
            <T>{link.title}</T>
          </Link>
        ))}
      </div>
    </React.Fragment>
  )

  return (
    <nav className={'navigation'}>
      {getMenu(data)}
    </nav>
  )
}
Navigation.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  setRegOpen: PropTypes.func.isRequired,
  pathname: PropTypes.object.isRequired
}
export default withStyles(Navigation)
