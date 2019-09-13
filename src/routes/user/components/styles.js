import {
  crossBrowserify,
  fallbacksStyle
} from '../../../constants/styles'

const styles = {
  proWrapper: {
    paddingTop: '50px',
    paddingBottom: '55px',
    '& ::-webkit-scrollbar-track': {
      ...crossBrowserify('borderRadius', '50%'),
      background: '#ebebeb'
    }
  },
  contentWrapper: {
    ...fallbacksStyle('display', 'flex'),
    position: 'relative',
    padding: '0'
  },
  wrapper: {
    paddingTop: '50px',
    paddingBottom: '55px'
  },
  divider: {
    width: '100%'
  },
  content: {
    ...crossBrowserify('flexGrow', '1'),
    padding: '40px 50px 0 30px',
    '& > div': {
      padding: '0'
    }
  },
  contentStat: {
    paddingTop: '40px',
    margin: '0 auto',
    maxWidth: '1200px'
  },
  contentEmp: {
    extend: 'contentStat',
    ...fallbacksStyle('display', 'flex'),
    '& > div:last-child': {
      width: 'calc(100% - 302px)'
    }
  }
}

export default styles
