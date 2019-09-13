import React, { useRef, useEffect } from 'react'
import loDebounce from 'lodash/debounce'
import injectSheet from 'react-jss'
import fp from 'lodash/fp'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  FIELD_BORDER_COLOR,
  LABEL_COLOR
} from 'constants/styles'
import { APPLICANT_STATUSES } from 'constants/backend'
import { USER_SETTING_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import { getAgeFromDate } from 'helpers/get'
import { getTranslate } from 'helpers/translate'
import numberFormat from 'helpers/numberFormat'
import Settings from 'icons/Settings'
import T from 'components/T'
import TW from 'components/TW'
import CardRating from 'components/Cards/CardRating'
import ProfilePic from 'components/ProfilePic/ProfilePic'

const POSITIVE_TOP = 110
const PARENT_BOTTOM = 600
const DEBOUNCE = 200
const ZERO = -1

const NAV_HEIGHT = 131
const MARGIN_TOP = 20

const changePosition = loDebounce((parent, card) => {
  const elem = card.current
  const parentEl = parent.current
  const parentOffSet = parentEl ? parentEl.getBoundingClientRect() : {}
  const parentTop = parentOffSet.top
  const parentBottom = parentOffSet.bottom
  if (parentTop < POSITIVE_TOP && parentBottom > PARENT_BOTTOM) {
    if (parentTop > ZERO) {
      elem.style.top = `${POSITIVE_TOP - parentTop}px`
    } else {
      elem.style.top = `${Math.abs(parentTop) + MARGIN_TOP + NAV_HEIGHT}px`
    }
  } else if (parentTop > POSITIVE_TOP) {
    elem.style.top = '0'
  } else if (parentBottom < PARENT_BOTTOM) {
    elem.style.top = `${parentEl.clientHeight - elem.clientHeight}px`
  }
}, DEBOUNCE)

const enhance = compose(
  injectSheet({
    infoWrapper: {
      minWidth: '320px',
      width: '320px',
      position: 'relative',
      marginTop: '40px',
      marginRight: '30px',
      minHeight: '380px'
    },
    cardWrapper: {
      transition: 'all 700ms',
      position: 'absolute',
      top: '0',
      left: '0',
      padding: '30px 35px 18px',
      width: '100%',
      borderRadius: '4px',
      background: '#f9fafb'
    },
    header: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      '& svg': {
        color: LABEL_COLOR,
        cursor: 'pointer',
        display: 'block',
        fontSize: '26px'
      }
    },
    name: {
      marginTop: '10px',
      marginBottom: '8px',
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '1.22'
    },
    age: {
      color: '#a1a7b3',
      lineHeight: '1.57',
      fontWeight: '500',
      fontSize: '14px',
      marginLeft: '5px'
    },
    prof: {
      lineHeight: '1.57',
      margin: '7px 0'
    },
    block: {
      marginTop: '14px',
      padding: '7px 0 0',
      borderTop: '1px solid',
      borderColor: hexToRgb(FIELD_BORDER_COLOR, '0.3'),
      '& div': {
        lineHeight: '1.57',
        margin: '7px 0'
      }
    },
    label: {
      color: '#a1a7b3'
    },
    field: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      fontWeight: '500',
      '& span': {
        color: MAIN_COLOR,
        cursor: 'pointer'
      }
    }
  })
)

const UserInfoCard = props => {
  const { classes, data, history } = props

  const toSettingsPage = () => history.push(USER_SETTING_URL)

  const name = fp.get('fullName', data)
  const balance = numberFormat(fp.get('balance', data), 'сум')
  const phone = fp.get('phone', data)
  const livingPlace = fp.get('livingPlace', data)
  const rating = fp.get('rating', data)
  const birthdate = fp.get('birthdate', data)
  const searchWorkStatus = fp.flow(fp.get('searchWorkStatus.id'), fp.toString)(data)
  const applicantStatus = fp.flow(
    fp.find({ id: searchWorkStatus }),
    fp.get('name')
  )(APPLICANT_STATUSES)
  const email = fp.get('email', data)
  const photo = fp.get('photo.file', data)

  const parentWrapperRef = useRef(null)
  const cardWrapperRef = useRef(null)

  const onScroll = () => changePosition(parentWrapperRef, cardWrapperRef)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={parentWrapperRef} className={classes.infoWrapper}>
      <div ref={cardWrapperRef} className={classes.cardWrapper}>
        <div className={classes.header}>
          <ProfilePic type={'mini'} image={photo}/>
          <Settings onClick={toSettingsPage}/>
        </div>
        <div className={classes.name}>
          {name}
          <span className={classes.age}>
            (<TW>{lang => getAgeFromDate(birthdate, lang)}</TW>)
          </span>
        </div>
        <CardRating rating={rating}/>
        <div className={classes.block}>
          <div>
            <TW>{lang => getTranslate(livingPlace, lang)}</TW>
          </div>
          <div>{phone}</div>
          <div>{email}</div>
        </div>
        <div className={classes.block}>
          <div className={classes.label}><T>emp_status_title</T></div>
          <div className={classes.field}>
            <T>{applicantStatus}</T>
            <span onClick={toSettingsPage}><T>button_simple_edit</T></span>
          </div>
        </div>
        <div className={classes.block}>
          <div className={classes.label}><T>main_balance</T></div>
          <div className={classes.field}>
            {balance}
            <span><T>applicant_replenish</T></span>
          </div>
        </div>
      </div>
    </div>
  )
}
UserInfoCard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object.isRequired
}
export default enhance(UserInfoCard)
