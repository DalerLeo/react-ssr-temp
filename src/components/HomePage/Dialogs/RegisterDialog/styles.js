import {
  crossBrowserify,
  fallbacksStyle,
  BORDER_STYLE,
  MAIN_COLOR,
  TEXT_COLOR_DEFAULT
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'

export default {
  dialogBody: {
    padding: '40px 100px 33px'
  },
  loginButton: {
    fontSize: '12px',
    fontWeight: '600',
    height: '38px',
    marginTop: '40px'
  },

  registerButton: {
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '16px',
    '& > a': {
      color: TEXT_COLOR_DEFAULT,
      fontSize: 'inherit'
    }
  },
  field: {
    paddingTop: '30px'
  },
  organization: {
    paddingTop: '30px'
  },
  name: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start')
  },
  itemMargin: {
    margin: '12px 0 0 12px'
  },
  contacts: {
    extend: 'field',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start'),
    paddingBottom: '14px',
    '& > div': {
      width: 'calc(50% - 15px)',
      marginBottom: '16px'
    },
    '& > div:first-child': {
      marginRight: '30px'
    }
  },
  policy: {
    borderBottom: BORDER_STYLE,
    color: hexToRgb('#000', '0.6'),
    fontSize: '13px',
    fontWeight: '300',
    marginTop: '12px',
    paddingBottom: '30px',
    '& a': {
      color: 'inherit',
      fontWeight: '500'
    }
  },
  label: {
    fontWeight: '500',
    marginBottom: '15px',
    '& span': {
      color: '#fa2279'
    }
  },
  email: {
    extend: 'field',
    borderTop: BORDER_STYLE
  },
  signUp: {
    textAlign: 'center',
    extend: 'field',
    '& span': {
      color: MAIN_COLOR,
      cursor: 'pointer',
      fontWeight: '500'
    }
  }
}
