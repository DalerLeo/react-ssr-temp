import React, { useEffect, useReducer } from 'react'
import sprintf from 'sprintf'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
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
import { VACANCY_ITEM } from 'constants/routes'
import dateFormat from 'helpers/dateFormat'
import withQuotes from 'helpers/withQuotes'
import VacancySmallCard from 'components/Cards/VacancySmallCard'
import DoneIcon from 'react-icons/lib/md/done'
import ExpandIcon from 'react-icons/lib/md/expand-more'
import Link from 'components/Link'
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

const statusNames = {
  'requested': 'applicant_vacancy_appeal_requested',
  'viewed': 'applicant_vacancy_appeal_viewed',
  'accepted': 'applicant_vacancy_appeal_accepted',
  'rejected': 'applicant_vacancy_appeal_rejected'
}

const reducer = (state, action) => ({ ...state, ...action })

const Feedback = props => {
  const { classes, appealList } = props

  const list = fp.get('data', appealList)
  const loading = fp.get('loading', appealList)
  const filteredList = fp.filter(item => {
    const vacancies = fp.get('vacancies', item)
    return !isEmpty(vacancies)
  }, list)

  const listKeys = fp.map(item => {
    const id = fp.get('resume.id', item)
    return [id, true]
  }, filteredList)

  const [state, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    if (!loading) dispatch(fp.fromPairs(listKeys))
  }, [loading])

  const getDetail = fp.map(item => {
    const date = fp.get('modifiedDate', item)
    const vacancy = fp.get('vacancy', item)
    const vacancyId = fp.get('id', vacancy)
    const status = fp.get('status', item)
    const isNew = fp.get('isNew', item)
    const statusName = fp.get(status, statusNames)
    const statusText = (!isNew && status === 'requested') ? 'applicant_vacancy_appeal_seen' : statusName
    return (
      <div key={vacancyId} className={classes.detailList}>
        <Link className={classes.link} to={sprintf(VACANCY_ITEM, vacancyId)}>
          <VacancySmallCard data={vacancy}/>
        </Link>
        {status === 'accepted'
          ? <div>
            <div className={classes.invited}>
              <DoneIcon/>
              <span><T>{statusText}</T></span>
            </div>
            <div className={classes.date}>Ура, Вас готовы пригласить на собеседование</div>
          </div>
          : <div>
            <div className={classNames({
              [classes.label]: true,
              [classes.seen]: status === 'viewed',
              [classes.rejected]: status === 'rejected'
            })}><T>{statusText}</T></div>
            <div className={classes.date}>{dateFormat(date, true)}</div>
          </div>}
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
          const vacancies = fp.get('vacancies', item)
          const NUM_OF_CARD = fp.size(vacancies)
          const title = withQuotes(fp.get(['resume', 'title'], item))
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
              {getDetail(vacancies)}
            </div>
          )
        }, filteredList)}
        <EmptyState
          data={filteredList}
          loading={loading}
          text={'У вас пока нет откликов'}
        />
      </div>
    </Container>
  )
}

Feedback.propTypes = {
  classes: PropTypes.object,
  appealList: PropTypes.object.isRequired
}
export default enhance(Feedback)
