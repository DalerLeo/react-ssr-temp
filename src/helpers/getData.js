import toCamelCase from './toCamelCase'

const getData = (data) => {
  return toCamelCase(data.data)
}

export default getData
