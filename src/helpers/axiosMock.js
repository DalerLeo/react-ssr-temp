export const axiosMock = (data, actionType) => {
  const TIMEOUT = 500
  const payload = new Promise((resolve) => {
    setTimeout(() => resolve(data), TIMEOUT)
  })
  return {
    type: actionType,
    payload
  }
}
