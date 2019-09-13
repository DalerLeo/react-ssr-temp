/* eslint-disable no-magic-numbers */
export default (cname, cvalue, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  if (typeof document !== 'undefined') {
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }
}
