import * as actionTypes from 'constants/actionTypes'

export default (open = true) => ({
  type: actionTypes.CHAT_DIALOG_OPEN,
  data: { open },
  loading: false
})
