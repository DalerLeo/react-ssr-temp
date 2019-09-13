/* eslint-disable func-style */
import loGet from 'lodash/get'

export const setPageTitle = (value, isServer) => {
  if (!isServer) {
    if (document) {
      document.title = `${value} - MyJob.uz`
    }
  }
}

export async function getServerTitle ({ id, action, store, isServer, defaultText, extraParams = [] }) {
  const data = isServer && await store.dispatch(action(id, ...extraParams))
  return loGet(data, 'value.title', defaultText)
}
