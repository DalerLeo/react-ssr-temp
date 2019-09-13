import _ from 'lodash'
import sprintf from 'sprintf'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import React from 'react'
import PropTypes from 'prop-types'
import SearchField from 'components/FormComponents/SearchField'
import axios from 'helpers/axiosHelper'
import toCamelCase from 'helpers/toCamelCase'
import searchFieldGetOptions from 'helpers/searchFieldGetOptions'

const getItem = (id, api, getState, dispatch) => {
  const detailAPI = `${api}%d/`
  return axios({ getState, dispatch }).get(sprintf(detailAPI, id))
    .then(({ data }) => {
      return Promise.resolve(toCamelCase(data))
    })
}

const getOptions = (items) => {
  return Promise.resolve(items)
}

const getStaticItem = (id, items) => {
  const foundItem = _.find(items, (o) => _.get(o, 'id') === id)
  return Promise.resolve(foundItem)
}

const enhance = compose(
  connect(state => {
    return {
      getState: () => state
    }
  })
)

const SearchConfig = (props) => {
  const {
    api,
    getState,
    dispatch,
    params,
    pageSize,
    itemName,
    itemKey,
    getText,
    isStatic,
    items,
    withPageSize
  } = props

  if (isStatic) {
    return (
      <SearchField
        getValue={SearchField.defaultGetValue('id')}
        getText={SearchField.defaultGetText('name')}
        getOptions={() => getOptions(items)}
        getItem={(id) => getStaticItem(id, items)}
        getItemText={SearchField.defaultGetText('name')}
        isStatic={true}
        {...props}
      />
    )
  }

  return (
    <SearchField
      getValue={SearchField.defaultGetValue(itemKey)}
      getText={getText || SearchField.defaultGetText(itemName)}
      getOptions={search => searchFieldGetOptions(
        api,
        search,
        params,
        pageSize,
        withPageSize,
        getState,
        dispatch
      )}
      getItem={(id) => getItem(id, api, getState, dispatch)}
      getItemText={SearchField.defaultGetText(itemName)}
      {...props}
    />
  )
}

SearchConfig.propTypes = {
  api: PropTypes.string,
  params: PropTypes.object,
  pageSize: PropTypes.number,
  getText: PropTypes.func,
  marginZero: PropTypes.bool,
  isStatic: PropTypes.bool,
  items: PropTypes.array,
  itemName: PropTypes.string,
  itemKey: PropTypes.string,
  withPageSize: PropTypes.bool,
  onlySelect: PropTypes.bool,
  getState: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

SearchConfig.defaultProps = {
  onlySelect: false,
  withPageSize: true,
  itemName: 'name',
  itemKey: 'id'
}

export default enhance(SearchConfig)
