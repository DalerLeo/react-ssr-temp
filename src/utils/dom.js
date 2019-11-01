/* eslint-disable func-style */
import { pathOr } from 'ramda'

export const setPageTitle = (value, isServer) => {
  if (!isServer) {
    if (document) {
      document.title = `${value} - Title`
    }
  }
}

export async function getServerTitle ({ id, action, store, isServer, defaultText, extraParams = [] }) {
  const data = isServer && await store.dispatch(action(id, ...extraParams))
  return pathOr(defaultText, ['value', 'title'], data)
}
