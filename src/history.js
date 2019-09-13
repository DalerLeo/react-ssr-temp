const ZERO = 0
import { createBrowserHistory } from 'history'

// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
export default process.env.BROWSER && createBrowserHistory()

export const createPath = location => {
  const { pathname, search, hash } = location

  let path = pathname || '/'

  if (search && search !== '?') path += search.charAt(ZERO) === '?' ? search : `?${search}`

  if (hash && hash !== '#') path += hash.charAt(ZERO) === '#' ? hash : `#${hash}`

  return path
}
