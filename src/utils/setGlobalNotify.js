import * as actionTypes from '../constants/actionTypes'

export default (open = true) => ({
  type: actionTypes.NOTIFY_OPEN,
  data: { open },
  loading: false
})
