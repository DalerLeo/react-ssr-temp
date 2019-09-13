/* eslint-disable no-div-regex */
import _ from 'lodash'

export default (params) => {
  const search = _.trimStart(params, '?')
  if (params) {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }
  return {}
}
