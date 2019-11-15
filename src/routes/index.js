import * as ROUTE from 'constants/routes'
import * as actionTypes from 'constants/actionTypes'

const setLoader = (loading) => ({
  type: actionTypes.ASYNC_LOADING,
  data: '',
  loading: loading
})
const routes = {
  path: '',
  children: [
    {
      path: '',
      action: require('./home').default
    },
    {
      path: ROUTE.CART,
      children: [
        {
          path: '',
          load: () => import('./cart')
        }
      ]
    },
    {
      path: ROUTE.SIGN_IN,
      children: [
        {
          path: '',
          load: () => import('./sign-in')
        }
      ]
    },
    {
      path: ROUTE.DELIVERY,
      children: [
        {
          path: '',
          load: () => import('./delivery')
        }
      ]
    },
    {
      path: ROUTE.PROFILE,
      children: [
        {
          path: '',
          load: () => import('./profile')
        }
      ]
    },
    {
      path: ROUTE.ADDRESS,
      children: [
        {
          path: '',
          load: () => import('./address')
        }
      ]
    },
    {
      path: ROUTE.CATEGORIES,
      children: [
        {
          path: '',
          load: () => import('./categories')
        }
      ]
    },
    {
      path: ROUTE.STATIC_PAGE_URL,
      children: [
        {
          path: '/:child',
          load: () => import('./static-page')
        }
      ]
    },
    {
      path: '(.*)',
      load: () => import('./not-found')
    }
  ],

  async action ({ next, ...props }) {
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
