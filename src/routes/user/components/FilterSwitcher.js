import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import withHistory from 'helpers/withHistory'
import hexToRgb from 'helpers/hexToRgb'
import { MAIN_COLOR } from 'constants/styles'
import Drop from 'react-icons/lib/md/keyboard-arrow-down'
import T from 'components/T'

const style = {
  switchWrap: {
    zIndex: '10',
    display: 'inline-block',
    position: 'relative',
    lineHeight: '22px',
    fontWeight: '500',
    fontSize: '18px',
    '&:hover': {
      '& $list': {
        opacity: '1',
        visibility: 'visible'
      }
    }
  },
  selected: {
    cursor: 'pointer',
    color: MAIN_COLOR
  },
  list: {
    transition: 'all 400ms',
    lineHeight: 'normal',
    fontSize: '14px',
    fontWeight: '500',
    position: 'absolute',
    top: '30px',
    right: '0',
    background: '#fff',
    opacity: '0',
    visibility: 'hidden',
    boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.044)',
    borderRadius: '4px',
    padding: '15px'
  },
  listItem: {
    cursor: 'pointer',
    lineHeight: '32px',
    padding: '0 8px',
    color: '#666',
    '&:hover': {
      borderRadius: '4px',
      backgroundColor: hexToRgb('#8798ad', '0.08')
    }
  }
}
const enhance = compose(
  withHistory,
  injectSheet(style)
)

const onChange = ({ value }, { history, filter }) => {
  const params = filter.getParams({ 'switcher': value })
  const query = filter.createURL(params)
  return history.push(query)
}

const FilterSwitcher = props => {
  const { classes, label, list, filter } = props
  const switchLabelData = fp.find({ 'value': filter.getParam('switcher') }, list) || fp.first(list)
  const isStaticLabel = fp.get('isStatic', switchLabelData)
  const switchLabel = fp.get('label', switchLabelData)

  return (
    <div className={classes.switchWrap}>
      <span><T>{label}</T>: </span>
      <span className={classes.selected}>{isStaticLabel ? <T>{switchLabel}</T> : switchLabel}<Drop/></span>
      <div className={classes.list}>
        {fp.map(item => {
          const isStatic = fp.get('isStatic', item)
          return (
            <div
              key={item.label}
              className={classes.listItem}
              onClick={() => onChange(item, props)}>
              {isStatic ? <T>{item.label}</T> : item.label}
            </div>
          )
        }, list)}
      </div>
    </div>
  )
}

FilterSwitcher.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default enhance(FilterSwitcher)
