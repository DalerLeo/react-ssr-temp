import _ from 'lodash'
import { stopSubmit } from 'redux-form'

const formValidate = (formName, er) => {
  const error = _.get(er, 'response.data')
  const nonFieldErrors = _.get(er, 'response.data.nonFieldErrors')
  return stopSubmit(formName, { ...error, _error: nonFieldErrors })
}

export default formValidate
