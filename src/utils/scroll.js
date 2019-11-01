export const scrollToBlock = (history, hash) => {
  const timeout = 500
  if (hash) {
    history.replace({
      ...history.location,
      hash: `#${hash}`
    })
    setTimeout(() => {
      history.replace({
        ...history.location,
        hash: ''
      })
    }, timeout)
  }
}
