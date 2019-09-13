import axios from 'helpers/axiosHelper'
import toCamelCase from 'helpers/toCamelCase'

let listToken = null
const PAGE_SIZE = 100
const getOptions = (api, search, params, pageSize = PAGE_SIZE, withPageSize, getState, dispatch) => {
  const CancelToken = axios({ getState, dispatch }).CancelToken
  if (listToken) {
    listToken.cancel()
  }
  listToken = CancelToken.source()
  return axios({ getState, dispatch })
    .get(api, {
      cancelToken: search ? listToken.token : null,
      params: {
        search,
        page_size: pageSize,
        ...params
      }
    })
    .then(({ data }) => {
      if (withPageSize) {
        return Promise.resolve(toCamelCase(data.results))
      }
      return Promise.resolve(toCamelCase(data))
    })
    .catch(() => {
      return null
    })
}

export default getOptions
