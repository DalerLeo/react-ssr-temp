/* eslint-disable */
import React from 'react'
import fp from 'lodash/fp'
import _ from 'lodash'
import moment from 'moment'
import curryRight from 'lodash/curryRight'
import isUndefined from 'lodash/isUndefined'
import filterHelper from 'helpers/filterHelper'
import not from 'helpers/not'
import pickBy from 'lodash/pickBy'
import numberFormat from 'helpers/numberFormat'
import T from 'components/T'

const ONLY_PHONE = 4
export const compareFilterByProps = curryRight((props, nextProps, filterName = 'filter', except = {}) => {
  return props[filterName].filterRequest(except) === nextProps[filterName].filterRequest(except)
})

export const getYearText = (value, language = 'ru', isAge) => {
  const count = value % 10
  if (language === 'en') {
    if (value === 1) {
      return `${value} year`
    }
    return `${value} years`
  }

  if (language === 'uz') {
    if (isAge) return `${value} yosh`
    return `${value} yil`
  }

  if (value === 12) {
    return `${value} лет`
  }
  if (count === 1) {
    return `${value} год`
  } else if (count >= 2 && count <= 4) {
    return `${value} года`
  }
  return `${value} лет`
}

export const getMonthText = (value, language = 'ru') => {
  if (language === 'en') {
    if (value === 1) {
      return `${value} month`
    }
    return `${value} months`
  }

  if (language === 'uz') return `${value} oy`

  if (value === 1) {
    return `${value} месяц`
  } else if (value >= 2 && value <= 4) {
    return `${value} месяца`
  }
  return `${value} месяцев`
}

export const getDaysText = (value, lang = 'ru') => {
  const preLastDigit = value % 100 / 10
  if (lang === 'ru') {
    if (preLastDigit === 1) return `${value} дней`

    switch (value % 10) {
      case 1:
        return `${value} день`
      case 2:
      case 3:
      case 4:
        return `${value} дня`
      default:
        return `${value} дней`
    }
  }
  if (lang === 'en') {
    if (value === 1) return `${value} day`
    return `${value} days`
  }
  if (lang === 'uz') return `${value} kun`
}

export const getStateData = (path, name, state, filter = true, pageSize) => {
  const list = fp.get(`${path}.data`, state)
  const loading = fp.get(`${path}.loading`, state)
  const failed = fp.get(`${path}.failed`, state)
  const pathname = fp.get(['router', 'pathname'], state)
  const queries = fp.get(['router', 'queries'], state)
  const withPagination = _.has(list, 'results')
  const obj = {}

  obj[`${name}List`] = {
    data: withPagination ? fp.getOr([], 'results', list) : list || [],
    loading,
    failed
  }

  if (filter) {
    obj[`${name}Filter`] = filterHelper(list, pathname, queries, {}, pageSize)
  }

  return obj
}

export const getItemStateData = (path, name, state) => {
  const data = fp.get(`${path}.data`, state) || {}
  const loading = fp.get(`${path}.loading`, state)
  const obj = {}
  obj[`${name}Detail`] = {
    data,
    loading
  }
  return obj
}

export const getStateLoading = (path, name, state) => {
  const loading = fp.get(`${path}.loading`, state)
  //  Console.warn(loading)
  return {[`${name}Loading`]: loading}
}

const filterIt = _.cond([
  [_.isArray, _.flow([_.isEmpty, not])],
  [_.isObject, _.flow([_.isEmpty, not])],
  [_.stubTrue, _.identity]
])
export const removeFalsy = (obj) => pickBy(obj, filterIt)

export const arrayObjToObj = fp.flow(
  fp.map(fp.values),
  fp.fromPairs
)

export const getOnlyString = (str) => {
  if ((str === null) || (str === '') || isUndefined(str)) return null

  return fp.trim(
    str
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]*;/g, '')
      .replace(/\/[^\/]*\//g, '')
      .replace(/{[^}]*}/g, '')
  )
}
export const getWithBR = (str) => {
  if ((str === null) || (str === '') || isUndefined(str)) return null

  return fp.trim(
    str.replace(/\n/g, '<br/>')
  )
}

export const getPhone = (string) => {
  if (!string) return null

  return string.substring(ONLY_PHONE)
}

export const getPhoneFormat = (string) => {
  const hasPlus = fp.includes('+', string)
  const isEleven = fp.size(string) > 11
  const isNumber = fp.toInteger(getPhone(string))
  if (hasPlus && isNumber && isEleven) {
    return string.substring(0, 6) + ' ' +
            string.substring(6, 9) + ' ' +
            string.substring(9, 11) + ' ' +
            string.substring(11)
  }
  return string
}

export const getAgeFromDate = (date, lang) => {
  const age = date ? moment().diff(date, 'years') : 0
  return getYearText(age, lang, true)
}

export const getSalary = (data) => {
  const fromSalary = fp.get('fromSalary', data)
  return fromSalary ? numberFormat(fromSalary) : fp.get('wishedSalary', data)
}

export const getSalaryCurrency = (data) => {
  const fromSalary = fp.get('fromSalary', data)
  const currency = fp.get('currency.name', data)
  return fromSalary ? numberFormat(fromSalary, currency) : fp.get('wishedSalary', data)
}

export const getVacancySalary = (salaryFrom, salaryTo, currency, defaultText) => {
  const fromNumber = fp.toNumber(salaryFrom)
  const toNumber = fp.toNumber(salaryTo)
  if (!fromNumber && !toNumber) return <T>{defaultText}</T>
  if (fromNumber && !toNumber) {
    return numberFormat(fromNumber, currency)
  }
  return fromNumber && currency
    ? fp.flow(
      fp.map(item => {
        if (item === toNumber && toNumber) return numberFormat(item, currency)
        return numberFormat(item)
      }),
      fp.join(' - ')
    )([fromNumber, toNumber])
    : defaultText
      ? <T>{defaultText}</T>
      : null
}

export const isEmployer = (data) => {
  const isAuth = !_.isEmpty(data)
  const userType = data.userType
  return isAuth && (userType === 'employer' || userType === 'employer_staff')
}

export const isApplicant = (data) => {
  const isAuth = !_.isEmpty(data)
  return isAuth && data.userType === 'applicant'
}

export const getExperience = (exp, lang) => {
  const YEAR = 12
  const ONE = 1
  if (!exp) return <T>experience_none</T>
  const years = _.toInteger(exp / YEAR)
  const months = exp % YEAR
  if (years < ONE && months < ONE) return null
  if (years >= ONE) return `${getYearText(years, lang)} ${getMonthText(months, lang)}`
  return getMonthText(months)
}
