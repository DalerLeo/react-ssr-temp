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
      path: ROUTE.CATEGORIES,
      action: require('./categories').default
    },
    {
      path: ROUTE.CART,
      load: () => import(/* webpackChunkName: 'cart' */ './cart')
    },
    {
      path: ROUTE.FAVOURITE,
      load: () => import(/* webpackChunkName: 'favourite' */ './favourite')
    },
    {
      path: ROUTE.SIGN_IN,
      load: () => import(/* webpackChunkName: 'sign-in' */ './sign-in')
    },
    {
      path: ROUTE.DELIVERY,
      load: () => import(/* webpackChunkName: 'delivery' */ './delivery')
    },
    {
      path: ROUTE.PROFILE,
      load: () => import(/* webpackChunkName: 'profile' */ './profile')
    },
    {
      path: ROUTE.ADDRESS,
      load: () => import(/* webpackChunkName: 'address' */ './address')
    },
    {
      path: ROUTE.ORDER,
      load: () => import(/* webpackChunkName: 'order' */ './order')
    },
    {
      path: ROUTE.SINGLE_PRODUCT,
      load: () => import(/* webpackChunkName: 'product' */ './product')
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
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found')
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
