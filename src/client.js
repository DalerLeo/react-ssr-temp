import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import App from './components/App';
import History from './HistoryProvider';
import history, { createPath } from './history';
import { Provider } from 'react-redux';
import { updateMeta } from './DOMUtils';
import router from './router';
import * as Rx from 'rxjs';
import { setObservableConfig } from 'recompose';
import smoothScrollTo from 'utils/smoothScrollTo';
import createStore from './store/createStore';
import { startListener } from 'redux-first-routing';
import { getCartItems } from 'utils/storage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {getCookie} from 'utils/cookie'

const initialState = {
  ...window.initialState,
  cart: { data: getCartItems() },
};
console.warn(initialState)
// Set Initial value for STORE
const store = createStore(history, initialState, true);

// Listen changes in route
startListener(history, store);

setObservableConfig({
  // Converts a plain ES observable to an RxJS 5 observable
  fromESObservable: Rx.Observable.from,
});
// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html

// Enables critical path CSS rendering
// https://github.com/kriasoft/isomorphic-style-loader
const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss());
  return () => {
    removeCss.forEach(f => f());
  };
};
const token = getCookie('token', document.cookie)

/*token && store.dispatch({
  payload: Promise.resolve({token}),
  type: actionTypes.LOGIN
})*/
const context = {
  isServer: false,
  isAuth: false,
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

// Re-render the app when window.location changes
async function onLocationChange(location, action, onHotUpdate) {
  // GET USER DATA
  //  token && await store.dispatch(userInfoFetch(token))

  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);
    context.store = store;

    // Traverses the list of routes in the order they are defined until
    // It finds the first route that matches provided URL path string
    // And whose action method returns anything other than `undefined`.
    const route = await router.resolve(context);

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }
    const lang = store.getState().lang.data;
    const appRender = (
      <Provider store={store}>
        <History.Provider value={history}>
          <App insertCss={insertCss} lang={lang} context={context}>
            {route.component}
          </App>
        </History.Provider>
      </Provider>
    );
    // remove server side rendered styles
    if (isInitialRender) {
      if (!onHotUpdate) container.innerHTML = '';
    }
    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(appRender, container, () => {
      if (isInitialRender) {
        // Switch off the native scroll restoration behavior and handle it manually
        // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
        if (window.history && 'scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }

        const elem = document.getElementById('css');
        if (elem) elem.parentNode.removeChild(elem);

        return;
      }

      document.title = route.title;

      updateMeta('description', route.description);
      // Update necessary tags in <head> at runtime here, ie:
      // UpdateMeta('keywords', route.keywords);
      // UpdateCustomMeta('og:url', route.canonicalUrl);
      // UpdateCustomMeta('og:image', route.imageUrl);
      // UpdateLink('canonical', route.canonicalUrl);
      // Etc.

      let scrollX = 0;
      let scrollY = 0;
      const pos = scrollPositionsHistory[location.key];
      if (pos) {
        scrollX = pos.scrollX;
        scrollY = pos.scrollY;
      } else if (action === 'REPLACE') {
        scrollX = window.pageXOffset;
        scrollY = window.pageYOffset;
      } else {
        const targetHash = location.hash.substr(1);
        if (targetHash) {
          const target = document.getElementById(targetHash);
          if (target) {
            scrollY = window.pageYOffset + target.getBoundingClientRect().top;
          }
        }
      }

      // Restore the scroll position if it was saved into the state
      // Or scroll to the given #hash anchor
      // Or scroll to top of the page

      // CHECK IF SCROLL SMOOTH NEEDED
      if (location.state && location.state.smooth) {
        smoothScrollTo(0, 0, 800);
      } else {
        window.scrollTo(scrollX, scrollY);
      }

      // Google Analytics tracking. Don't send 'pageview' event after
      // The initial rendering, as it was already sent
      if (window.ga) {
        window.ga('send', 'pageview', createPath(location));
      }
    });
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('RSK will reload your page after error');
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    try {
      if (appInstance && appInstance.updater.isMounted(appInstance)) {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance);
      }
      onLocationChange(currentLocation, false, true);
    } catch (error) {
      console.error('Client.js:170 ', error);
    }
  });
}
