import React from 'react'
import fpGet from 'lodash/fp/get'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import HintIcon from 'icons/HintIcon'
import { crossBrowserify } from 'constants/styles'
import T from 'components/T'

const style = {
  hintWrapper: {
    ...crossBrowserify('boxShadow', '0 5px 12px 2px rgba(0, 0, 0, 0.04)'),
    ...crossBrowserify('transition', 'all 700ms'),
    background: '#fff',
    lineHeight: '21px',
    opacity: '0.1',
    padding: '15px 15px 15px 33px',
    position: 'absolute',
    left: 'calc(100% + 25px)',
    top: '0',
    width: '280px'
  },
  visibleHint: {
    opacity: '1'
  },
  hintTitle: {
    position: 'relative',
    fontWeight: '600',
    '& > svg': {
      color: '#7848B7',
      fontSize: '17px',
      position: 'absolute',
      top: '1px',
      left: '-23px'
    }
  },
  hintDesc: {
    fontSize: '13px',
    whiteSpace: 'pre-line'
  }
}

const HEADER_HEIGHT = 68

const enhance = compose(
  injectSheet(style),
)

const isInViewport = (element) => {
  const elemRect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const blindSpotHeight = 50
  const blindSpotTopOffset = HEADER_HEIGHT + blindSpotHeight
  const blindSpotBottomOffset = 100
  return elemRect.top >= blindSpotTopOffset && elemRect.bottom <= (windowHeight - blindSpotBottomOffset)
}

class FieldHint extends React.Component {
  constructor (props) {
    super(props)
    this.hint = React.createRef()
    this.listener = this.listener.bind(this)

    this.state = {
      inTheViewport: false
    }
  }

  componentDidMount () {
    this.listener()
    window.addEventListener('scroll', this.listener)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.listener)
  }

  listener () {
    const elem = this.hint.current
    if (isInViewport(elem)) return this.setState({ inTheViewport: true })
    return this.setState({ inTheViewport: false })
  }

  render () {
    const { classes, data } = this.props

    return (
      <div ref={this.hint} className={classNames(classes.hintWrapper, {
        [classes.visibleHint]: this.state.inTheViewport
      })}>
        <div className={classes.hintTitle}>
          <HintIcon/>
          <T>{fpGet('title', data)}</T>
        </div>
        <div className={classes.hintDesc}>
          <T>{fpGet('desc', data)}</T>
        </div>
      </div>
    )
  }
}

FieldHint.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
}

export default enhance(FieldHint)
