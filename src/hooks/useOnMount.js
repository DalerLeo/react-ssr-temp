import { useEffect } from 'react'

const useOnMount = (params) => {
  const {
    action
  } = params
  useEffect(action, [])
}

export default useOnMount
