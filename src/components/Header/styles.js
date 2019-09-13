import {
  LIGHT_GREY_COLOR,
  TEXT_COLOR_DEFAULT,
  WHITE_COLOR,
  crossBrowserify,
  fallbacksStyle, BLACK_COLOR
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'

const styles = {
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '100'
  },

  header: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    ...crossBrowserify('alignItems', 'center'),
    background: WHITE_COLOR,
    height: '68px',
    position: 'relative',
    '&:before': {
      background: 'inherit',
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      right: '100%',
      width: '100%'
    },
    '&:after': {
      background: 'inherit',
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '100%',
      width: '100%'
    }
  },

  logo: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    color: `${BLACK_COLOR} !important`,
    fontSize: '24px',
    fontWeight: '500',
    height: '100%',
    padding: '0 25px',
    textDecoration: 'none !important'
  },

  searchWrapper: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },

  search: {
    marginLeft: '51px',
    opacity: '0',
    visibility: 'hidden',
    ...crossBrowserify('transition', 'all 300ms')
  },

  showSearch: {
    opacity: '1',
    visibility: 'visible'
  },

  rightSide: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    height: '100%',
    padding: '15px 0'
  },

  item: {
    color: hexToRgb(BLACK_COLOR, '0.75'),
    fontSize: '14px',
    marginLeft: '30px',
    paddingLeft: '16px',
    borderLeft: `1px solid ${hexToRgb('#707070', '0.42')}`,
    lineHeight: '20px',
    '&:first-child': {
      border: 'none',
      marginLeft: '0',
      paddingLeft: '0'
    }
  },

  icons: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },

  cart: {
    cursor: 'pointer',
    display: 'inherit'
  },

  favorite: {
    extend: 'cart'
  },

  languages: {
    ...fallbacksStyle('display', 'flex'),
    '& > a': {
      color: TEXT_COLOR_DEFAULT,
      marginLeft: '13px',
      '&:first-child': {
        margin: '0'
      }
    }
  },

  lang: {
    color: LIGHT_GREY_COLOR,
    opacity: '0.4'
  },

  activeLang: {
    color: hexToRgb(BLACK_COLOR, '0.75'),
    opacity: '1'
  },

  auth: {
    extend: 'languages',
    marginLeft: '16px',
    paddingLeft: '30px'
  }
}

export default styles
