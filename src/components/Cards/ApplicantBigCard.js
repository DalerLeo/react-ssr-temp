import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import sprintf from 'sprintf'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  ANCHOR_DISABLED,
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle,
  GREY_BORDER_STYLE,
  PRIMARY_BORDER,
  PRIMARY_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import { RESUME_ITEM } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import {
  getOnlyString,
  getSalaryCurrency,
  getExperience,
  getAgeFromDate
} from 'helpers/get'
import dateFormat from 'helpers/dateFormat'
import withHistory from 'helpers/withHistory'
import t, { getTranslate } from 'helpers/translate'
import Message from 'icons/Message'
import Link from 'components/Link'
import { Button, GREY, FavTextButton } from 'components/Button'
import ProfilePic from 'components/ProfilePic'
import T from 'components/T'
import TW from 'components/TW'
import CardRating from './CardRating'

const mapStateToProps = state => ({
  isAuth: Boolean(fp.get(['login', 'data', 'token'], state))
})

const enhance = compose(
  withHistory,
  connect(mapStateToProps),
  injectSheet({
    applicant: {
      backgroundColor: '#fff',
      border: GREY_BORDER_STYLE,
      borderRadius: '4px',
      color: BLACK_COLOR,
      display: 'block',
      marginBottom: '20px',
      padding: '18px 22px 20px',
      position: 'relative',
      ...ANCHOR_DISABLED,
      '& header, & footer': {
        ...fallbacksStyle('display', 'flex'),
        ...crossBrowserify('alignItems', 'center'),
        ...crossBrowserify('justifyContent', 'space-between')
      },
      '& $checkIcon': {
        color: PRIMARY_COLOR
      }
    },
    topVacancy: {
      background: PRIMARY_COLOR,
      color: WHITE_COLOR,
      '& $applicantButton': {
        background: 'transparent',
        border: `1px solid ${WHITE_COLOR}`,
        color: WHITE_COLOR
      },
      '& $checkIcon': {
        color: WHITE_COLOR
      }
    },
    borderVacancy: {
      border: '1.5px solid' + PRIMARY_BORDER
    },
    applicantTitle: {
      maxHeight: '1.38em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: 'calc(100% - 200px)',
      textOverflow: 'ellipsis',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '1.38'
    },
    applicantSalary: {
      fontSize: '14px',
      lineHeight: '1.57',
      fontWeight: '500'
    },
    applicantInfo: {
      margin: '15px 0'
    },
    applicantCompany: {
      ...fallbacksStyle('display', 'flex')
    },
    applicantCompanyInfo: {
      lineHeight: '22px',
      marginLeft: '10px'
    },

    desc: {
      overflow: 'hidden',
      fontSize: '13px',
      '& span': {
        marginRight: '10px'
      }
    },
    rating: {
      position: 'absolute',
      right: '25px',
      top: '56px'
    },
    applicantDesc: {
      fontSize: '13px',
      lineHeight: '1.62',
      maxHeight: '3.24em',
      overflow: 'hidden',
      marginTop: '18px',
      marginBottom: '20px',
      color: hexToRgb(BLACK_COLOR, '0.7')
    },
    applicantActions: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      '& > button, span': { marginRight: '10px' }
    },
    applicantButton: {
      border: '1px #ececec solid',
      borderRadius: '4px',
      color: '#656565',
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '11px',
      padding: '0 9px',
      lineHeight: '34px',
      verticalAlign: 'top',
      marginLeft: '10px'
    },
    applicantDate: {
      fontSize: '13px',
      color: hexToRgb(BLACK_COLOR, '0.4')
    },
    checkIcon: {
      width: '17px',
      height: '17px',
      marginLeft: '5px'
    },
    primaryBtn: {
      background: PRIMARY_COLOR,
      color: WHITE_COLOR
    },
    marginBottom: {
      marginBottom: '20px'
    }
  })
)

