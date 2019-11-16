import {useContext} from 'react'
import { prop, equals as equal } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import History from '../HistoryProvider'

import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'

const useUpdate = params => {
  const { stateName, action, redirectUrl, initialValues, props = {}, id } = params
  const history = useContext(History)


  const dispatch = useDispatch()
  const state = useSelector(getDataFromState(stateName), equal)
  const onSuccess = params.onSuccess || (() => history.push(redirectUrl))
  const serializer = params.serializer || toSnakeCase

  const onSubmit = values => {
    const serializeValues = serializer(values, params)

    return dispatch(action(id, serializeValues))
      .then(data => {
        onSuccess(data, { ...props, values })
      })
      .catch(mapResponseToFormError)
  }

  return { ...state, onSubmit, initialValues, isUpdate: true }
}

export default useUpdate
