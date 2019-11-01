import moment from 'moment'
import * as actionTypes from '../../constants/actionTypes'
import { setCookie } from '../../utils/cookie'

export const setAppLanguageAction = (lang) => {
  const ONE_YEAR = 365
  return dispatch => {
    if (lang === 'uz') moment.locale('uz-latn')
    else moment.locale(lang)

    setCookie('lang', lang, ONE_YEAR)
    return dispatch({
      payload: Promise.resolve(lang),
      type: actionTypes.LANGUAGE
    })
  }
}
