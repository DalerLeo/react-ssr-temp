import _ from 'lodash'
const hexToRgb = (hex, opacity) => {
  const ONE = 1
  const TWO = 2
  const THREE = 3

  const trimmedHex = _.trimStart(hex, '#')
  const HEX = _.get(trimmedHex, 'length') === THREE ? '#' + trimmedHex + trimmedHex : hex
  const OPACITY = opacity || '1'
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(HEX)
  const R = parseInt(result[ONE], 16)
  const G = parseInt(result[TWO], 16)
  const B = parseInt(result[THREE], 16)
  const RGBA = 'rgba(' + R + ',' + G + ',' + B + ',' + OPACITY + ')'
  return result ? RGBA : null
}

export default hexToRgb
