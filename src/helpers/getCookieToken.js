import _ from 'lodash'
import fp from 'lodash/fp'
import { parse } from 'query-string'

const getCookie = fp.flow(
  fp.split(';'),
  fp.map(item => parse(fp.trim(item))),
  fp.find(item => fp.get('token', item)),
  fp.get('token')
)

export const getCookieToken = (cookie) => getCookie(cookie)

export const getStateToken = (state) => _.get(state, ['login', 'data', 'token'])

export const checkToken = (cookie, state) => getStateToken(state) || getCookieToken(cookie)

export const parseCookie = (string) => {
  return getCookie(string)
}
