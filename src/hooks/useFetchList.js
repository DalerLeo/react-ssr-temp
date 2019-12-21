import { pick, pipe, equals } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'
import { getDataFromState, getParamsFormHistory } from '../utils/get'
import { DEFAULT_PICK_PARAMS } from '../utils/isEquals'
import toSnakeCase from '../utils/toSnakeCase'
import History from '../HistoryProvider'
import useCompareEffect from './useCompareEffect'

export const getListParams = (history, keys) =>
  pipe(
    getParamsFormHistory,
    pick(keys),
    toSnakeCase
  )(history)

const useFetchList = (params) => {
  const {
    stateName,
    action,
    key = 'list',
    mapper = getListParams,
    pickParams = DEFAULT_PICK_PARAMS
  } = params

  const dispatch = useDispatch()
  const history = useContext(History)

  const searchParams = getListParams(history, pickParams)
  const data = useSelector(state => getDataFromState(stateName, state), equals)
  const effect = () => {
    dispatch(action(mapper(history, searchParams)))
  }

  useCompareEffect(effect, [searchParams])

  return data
}

export default useFetchList
