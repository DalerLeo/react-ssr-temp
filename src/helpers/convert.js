import _ from 'lodash'

export const convertEmptyValuesToNull = (obj) => {
  return _.mapValues(obj, (value) => {
    if (_.isArray(value) || _.isObject(value)) return value
    if (_.isBoolean(value)) return value
    if (_.isUndefined(value)) return value
    return value || null
  })
}
