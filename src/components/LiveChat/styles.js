import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  MAIN_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'

export default {
  chatWrapper: {
    ...crossBrowserify('transition', 'all 300ms'),
    pointerEvents: 'none',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '9999'
  },
  chatWrapperOpen: {
    background: hexToRgb(WHITE_COLOR, '0.6'),
    pointerEvents: 'all'
  },
  button: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('boxShadow', '6px 6px 10px ' + hexToRgb(BLACK_COLOR, '0.11')),
    ...crossBrowserify('transform', 'translateZ(0)'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'center'),
    background: MAIN_COLOR,
    border: '5px ' + hexToRgb(WHITE_COLOR, '0.28') + ' solid',
    borderRadius: '50%',
    height: '74px',
    width: '74px',
    pointerEvents: 'all',
    position: 'fixed',
    right: '30px',
    bottom: '20px',
    cursor: 'pointer',
    zIndex: '99998',
    '& > svg': {
      width: '28px',
      height: '28px'
    }
  },

  wrapper: {
    ...crossBrowserify('transition', 'transform 300ms'),
    ...crossBrowserify('boxShadow', '-5px -5px 10px ' + hexToRgb(BLACK_COLOR, '0.16')),
    ...crossBrowserify('flexDirection', 'column'),
    ...crossBrowserify('transform', 'translateY(-40px)'),
    background: WHITE_COLOR,
    borderRadius: '7px 0 0 0',
    fontSize: '13px',
    position: 'absolute',
    top: '100%',
    right: '0',
    overflow: 'hidden',
    width: '300px',
    zIndex: '99999'
  },

  open: {
    // ...crossBrowserify('transform', 'translate(-7px, -100%)'),
    ...crossBrowserify('transform', 'translateY(-100%)'),
    right: '7px'
  },

  header: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'space-between'),
    background: MAIN_COLOR,
    cursor: 'pointer',
    color: WHITE_COLOR,
    fontSize: '12px',
    height: '40px',
    padding: '0 10px 0 20px',
    pointerEvents: 'all'
  },

  title: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },

  close: {
    cursor: 'pointer',
    padding: '14px 10px',
    height: '30px',
    width: '30px',
    '& span': {
      background: WHITE_COLOR,
      borderRadius: '2px',
      display: 'block',
      height: '2px',
      width: '10px'
    }
  },

  status: {
    background: '#333',
    borderRadius: '50%',
    marginRight: '8px',
    height: '6px',
    width: '6px'
  },
  statusActive: {
    background: '#25CC0D'
  },

  chat: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'space-between'),
    background: '#fbf9fa',
    padding: '0 20px',
    height: '80px'
  },

  callButton: {
    background: '#64218d',
    fontSize: '12px',
    height: '30px',
    lineHeight: '30px',
    padding: '0 20px'
  },

  user: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    fontSize: '12px'
  },

  avatar: {
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '10px',
    height: '48px',
    width: '48px'
  },

  name: {
    fontSize: '14px',
    fontWeight: '500'
  },

  messagesWrapper: {
    background: WHITE_COLOR,
    height: '380px',
    position: 'relative'
  },

  loadMore: {
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '24px',
    textAlign: 'center',
    marginBottom: '10px'
  },
  loader: {
    display: 'block',
    margin: '0 auto 10px'
  },
  messages: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '10px 20px 25px',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
      width: '0'
    }
  },

  message: {
    ...fallbacksStyle('display', 'flex'),
    fontSize: '13px',
    marginBottom: '5px',
    width: '100%',
    '& span': {
      background: '#ececee',
      borderRadius: '5px',
      padding: '10px 15px',
      maxWidth: '70%',
      whiteSpace: 'pre-line',
      wordBreak: 'break-word'
    },
    '&:last-child': {
      marginBottom: '0'
    }
  },

  ownMessage: {
    ...crossBrowserify('justifyContent', 'flex-end'),
    '& span': {
      background: MAIN_COLOR,
      color: WHITE_COLOR
    }
  },

  form: {
    borderTop: '1px solid #E9ECEF',
    padding: '15px 20px'
  },
  input: {
    border: 'none',
    color: BLACK_COLOR,
    fontFamily: 'inherit',
    fontSize: '13px',
    outline: 'none',
    padding: '0',
    resize: 'none',
    '&:focus': {
      boxShadow: 'none'
    }
  }
}
