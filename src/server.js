import fp from 'lodash/fp'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/server'
import PrettyError from 'pretty-error'
import {JssProvider, SheetsRegistry} from 'react-jss'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import App from 'components/App'
import Html from 'components/Html'
import {ErrorPageWithoutStyle} from 'routes/error/ErrorPage'
import errorPageStyle from 'routes/error/ErrorPage.css'
import router from 'router'
import chunks from './chunk-manifest.json'
import config from 'config'
import * as Rx from 'rxjs'
import {setObservableConfig} from 'recompose'
import createStore from './store/createStore'
import queryToParams from './helpers/queryToParams'
import generateClassName from 'helpers/generateClassName'
import createHistory from 'history/createMemoryHistory'
import {startListener} from 'redux-first-routing'
import History from './HistoryProvider'
import { ServerStyleSheet } from 'styled-components'

const SUCCESS = 200

setObservableConfig({
  // Converts a plain ES observable to an RxJS 5 observable
  fromESObservable: Rx.Observable.from
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
  // Send entire app down. Process manager will restart it
  process.exit(1)
})

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// User agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

const app = express()

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy)

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  const styledSheet = new ServerStyleSheet()
  try {
    const initialEntries = [req.path + queryToParams(req.query)]
    const history = createHistory({initialEntries})
    const store = createStore(history, {}, false)
    startListener(history, store)

    const css = new Set()

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()))
    }
    const dispatch = store.dispatch

    // Get TOKEN / LANGUAGE from header
    const lang = req.cookies.lang || 'ru'

    lang && dispatch({
      payload: lang,
      type: `${actionTypes.LANGUAGE}_FULFILLED`
    })

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      store,
      isServer: true,
      isAuth,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query
    }

    const route = await router.resolve(context)
    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return
    }

    const sheets = new SheetsRegistry()
    const data = {...route}

    data.children = ReactDOM.renderToString(
      styledSheet.collectStyles(
      <Provider store={store}>
        <History.Provider value={history}>
          <JssProvider registry={sheets} generateClassName={generateClassName} >
            <App context={context}>{route.component}</App>
          </JssProvider>
        </History.Provider>
      </Provider>
      )
    )
    data.styles = [{id: 'css', cssText: [...css].join('')}]

    const scripts = new Set()
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset))
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`)
      }
    }
    addChunk('client')
    if (route.chunk) addChunk(route.chunk)
    if (route.chunks) route.chunks.forEach(addChunk)

    data.scripts = Array.from(scripts)
    data.app = {
      apiUrl: config.api.clientUrl
    }

    const styleTags = styledSheet.getStyleElement()
    const html = ReactDOM.renderToStaticMarkup(<Html store={store} styleTags={styleTags}  sheets={sheets} {...data} />)
    res.status(route.status || SUCCESS)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  } finally {
    styledSheet.seal()
  }
})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err))
  const sheets = new SheetsRegistry()
  const initialEntries = [req.path + queryToParams(req.query)]
  const history = createHistory({initialEntries})
  const store = createStore(history, {}, false)
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      store={store}
      description={err.message}
      sheets={sheets}
      styles={[{id: 'css', cssText: errorPageStyle._getCss()}]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  )
  res.status(err.status || 500)
  res.send(`<!doctype html>${html}`)
})

//
// Launch the server
// -----------------------------------------------------------------------------

if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`)
  })
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./router')
}

export default app
