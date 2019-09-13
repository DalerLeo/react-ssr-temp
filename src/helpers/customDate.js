import fp from 'lodash/fp'
import moment from 'moment'

/* eslint-disable no-undefined */
export const dateObjectFormat = (stringDate) => {
  const day = moment(stringDate).format('D')
  const month = moment(stringDate).format('MM')
  const year = moment(stringDate).format('YYYY')
  if (stringDate) {
    return {
      day,
      month,
      year
    }
  }
  return {}
}

export const dateStringFormat = (dateObject) => {
  const day = fp.getOr('1', 'day', dateObject)
  const month = fp.get('month', dateObject)
  const year = fp.get('year', dateObject)
  const fullDate = `${year}-${month}-${day}`

  if (fp.isString(dateObject)) {
    return dateObject
  }
  if (!fp.isEmpty(dateObject) && fp.isObject(dateObject)) {
    return moment(fullDate, 'YYYY-MM-D').format('YYYY-MM-DD')
  }
  return undefined
}
