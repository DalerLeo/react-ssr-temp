import fp from 'lodash/fp'

const toSnakeCase = (data) => {
  if (fp.isArray(data)) {
    return fp.map((item) => toSnakeCase(item), data)
  }

  if (fp.isObject(data)) {
    return fp.flow(
      fp.mapKeys((key) => fp.snakeCase(key)),
      fp.mapValues((value) => toSnakeCase(value))
    )(data)
  }

  return data
}

export default toSnakeCase
