import { API_URL } from 'constants/api'
import getCookie from 'helpers/getCookie'

export default api => {
  const token = getCookie('token')
  const lang = getCookie('lang') || 'ru'
  window.location = `${API_URL}/${lang}/${api}?token=${token}`
}
