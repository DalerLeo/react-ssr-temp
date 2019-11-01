import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  store: PropTypes.any.isRequired,
  isAuth: PropTypes.any.isRequired,
  isServer: PropTypes.bool
}

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
    lang: PropTypes.string
  };

  static childContextTypes = ContextType;

  getChildContext () {
    return this.props.context
  }

  componentDidMount () {
    const lang = this.props.lang === 'uz' ? 'uz-latn' : this.props.lang
    moment.locale(lang)
  }

  render () {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // Please do that inside the Layout component.
    return React.Children.only(this.props.children)
  }
}

export default App
