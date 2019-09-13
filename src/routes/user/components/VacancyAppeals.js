import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR, ZERO
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import Title from 'components/Title'
import CheckBox from 'components/FormComponents/Checkbox/SimpleCheckbox'
import ResumeCard from 'components/Cards/ResumeCard'
import classNames from 'classnames'
import { Button, REGRET, APPEAL, COLD } from 'components/Button'
import T from 'components/T'
import SearchField from './SearchField'

const style = {
  chipWrap: {
    marginTop: '15px',
    marginBottom: '25px'
  },
  chip: {
    cursor: 'pointer',
    display: 'inline-block',
    background: '#EEF1F6',
    lineHeight: '25px',
    padding: '2px 15px',
    marginRight: '10px',
    borderRadius: '19px'
  },
  chipMain: {
    background: MAIN_COLOR,
    color: '#fff',
    fontWeight: '500'
  },
  chipDisabled: {
    background: hexToRgb('#EEF1F6', '0.75'),
    color: hexToRgb('#000', '0.55'),
    pointerEvents: 'none'
  },
  resumeWrap: {
    background: 'rgba(237, 237, 237, 0.370556)',
    border: '1px solid #DADDE3',
    borderRadius: '4px'
  },
  headerActions: {
    minHeight: '85px',
    transition: 'opacity 500ms',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    borderBottom: '1px solid #DADDE3',
    padding: '24px 16px',
    '& button': {
      fontWeight: '500',
      marginRight: '15px',
      '&:last-child': {
        marginRight: '0'
      }
    }
  },
  turnOff: {
    display: 'none'
  },
  '@keyframes appear': {
    'from': { opacity: '0' },
    'to': { opacity: '1' }
  },
  turnOn: {
    animation: 'appear 700ms',
    display: 'inline-block'

  },
  itemsWrap: {
    padding: '24px 16px'
  },
  searchActions: {
    animation: 'pulses 700ms infinite',
    display: 'inline-block'
  },
  resumeItem: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    '&:hover $itemAction': {
      opacity: '1'
    },
    '&:not(:last-child)': {
      marginBottom: '20px'
    }
  },

  itemAction: {
    transition: 'all 500ms',
    opacity: '0',
    paddingLeft: '30px',
    '& > div:not(:last-child)': {
      marginBottom: '10px'
    }
  }
}
const btnStyle = {
  fontWeight: '500',
  minWidth: '120px'
}

const enhance = compose(
  injectSheet(style)
)

