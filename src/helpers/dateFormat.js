import moment from 'moment'
import t from 'helpers/translate'

export default (date, time, locale) => {
  const lang = locale || moment.locale()
  if (date === 'present') return t('common_till_now', lang)
  const dateTime = moment(date).format('DD MMM YYYY, HH:mm')
  return (date && time) ? dateTime : (date) ? moment(date).format('DD MMM YYYY') : null
}
