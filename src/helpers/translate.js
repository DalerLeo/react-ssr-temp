import fp from 'lodash/fp'
import translations from '../constants/translations'

export const getTranslate = (obj, lang, objName = 'name') => {
  const name = objName + fp.capitalize(lang)
  return fp.get(name, obj)
}

export default (key, language) => {
  return fp.get([key, language], translations) || fp.get([key, 'ru'], translations)
}