const VacancyAppeals = props => {
  const {
    classes,
    data,
    onAppealedStatusChange,
    countData,
    statusLoading
  } = props

  const list = fp.get(['data', 'resumes'], data)
  const listLoading = fp.get('loading', data)
  const vacancy = fp.get(['data', 'vacancy'], data)
  const vacancyTitle = fp.get('title', vacancy)
  const countLoading = fp.get('loading', countData)
  const countAll = fp.get(['data', 'all'], countData)
  const countRejected = fp.get(['data', 'rejected'], countData)
  const countViewed = fp.get(['data', 'viewed'], countData)
  const countAccepted = fp.get(['data', 'accepted'], countData)

  const loading = listLoading || countLoading || statusLoading

  const [btnLoading, setBtnLoading] = useState(null)
  const [selected, setSelected] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const isDefaultStatus = status => status === 'requested'

  const onChange = fp.curryRight((event, label) => {
    const checked = event.target.checked
    if (label === 'all') {
      if (checked) {
        return setSelected(
          fp.flow(
            fp.map(item => {
              return isDefaultStatus(item.status) ? item.resume.id : null
            }),
            fp.filter(item => item)
          )(list)
        )
      }

      if (!checked) return setSelected([])
    }
    if (checked) {
      return setSelected(fp.union([label], selected))
    }
    return setSelected(fp.filter(v => v !== label, selected))
  })

  const changeStatus = fp.curryRight((ev, status, resumes) => {
    setBtnLoading(status)
    if (fp.isArray(resumes)) {
      return onAppealedStatusChange({ id: vacancy.id, data: { status, resumes } })
    }
    return onAppealedStatusChange({ id: vacancy.id, data: { status, resumes: [resumes] } })
  })

  const indeterminate = !fp.isEmpty(selected) && !fp.isEqual(fp.size(list), fp.size(selected))
  const allChecked = fp.isEqual(fp.size(list), fp.size(selected))
  const showActions = indeterminate || allChecked

  const filteredList = fp.flow(
    fp.filter(item => {
      if (activeTab === 'all') return true
      return fp.get('status', item) === activeTab
    }),
    fp.filter(item => {
      const title = fp.get(['resume', 'title'], item)
      return fp.includes(search, fp.toLower(title))
    })
  )(list)

  const tabs = [
    { key: 'all', title: 'emp_vacancy_appeal_all', count: countAll },
    { key: 'viewed', title: 'emp_vacancy_appeal_viewed', count: countViewed },
    { key: 'accepted', title: 'emp_vacancy_appeal_accepted', count: countAccepted },
    { key: 'rejected', title: 'emp_vacancy_appeal_rejected', count: countRejected }
  ]

  return (
    <div>
      <Title
        medium={true}
        text={<span><T>emp_vacancy_appeals</T> <span style={{ color: MAIN_COLOR }}>«{vacancyTitle}»</span></span>}
      />
      <div className={classes.chipWrap}>
        {fp.map(item => {
          const key = fp.get('key', item)
          const title = fp.get('title', item)
          const count = fp.getOr(ZERO, 'count', item)
          const isActive = activeTab === key
          return (
            <span
              key={key}
              onClick={() => {
                setSelected([])
                setSearch('')
                setActiveTab(key)
              }}
              className={classNames(classes.chip, {
                [classes.chipMain]: isActive,
                [classes.chipDisabled]: count === ZERO
              })}>
              <T>{title}</T> <span>({count})</span>
            </span>
          )
        }, tabs)}
      </div>
      <div className={classes.resumeWrap}>
        <div className={classes.headerActions}>
          <CheckBox onChange={onChange('all')} {...{ indeterminate, checked: allChecked }}/>
          <span style={{ transition: 'all 300ms' }} className={classNames({
            [classes.turnOff]: !showActions,
            [classes.turnOn]: showActions
          })}>
            <Button
              type={'small'}
              color={COLD}
              text={'button_consider'}
              loading={loading && btnLoading === 'viewed'}
              onClick={changeStatus('viewed', selected)}/>
            <Button
              type={'small'}
              color={APPEAL}
              text={'button_invite'}
              loading={loading && btnLoading === 'accepted'}
              onClick={changeStatus('accepted', selected)}/>
            <Button
              type={'small'}
              color={REGRET}
              text={'button_reject'}
              loading={loading && btnLoading === 'rejected'}
              onClick={changeStatus('rejected', selected)}/>
          </span>
          <div className={classNames({
            [classes.turnOff]: showActions,
            [classes.turnOn]: !showActions
          })}>
            <SearchField
              type={'appeal'}
              value={search}
              onChange={({ value }) => setSearch(fp.toLower(value))}
            />
          </div>
        </div>
        <div className={classes.itemsWrap}>
          {fp.map(item => {
            const date = fp.get('modifiedDate', item)
            const resumeId = fp.get(['resume', 'id'], item)
            const resume = fp.get('resume', item)
            const status = fp.get('status', item)
            const checked = fp.includes(resume.id, selected)
            const isNew = fp.get('isNew', item)
            return (
              <div className={classes.resumeItem} key={resumeId}>
                {isDefaultStatus(status) && (
                  <CheckBox
                    checked={checked}
                    onChange={onChange(resumeId)}
                  />
                )}
                <ResumeCard
                  data={{ ...resume, date, status }}
                  style={{
                    background: isNew ? '#e8f0ff' : 'white',
                    minHeight: '128px',
                    width: 'calc(100% - 280px)'
                  }}
                />
                {(!showActions && status !== 'accepted') && (
                  <div className={classes.itemAction}>
                    {status !== 'viewed' && (
                      <div>
                        <Button
                          style={btnStyle}
                          rounded={true}
                          type={'small'}
                          color={COLD}
                          text={'button_consider'}
                          loading={loading && btnLoading === 'viewed'}
                          onClick={changeStatus('viewed', resumeId)}/>
                      </div>
                    )}
                    {status !== 'accepted' && (
                      <div>
                        <Button
                          style={btnStyle}
                          rounded={true}
                          type={'small'}
                          color={APPEAL}
                          text={'button_invite'}
                          loading={loading && btnLoading === 'accepted'}
                          onClick={changeStatus('accepted', resumeId)}/>
                      </div>
                    )}
                    {status !== 'rejected' && (
                      <div>
                        <Button
                          style={btnStyle}
                          rounded={true}
                          type={'small'}
                          color={REGRET}
                          text={'button_reject'}
                          loading={loading && btnLoading === 'rejected'}
                          onClick={changeStatus('rejected', resumeId)}/>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          }, filteredList)}
        </div>
      </div>

    </div>
  )
}

VacancyAppeals.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  onAppealedStatusChange: PropTypes.func,
  countData: PropTypes.object,
  statusLoading: PropTypes.bool
}

export default enhance(VacancyAppeals)

