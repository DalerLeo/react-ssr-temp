import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import withHistory from 'helpers/withHistory'
import toBoolean from 'helpers/toBoolean'
import T from 'components/T'
import fp from 'lodash/fp'
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import { crossBrowserify } from 'constants/styles'

const enhance = compose(
  withHistory,
  injectSheet({
    ordering: {
      display: 'inline-block',
      cursor: 'pointer'
    },
    Null: {
      opacity: '0'
    },
    False: {
      fontSize: '18px',
      marginLeft: '2px'
    },
    True: {
      ...crossBrowserify('transform', 'rotate(180deg)'),
      ...crossBrowserify('transition', 'all 200ms')
    }
  }),
)

const OrderingFilter = props => {
  const { classes, filter, value, name, history } = props
  return (
    <div
      onClick={() => history.replace(filter.sortingURL(value))}
      className={classes.ordering}>
      <span>
        <T>{name}</T>
        <ArrowDown className={classNames({
          [classes.False]: filter.getSortingType(value) === false,
          [classes.Null]: fp.isNull(filter.getSortingType(value)),
          [classes.True]: toBoolean(filter.getSortingType(value))
        })}/>
      </span>
    </div>

  )
}
OrderingFilter.propTypes = {
  classes: PropTypes.object,
  filter: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string, PropTypes.node
  ]).isRequired,
  history: PropTypes.object.isRequired
}
export default enhance(OrderingFilter)
