import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, is } from 'ramda'

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
    if (is(Array, value) && !isEmpty(value)) {
      return children
    } else if (is(Array, value) && isEmpty(value)) return null
    return this.state.visible && children
  }
}

RenderOrNull.propTypes = {
  value: PropTypes.any,
  children: PropTypes.any
}

export default RenderOrNull
