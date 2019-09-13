import injectSheet from 'react-jss'
import { BORDER_STYLE, crossBrowserify, fallbacksStyle } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'

export default injectSheet({
  block: {
    position: 'relative'
  },
  fields: {
    marginTop: '40px'
  },
  salary: {
    marginTop: '40px',
    marginBottom: '18px',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-end'),
    '& > div:first-child': {
      marginRight: '10px'
    }
  },
  itemMargin: {
    marginLeft: '20px'
  },
  line: {
    width: '100%',
    borderTop: BORDER_STYLE,
    marginTop: '30px',
    paddingTop: '30px'
  },
  radioWrap: {
    margin: '40px 0 30px',
    paddingBottom: '14px',
    borderBottom: BORDER_STYLE
  },
  sphereWrapper: {
    opacity: '0',
    visibility: 'hidden',
    maxHeight: '0',
    transition: 'all 300ms'
  },
  sphereAnima: {
    marginTop: '40px',
    opacity: '1',
    visibility: 'visible',
    maxHeight: '300px'
  },
  spheres: {
    borderRadius: '4px',
    border: BORDER_STYLE,
    padding: '10px 20px',
    '& > div': {
      maxHeight: '180px',
      overflow: 'hidden',
      overflowY: 'auto'
    }
  },
  age: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    '& > div': {
      marginLeft: '10px'
    }
  },
  salaries: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start'),
    '& > div:not(:last-child)': {
      marginRight: '20px'
    }
  },
  questions: {
    padding: '27px 25px 30px',
    background: '#8798AD',
    borderRadius: '4px',
    marginTop: '30px',
    color: '#fff'
  },
  questionList: {
    margin: '22px 0',
    lineHeight: '22px'
  },
  question: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    borderBottom: '1px dashed',
    borderColor: hexToRgb('#fff', '0.3')
  },
  questionActions: {
    '& span': {
      cursor: 'pointer',
      opacity: '0.6',
      display: 'inline-block',
      '&:first-child': {
        marginRight: '10px',
        borderRight: '1px solid',
        paddingRight: '10px'
      }
    }
  },
  title: {
    fontWeight: '500',
    fontSize: '16px'
  },
  decr: {
    lineHeight: '22px',
    opacity: '0.85',
    margin: '18px 0'
  },
  button: {
    ...crossBrowserify('transition', 'all 200ms'),
    background: hexToRgb('#fff', '0.19'),
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    lineHeight: '36px',
    textAlign: 'center',
    '&:hover': {
      background: hexToRgb('#FFFFFF', '0.22')
    },
    '&:active': {
      background: hexToRgb('#FFFFFF', '0.18')
    }
  },
  addQuestions: {
    margin: '0 auto',
    background: '#F6F7F9',
    padding: '40px 50px'
  },
  answers: {
    extend: 'fields',
    overflow: 'hidden',
    overflowY: 'auto',
    marginRight: '-20px',
    paddingRight: '20px',
    opacity: '0',
    maxHeight: '0',
    visibility: 'hidden',
    transition: 'all 400ms'
  },
  answerAnim: {
    opacity: '1',
    visibility: 'visible',
    maxHeight: '400px'
  },
  answerBtn: {
    marginTop: '40px',
    textAlign: 'right',
    '& button': { width: '180px' }
  }
})