const ApplicantBigCard = props => {
  const {
    data,
    history,
    classes,
    isAuth,
    smooth,
    marginBottom,
    interviewBtn,
    favBtn,
    msgCount,
    onOpenInterview
  } = props

  const name = fp.get('title', data)
  const id = fp.get('id', data)
  const photo = fp.get('owner.photo.file', data)
  const isFav = fp.get('isFavorite', data)
  const isInvited = fp.get('isInvited', data)
  const modifiedDate = fp.get('modifiedDate', data)
  const rating = fp.get('owner.rating', data)
  const birthdate = fp.get('owner.birthdate', data)
  const livingPlace = fp.get('owner.livingPlace', data)
  const commentCount = fp.get('commentCount', data)
  const exp = fp.get('workExperience', data)
  const desc = getOnlyString(fp.get('additionalInfo', data))
  const minSalary = getSalaryCurrency(data)
  const wishedIndustry = fp.get('wishedIndustriesParent', data)
  const [isFavorite, setFavorite] = useState(isFav)

  const onOpenLoginDialog = () => {
    history.replace({
      pathname: history.location.pathname,
      search: history.location.search,
      state: { openLoginDialog: true }
    })
  }

  return (
    <div
      className={classNames({
        [classes.applicant]: true,
        [classes.marginBottom]: marginBottom
      })}>
      <Link to={sprintf(RESUME_ITEM, id)} smooth={smooth} absolute={true}/>
      <header>
        <div className={classes.applicantTitle}>
          {name}
        </div>
        <div className={classes.applicantSalary}>
          <TW>{lang => minSalary || t('main_resume_salary_no', lang)}</TW>
        </div>
      </header>
      <div className={classes.applicantInfo}>
        <div className={classes.applicantCompany}>
          <ProfilePic image={photo} type={'xs'}/>
          <div className={classes.applicantCompanyInfo}>
            <CardRating rating={rating} className={classes.rating}/>
            <div className={classes.desc}><T>main_work_experience</T>: <TW>
              {lang => getExperience(exp, lang)}
            </TW></div>
            <div className={classes.desc}><T>resume_job_area</T>: <TW>
              {lang => getTranslate(wishedIndustry, lang) || t('common_not_specified_a', lang)}
            </TW></div>
            <div className={classes.desc}>
              <span>
                <T>main_age</T>: <TW>{lang => getAgeFromDate(birthdate, lang)}</TW>
              </span>
              {livingPlace &&
              <span>
                <T>resume_city</T>: <TW>
                  {lang => getTranslate(livingPlace, lang)}
                </TW>
              </span>}
            </div>
          </div>
        </div>
        <div className={classes.applicantDesc}>{desc}</div>
      </div>
      <footer>
        <div className={classes.applicantActions}>
          {interviewBtn && (
            <Button
              type={'small'}
              color={GREY}
              disabled={isInvited}
              text={isInvited ? 'button_is_invited' : 'button_to_invite'}
              onClick={() => onOpenInterview(id)}
            />
          )}

          {favBtn && (
            <FavTextButton
              id={id}
              isFavorite={isFavorite}
              onSuccess={setFavorite}
              onAdd={() => null}
              onRemove={() => null}
              onClick={isAuth ? null : onOpenLoginDialog}
            />
          )}
          {msgCount && isAuth && (
            <span style={{ fontSize: '13px' }}>
              <Message/> {commentCount}
            </span>
          )}
        </div>
        <div className={classes.applicantDate}>
          <T>main_update_date</T>: <TW>
            {lang => dateFormat(modifiedDate, false, lang)}
          </TW></div>
      </footer>
    </div>
  )
}

ApplicantBigCard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isAuth: PropTypes.bool,
  data: PropTypes.object.isRequired,
  marginBottom: PropTypes.bool,
  interviewBtn: PropTypes.bool,
  resumeFavCreate: PropTypes.func,
  resumeFavDelete: PropTypes.func,
  favBtn: PropTypes.bool,
  smooth: PropTypes.bool,
  msgCount: PropTypes.bool,
  onOpenInterview: PropTypes.func
}

export default enhance(ApplicantBigCard)
