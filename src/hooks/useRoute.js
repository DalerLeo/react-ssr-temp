import { replaceParamsRoute } from 'utils/route'
import { useContext } from 'react'
import History from '../HistoryProvider'

const useRoute = () => {
  const history = useContext(History)

  const { location: { search } } = history
  const queries = new URLSearchParams(search)

  const setParam = (param) => {
    replaceParamsRoute(param, history)
  }

  const getParam = (key) => {
    return queries.get(key)
  }

  return { setParam, getParam }
}

export default useRoute
