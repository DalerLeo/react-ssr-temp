import React from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'

class RenderOrNull extends React.Component {
  constructor (props) {
    super(props)
    const visible = Boolean(props.value)
    this.didMount = false
    this.state = { visible }
  }

  componentDidMount () {
    this.didMount = true
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const visible = Boolean(this.props.value)
    const timeout = 600
    if (prevProps.value !== this.props.value && this.didMount) {
      if (!visible) {
        return setTimeout(() => this.setState({ visible }), timeout)
      }
      return this.setState({ visible })
    }
    return null
  }

  componentWillUnmount () {
    this.didMount = false
  }

  render () {
    const { value, children } = this.props
    if (fp.isArray(value) && !fp.isEmpty(value)) {
      return children
    } else if (fp.isArray(value) && fp.isEmpty(value)) return null
    return this.state.visible && children
  }
}

RenderOrNull.propTypes = {
  value: PropTypes.any,
  children: PropTypes.any
}

export default RenderOrNull
