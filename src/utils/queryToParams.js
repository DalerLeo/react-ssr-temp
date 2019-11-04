export default (query) => {
  const queryString = Object.keys(query).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
  }).join('&')

  return `?${queryString}`
}
