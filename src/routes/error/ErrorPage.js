/* eslint no-undef: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './ErrorPage.css'

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
      response: PropTypes.object.isRequired
    })
  };

  static defaultProps = {
    error: null
  };

  render () {
    const response = this.props.error.response
    if (__DEV__ && this.props.error) {
      return (
        <div>
          <h1>{this.props.error.name}</h1>
          <pre>{this.props.error.stack}</pre>
          {response && <pre>{this.props.error.response.data}</pre>}
        </div>
      )
    }

    return (
      <div>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        {response && <pre>{this.props.error.response.data}</pre>}
      </div>
    )
  }
}

export { ErrorPage as ErrorPageWithoutStyle }
export default withStyles(s)(ErrorPage)
