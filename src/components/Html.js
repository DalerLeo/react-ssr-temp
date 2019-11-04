import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'
import config from '../config'
import styled from './styles'
/* eslint-disable react/no-danger */

const Html = props => {
  const { title, description, styles, scripts, app, children, sheets, styleTags } = props
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {false && <meta name="viewport" content="width=device-width, initial-scale=1" />}
        {scripts.map(script =>
          <link key={script} rel="preload" href={script} as="script" />
        )}
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&amp;subset=cyrillic" rel="stylesheet" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="stylesheet" href="/antd.min.css" />
        <link rel="stylesheet" href="/normalize.css" />
        {styleTags}
        <style dangerouslySetInnerHTML={{ __html: styled }} />
        {styles.map(style =>
          <style
            key={style.id}
            id={style.id}
            dangerouslySetInnerHTML={{ __html: style.cssText }}
          />
        )}
        {sheets && <style id="server-react-jss" type="text/css" dangerouslySetInnerHTML={{ __html: sheets.toString() }} />}
        <script dangerouslySetInnerHTML={{ __html: `var initialState = ${props.store && JSON.stringify(props.store.getState())}` }} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
        {scripts.map(script => <script key={script} src={script} />)}
        {config.analytics.googleTrackingId &&
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`
          }}
        />}
        {config.analytics.googleTrackingId && <script src="https://www.google-analytics.com/analytics.js" async={true} defer={true} />}
      </body>
    </html>
  )
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  styleTags: PropTypes.array,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired
    }).isRequired
  ),
  sheets: PropTypes.any.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
  app: PropTypes.object,
  children: PropTypes.string
}

Html.defaultProps = {
  styles: [],
  scripts: []
}

export default Html
