import fp from 'lodash/fp'

export default fp.flow(
  fp.get(['response', 'data']),
  data => Promise.reject(data)
)
