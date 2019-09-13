import * as actionTypes from '../constants/actionTypes'

export default (loading) => ({
  type: actionTypes.ASYNC_LOADING,
  data: '',
  loading: loading
})
