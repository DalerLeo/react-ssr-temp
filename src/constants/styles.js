import _ from 'lodash'
import hexToRgb from '../helpers/hexToRgb'
export const ZERO = 0
export const ONE = 1
export const NAV_BACKGROUND = '#eef1f6'
export const BACKGROUND = hexToRgb('#eef1f6', '0.18')
export const MAIN_COLOR = '#7848b7'
export const MAIN_BORDER = '1px solid #7848b7'
export const GREY_BORDER_STYLE = '1px solid rgba(198, 203, 212, 0.65)'
export const GREY_BORDER = '#ebedf0'

export const PRIMARY_COLOR = '#562d8a'
export const PRIMARY_BORDER = '#5d3997'
export const LABEL_COLOR = '#a1a7b3'
export const ALTERNATE_COLOR = '#65218f'
export const PRIMARY_LIGHT = '#66218f'
export const LIGHT_GREY_COLOR = '#b1b1b1'
export const BUTTON_GREY_COLOR = hexToRgb('#ececec', '0.5')
export const GREY_BACKGROUND_COLOR = '#f8f8f8'
export const LIGHT_GREY_BORDER = '#cbd0d8'
export const LIGHT_GREY_BORDER_STYLE = '1px solid #cbd0d8'
export const WHITE_COLOR = '#fff'
export const YELLOW_COLOR = '#ffd367'
export const BLACK_COLOR = '#000'
export const COLOR_RED = '#ff4b4b'
export const TEXT_COLOR_DEFAULT = hexToRgb(BLACK_COLOR, '0.75')

export const BORDER_STYLE = `1px ${hexToRgb('#95989A', '0.45')} solid`
export const FIELD_BORDER_STYLE = '1px #c6cbd4 solid'
export const FIELD_BORDER_STYLE_OPACITY = `1px ${hexToRgb('#c6cbd4', '0.45')} solid`
export const FIELD_BORDER_COLOR = '#c6cbd4'
export const BORDER_COLOR = '#c2c2c2'
export const ATTR_COLOR = '#8492B0'
export const LINK_COLOR = '#8798ad'
export const DATE_COLOR = hexToRgb(BLACK_COLOR, '0.4')

export const animationStyle = {
  animationName: 'rollUpFadeIn',
  animationDuration: '1s'
}

export const spinAnimStyle = {
  animationName: 'slideDownFadeIn',
  animationDuration: '1s'
}
export const slideAnimStyle = {
  animationName: 'slideDownFadeIn',
  animationDuration: '1s'
}

export const slideRightAnimStyle = {
  animationName: 'slideRightFadeIn',
  animationDuration: '1s'
}

export const FADE_IN_ANIMATE = {
  '@keyframes fadeIn': {
    from: { opacity: '0.2' },
    to: { opacity: '1' }
  }
}
export const ROLL_UP_FADE_IN = {
  '@keyframes rollUpFadeIn': {
    from: { marginTop: '20px', opacity: '0.2' },
    to: { marginTop: '0', opacity: '1' }
  }
}

export const ANCHOR_DISABLED = {
  color: BLACK_COLOR,
  textDecoration: 'none !important',
  '&:focus': {
    color: 'unset'
  },
  '&:hover': {
    color: 'unset'
  }
}

export const DISPLAY_FLEX = {
  display: 'flex',
  fallbacks: [
    { display: '-webkit-flex' },
    { display: '-moz-flex' },
    { display: '-ms-flex' }
  ]
}

export const fallbacksStyle = (property, value) => {
  return {
    [property]: value,
    fallbacks: [
      { [property]: `-webkit-${value}` },
      { [property]: `-moz-${value}` },
      { [property]: `-ms-${value}` }
    ]
  }
}

export const crossBrowserify = (prefix, value) => {
  const upperPrefix = _.upperFirst(prefix)
  return {
    [prefix]: value,
    [`Webkit${upperPrefix}`]: value,
    [`Moz${upperPrefix}`]: value,
    [`Ms${upperPrefix}`]: value
  }
}

export const maxLineClamp = (count) => {
  return {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: count,
    WebkitBoxOrient: 'vertical'
  }
}

export const fieldArrayStyles = {
  borderBottom: {
    borderBottom: '1px solid ' + hexToRgb('#c6cbd4', '0.5')
  },
  wrapper: {
    extend: 'borderBottom',
    marginBottom: '38px',
    paddingBottom: '38px'
  },
  listWrap: {
    extend: 'borderBottom',
    paddingBottom: '40px'
  },
  listItem: {
    ...crossBrowserify('borderRadius', '4px'),
    background: '#f9fafb',
    border: '1px solid #e3e5e9',
    padding: '20px',
    position: 'relative',
    '&:not(:last-child)': {
      marginBottom: '30px'
    }
  },
  addBtn: {
    cursor: 'pointer',
    color: MAIN_COLOR,
    fontWeight: '500',
    display: 'block',
    textAlign: 'center',
    marginTop: '30px'
  },
  deleteBtn: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'center'),
    ...crossBrowserify('borderRadius', '50%'),
    ...crossBrowserify('transform', 'translate(50%, -50%)'),
    background: '#EB4B41',
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    right: '0',
    height: '32px',
    width: '32px',
    '& > svg': {
      color: 'white',
      fontSize: '22px'
    }
  },
  fields: {
    '&:not(:first-child)': {
      marginTop: '40px'
    }
  }
}
