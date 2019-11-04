import moment from 'moment'

export const momentToString = (momentObj) => moment.isMoment(momentObj) ? momentObj.format('YYYY-MM-DD') : undefined
export const stringToMoment = (date) => moment(date, 'YYYY-MM-DD')
