import React, { useReducer, useEffect } from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  LABEL_COLOR,
  WHITE_COLOR,
  ANCHOR_DISABLED,
  animationStyle
} from 'constants/styles'
import withQuotes from 'helpers/withQuotes'
import CompanyCard from 'components/Cards/CompanyCard'
import ExpandIcon from 'react-icons/lib/md/expand-more'
import Title from 'components/Title'
import Container from 'components/Container'
import EmptyState from 'components/EmptyState'
import T from 'components/T'

const CARD_HEIGHT = 180
const enhance = compose(
  injectSheet({
    wrapper: {},
    headerList: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('alignItems', 'center'),
      marginBottom: '20px'
    },
    itemWrapper: {
      overflow: 'hidden',
      transition: 'max-height 300ms ease-in',
      maxHeight: '42px',
      '& svg': {
        transition: 'transform 500ms'
      },
      '&:not(:last-child)': {
        marginBottom: '20px'
      }
    },
    xpand: {
      maxHeight: '1000px'
    },
    onHide: {
      cursor: 'pointer',
      color: LABEL_COLOR,
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: 'normal'
    },
    detailList: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('alignItems', 'center'),
      '& > div:last-child': {
        width: '200px'
      },
      '&:not(:last-child)': {
        marginBottom: '20px'
      }
    },
    link: {
      ...ANCHOR_DISABLED,
      display: 'block',
      marginRight: '25px',
      width: 'calc(100% - 225px)'
    },
    label: {
      color: LABEL_COLOR,
      fontSize: '15px',
      lineHeight: '22px',
      marginBottom: '2px'
    },
    date: {
      color: LABEL_COLOR,
      fontSize: '13px'
    },
    status: {
      ...fallbacksStyle('display', 'inline-flex'),
      ...crossBrowserify('alignItems', 'center'),
      borderRadius: '20px',
      fontWeight: '500',
      lineHeight: '22px',
      padding: '4px 15px'
    },
    seen: {
      extend: 'status',
      background: '#eef1f6',
      color: '#000'
    },
    rejected: {
      extend: 'status',
      background: '#F46090',
      color: '#fff'
    },
    invited: {
      extend: 'status',
      background: '#2bc48c',
      color: WHITE_COLOR,
      marginBottom: '5px',
      '& > svg': {
        fontSize: '20px',
        marginRight: '5px'
      }
    }
  })
)

const highlight = {
  color: MAIN_COLOR,
  fontSize: '16px'
}

const reducer = (state, action) => ({ ...state, ...action })

const FeedbackWork = props => {
  const { classes, appealList } = props

  const loading = fp.get('loading', appealList)
  const list = fp.flow(
    fp.get('data'),
    fp.groupBy(fp.get('resume.id')),
    fp.toPairs,
    fp.map(item => {
      const [, companies] = item
      const resumeData = fp.flow(fp.first, fp.get('resume'))(companies)
      return {
        resume: resumeData,
        employers: fp.map(fp.get('employer'), companies)
      }
    })
  )(appealList)

  const listKeys = fp.map(item => {
    const id = fp.get('resume.id', item)
    return [id, true]
  }, list)

  const [state, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    if (!loading) dispatch(fp.fromPairs(listKeys))
  }, [loading])

  const getDetail = fp.map(item => {
    const employerId = fp.get('id', item)
    return (
      <div key={employerId} className={classes.detailList}>
        <CompanyCard data={item}/>
      </div>
    )
  })

  const toggleExpand = key => {
    dispatch({ ...state, [key]: !state[key] })
  }

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        {fp.map(item => {
          const id = fp.get('resume.id', item)
          const employers = fp.get('employers', item)
          const NUM_OF_CARD = fp.size(employers)
          const title = withQuotes(fp.get('resume.title', item))
          const isOpen = fp.get(id, state)
          const maxHeight = isOpen ? `${CARD_HEIGHT * NUM_OF_CARD}px` : '42px'
          return (
            <div style={{ maxHeight: maxHeight }} className={classes.itemWrapper} key={id}>
              <div className={classes.headerList}>
                <Title
                  isProfile={true}
                  margin={'0'}
                  text={<div><T>applicant_resume_appeals</T> <span style={highlight}>{title}</span></div>}/>
                <div
                  onClick={() => toggleExpand(id)}
                  className={classes.onHide}>
                  <T>{isOpen ? 'button_hide' : 'button_show_serv'}</T>
                  <ExpandIcon style={{ fontSize: '19px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
                </div>
              </div>
              {getDetail(employers)}
            </div>
          )
        }, list)}
        <EmptyState
          data={appealList}
          loading={loading}
          text={'У вас пока нет откликов'}
        />
      </div>
    </Container>
  )
}

FeedbackWork.propTypes = {
  classes: PropTypes.object,
  appealList: PropTypes.object.isRequired
}
export default enhance(FeedbackWork)
