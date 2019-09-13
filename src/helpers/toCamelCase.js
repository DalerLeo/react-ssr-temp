import fp from 'lodash/fp'

const toCamelCase = (data) => {
  if (fp.isArray(data)) {
    return fp.map((item) => toCamelCase(item), data)
  }

  if (fp.isObject(data)) {
    return fp.flow(
      fp.mapKeys((key) => fp.camelCase(key)),
      fp.mapValues((value) => toCamelCase(value))
    )(data)
  }

  return data
}

export default toCamelCase
