/* eslint-disable global-require */
/* eslint-disable capitalized-comments */
/* eslint-disable no-inline-comments */
/* eslint-disable no-undef */
import * as ROUTE from 'constants/routes'
import * as actionTypes from 'constants/actionTypes'

const setLoader = (loading) => ({
  type: actionTypes.ASYNC_LOADING,
  data: '',
  loading: loading
})
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      action: require('./home').default
    },
    {
      path: ROUTE.SEARCH_URL,
      load: () => import(/* webpackChunkName: 'search' */ './search')
    },
    {
      path: ROUTE.SEARCH_RESULTS_URL,
      action: require('./results').default
    },
    {
      path: ROUTE.USER_SETTING_URL,
      load: () => import(/* webpackChunkName: 'setting' */ './setting')
    },
    {
      path: ROUTE.USER_STAFF_CREATE_URL,
      load: () => import(/* webpackChunkName: 'employer-staff-create' */ './employer-staff-create')
    },
    {
      path: ROUTE.SERVICES_URL,
      children: [
        {
          path: '/:child',
          load: () => import(/* webpackChunkName: 'services' */ './services')
        }
      ]
    },
    {
      path: ROUTE.VACANCY_URL,
      children: [
        {
          path: ROUTE.CREATE_URL,
          load: () => import(/* webpackChunkName: 'vacancy-create' */ './vacancy-create')
        },
        {
          path: ROUTE.VIEW_URL,
          load: () => import(/* webpackChunkName: 'vacancy-create' */ './vacancy-create')
        },
        {
          path: ROUTE.DETAIL_URL,
          load: () => import(/* webpackChunkName: 'vacancy-details' */ './vacancy-details')
        }
      ]
    },
    {
      path: ROUTE.RESUME_URL,
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'resume' */ './resume')
        },
        {
          path: ROUTE.CREATE_URL,
          load: () => import(/* webpackChunkName: 'resume-create' */ './resume-create')
        },
        {
          path: ROUTE.VIEW_URL,
          load: () => import(/* webpackChunkName: 'resume-create' */ './resume-create')
        },
        {
          path: ROUTE.DETAIL_URL,
          load: () => import(/* webpackChunkName: 'resume-details' */ './resume-details')
        }
      ]
    },
    {
      path: ROUTE.APPLICANT_URL,
      children: [
        {
          path: '/:child',
          children: [
            {
              path: '',
              load: () => import(/* webpackChunkName: 'user' */ './user')
            },
            // Resume details for Edit & View
            {
              path: '/:id/:actionName',
              load: () => import(/* webpackChunkName: 'resume-create' */ './resume-create')
            }
          ]

        }
      ]
    },
    {
      path: ROUTE.EMPLOYER_URL,
      children: [
        {
          path: '/:child',
          children: [
            {
              path: '',
              load: () => import(/* webpackChunkName: 'user' */ './user')
            },
            // VACANCY details for Edit & View
            {
              path: '/:id/:actionName',
              load: () => import(/* webpackChunkName: 'resume-create' */ './vacancy-create')
            }
          ]
        }
      ]
    },
    {
      path: ROUTE.ARTICLES_URL,
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'articles' */ './articles')
        },
        {
          path: '/:id',
          load: () => import(/* webpackChunkName: 'article-details' */ './article-details')
        }

      ]
    },
    {
      path: ROUTE.COMPANIES_URL,
      children: [
        {
          path: '',
          action: require('./companies').default
        },
        {
          path: '/:id',
          action: require('./company-details').default
        }
      ]
    },
    {
      path: ROUTE.EVENTS_URL,
      children: [
        {
          path: '',
          action: require('./events').default
        },
        {
          path: '/:id',
          action: require('./event-details').default
        }
      ]
    },
    {
      path: ROUTE.FAQ_URL,
      action: require('./faq').default
    },
    {
      path: ROUTE.SUBSCRIPTION_URL,
      action: require('./subscription').default
    },
    {
      path: ROUTE.STATIC_PAGE_URL,
      children: [
        {
          path: '/:child',
          load: () => import(/* webpackChunkName: 'static-page' */ './static-page')
        }
      ]
    },
    {
      path: ROUTE.CONTACT_URL,
      load: () => import(/* webpackChunkName: 'contact-us' */ './contact-us')
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found')
    }
  ],

  async action ({ next, ...props }) {
    // SET ASYNC_LOADER TRUE
    props.store.dispatch(setLoader(true))

    // Execute each child route until one of them return the result
    const route = await next()

    // SET ASYNC_LOADER FALSE
    props.store.dispatch(setLoader(false))

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - MyJob.uz`
    route.description = route.description || ''

    return route
  }
}

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default
  })
}

export default routes
