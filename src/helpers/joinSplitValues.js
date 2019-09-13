import fp from 'lodash/fp'

export const joinArray = fp.join('-')

export const splitToArray = (value) => {
  if (!value) return null
  return fp.flow(
    fp.split('-'),
    fp.map(item => {
      const isNumber = !fp.isNaN(fp.toNumber(item))
      return isNumber ? fp.toNumber(item) : item
    })
  )(value)
}
