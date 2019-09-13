import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  withPropsOnChange,
  withReducer,
  lifecycle,
  withState
} from 'recompose'
import Autocomplete from './AutoComplete'

const DELAY_FOR_TYPE_ATTACK = 300
const fetchList = (props, parent) => {
  const { input, state, dispatch, getOptions, getText, getValue, getDataSource } = props
  if (parent && !state.firstTime) {
    input.onChange(null)
  }
  dispatch({ loading: true })
  getOptions(state.text)
    .then((data) => {
      return _.map(data, (item) => {
        return {
          text: getText(item),
          value: getValue(item)
        }
      })
    })
    .then((data) => {
      if (typeof getDataSource === 'function') getDataSource(data)
      dispatch({ dataSource: data, loading: false })
    })
}

const enhance = compose(
  withState('mount', 'setMount', false),
  withReducer('state', 'dispatch', (state, action) => {
    return { ...state, ...action }
  }, {
    text: '',
    dataSource: [],
    loading: false,
    firstTime: true,
    open: false
  }),

  // TO CHILD SEARCH FIELD
  withPropsOnChange((props, nextProps) => {
    const parent = _.get(props, ['parent'])
    const nextParent = _.get(nextProps, ['parent'])
    const mount = _.get(props, ['mount'])
    const nextMount = _.get(nextProps, ['mount'])
    return (parent !== nextParent && nextParent) || (mount !== nextMount && nextMount)
  }, ({ mount, parent, input, ...props }) => {
    if (mount && parent) {
      _.debounce(fetchList, DELAY_FOR_TYPE_ATTACK)(props, true)
      if (_.isString(parent)) {
        input.onChange(null)
      }
    }
  }),

  // FETCH DATA WHEN SEARCH
  withPropsOnChange((props, nextProps) => {
    const text = _.get(props, ['state', 'text'])
    const open = _.get(props, ['state', 'open'])
    const nextText = _.get(nextProps, ['state', 'text'])
    const nextOpen = _.get(nextProps, ['state', 'open'])
    return (text !== nextText || open !== nextOpen) && nextOpen
  }, (props) => {
    if (props.state.open) {
      return _.debounce(fetchList, DELAY_FOR_TYPE_ATTACK)(props)
    }
    return null
  }),

  withPropsOnChange((props, nextProps) => {
    const value = _.get(props, ['input', 'value'])
    const valueNext = _.get(nextProps, ['input', 'value'])
    const dataSource = _.get(nextProps, ['state', 'dataSource'])
    return (!_.isEmpty(dataSource) || value !== valueNext) && valueNext
  }, (props) => {
    const { state, input, getItem, dispatch, getText, getValue, isStatic } = props
    const defaultValue = _.get(input, ['value'])
    const numberValue = _.toNumber(defaultValue)
    const value = _.isNaN(numberValue) ? defaultValue : numberValue
    const finder = _.find(state.dataSource, {
      value: isStatic ? String(value) : value
    })
    if (_.isEmpty(finder) && value && (isStatic || !_.isNaN(numberValue))) {
      getItem(value)
        .then((data) => {
          if (!_.isEmpty(data)) {
            return dispatch({
              dataSource: _.unionBy(props.state.dataSource, [{
                text: getText(data), value: getValue(data)
              }], 'value')
            })
          }
          return null
        })
    }
  }),

  lifecycle({
    componentDidMount () {
      const { setMount, input } = this.props
      if (!_.isEmpty(input.value)) {
        _.debounce(fetchList, DELAY_FOR_TYPE_ATTACK)(this.props)
      }
      setMount(true)
    },
    componentDidUpdate (prevProps) {
      if (prevProps.trigger !== this.props.trigger && prevProps.trigger) {
        _.debounce(fetchList, DELAY_FOR_TYPE_ATTACK)(this.props)
      }
    },
    componentWillUnmount () {
      const { setMount } = this.props
      setMount(false)
    }
  })
)

const AntSearchField = enhance(props => {
  const {
    state,
    dispatch,
    onlySelect,
    input,
    disableOpenOnFocus
  } = props

  const value = _.isNumber(input.value) ? _.toString(input.value) : input.value
  return (
    <Autocomplete
      {...input}
      open={state.open}
      value={value}
      loading={state.loading}
      dataSource={state.dataSource}
      onSearch={text => {
        if (onlySelect) return null
        if (disableOpenOnFocus && !state.open) {
          dispatch({ open: true })
        }
        return dispatch({ text: text })
      }}
      onSelect={key => {
        if (key) dispatch({ open: false })
      }}
      notFoundContent={state.loading ? 'Загрузка...' : 'Не найдено...'}
      onFocus={() => {
        if (disableOpenOnFocus && !state.text) return null
        return dispatch({ open: true })
      }}
      onBlur={(event) => {
        input.onBlur(event)
        if (state.open) dispatch({ open: false })
      }}
      {...props}
    />
  )
})

AntSearchField.defaultGetText = (text) => {
  return (obj) => {
    return _.get(obj, text)
  }
}

AntSearchField.defaultGetValue = (value) => {
  return (obj) => {
    return _.get(obj, value)
  }
}

AntSearchField.propTypes = {
  getText: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  getOptions: PropTypes.func.isRequired,
  isStatic: PropTypes.bool,
  disableOpenOnFocus: PropTypes.bool
}

AntSearchField.defaultProps = {
  disableOpenOnFocus: false
}

export default AntSearchField
