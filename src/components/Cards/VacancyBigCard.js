import _ from 'lodash'
import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import sprintf from 'sprintf'
import { compose, withState, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  ANCHOR_DISABLED,
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle,
  GREY_BORDER_STYLE,
  PRIMARY_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import { connect } from 'react-redux'
import { getFormValues, reset } from 'redux-form'
import { VACANCY_ITEM } from 'constants/routes'
import dateFormat from 'helpers/dateFormat'
import hexToRgb from 'helpers/hexToRgb'
import withHistory from 'helpers/withHistory'
import { getOnlyString, getVacancySalary } from 'helpers/get'
import {
  vacancyFavDelete,
  vacancyFavCreate,
  vacancyAppealCreate
} from 'routes/vacancy-details/actions'
import Image from 'images/myjob.png'
import IoMdTrash from 'react-icons/lib/io/ios-trash-outline'
import TiPencil from 'react-icons/lib/ti/pencil'
import { Button, GREY, FavTextButton } from 'components/Button'
import T from 'components/T'
import TW from 'components/TW'
import CompanyName from './CompanyName'
import CompanyAddress from './CompanyAddress'
import AppealDialog from 'routes/vacancy-details/AppealDialog'

const mapStateToProps = state => ({
  appealFormValues: getFormValues('AppealForm')(state),
  isAuth: Boolean(fp.get(['login', 'data', 'token'], state)),
  isEmployer: fp.get(['user', 'data', 'userType'], state) === 'employer'
})

const YELLOW_COLOR = '#FFC739'
const enhance = compose(
  withHistory,
  connect(mapStateToProps, {
    reset,
    vacancyFavDelete,
    vacancyFavCreate,
    vacancyAppealCreate
  }),
  withState('openAppeal', 'setOpenAppeal', false),
  withHandlers({
    handleAppeal: props => () => {
      const { data, appealFormValues, setOpenAppeal } = props
      const vacancy = _.get(data, 'id')
      const questions = _.get(data, 'questions')
      return props.vacancyAppealCreate(vacancy, appealFormValues, questions)
        .then(() => setOpenAppeal(false))
    }
  }),
  injectSheet({
    vacancy: {
      ...ANCHOR_DISABLED,
      backgroundColor: '#fff',
      border: GREY_BORDER_STYLE,
      borderRadius: '4px',
      color: BLACK_COLOR,
      cursor: 'pointer',
      display: 'block',
      marginBottom: '20px',
      padding: '20px 22px',
      position: 'relative',
      textDecoration: 'none !important',
      '& header, & footer': {
        ...fallbacksStyle('display', 'flex'),
        ...crossBrowserify('alignItems', 'center'),
        ...crossBrowserify('justifyContent', 'space-between')
      },
      '& $checkIcon': {
        color: PRIMARY_COLOR
      }
    },
    pinnedVacancy: {
      background: '#fafafb',
      borderColor: '#AFBBD3',
      '& $appealButton': {
        border: '1px solid #CBD0D8'
      }
    },
    premiumVacancy: {
      background: hexToRgb(YELLOW_COLOR, '0.04'),
      borderColor: YELLOW_COLOR,
      position: 'relative',
      '& $appealButton': {
        background: '#FFD367',
        '&:hover': {
          background: '#FFC739'
        }
      }
    },
    premium: {
      ...crossBrowserify('borderRadius', '4px'),
      ...crossBrowserify('transform', 'translate(50%, -50%) rotate(-90deg)'),
      background: '#FFC739',
      fontSize: '12px',
      fontWeight: 'normal',
      lineHeight: '18px',
      padding: '0 10px',
      position: 'absolute',
      top: '50%',
      right: '9px'
    },
    vacancyTitle: {
      maxHeight: '1.38em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: 'calc(100% - 200px)',
      textOverflow: 'ellipsis',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '1.38',
      '& a': ANCHOR_DISABLED
    },
    vacancySalary: {
      fontWeight: '500'
    },
    vacancyInfo: {
      margin: '15px 0'
    },
    vacancyCompany: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center')
    },
    vacancyCompanyPhoto: {
      backgroundColor: '#efefef',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid #cbd0d8',
      borderRadius: '4px',
      height: '56px',
      minWidth: '56px',
      width: '56px'
    },
    vacancyCompanyInfo: {
      fontSize: '13px',
      lineHeight: 'normal',
      marginLeft: '12px'
    },
    companyName: {
      marginBottom: '10px'
    },
    vacancyCompanyName: {
      fontSize: '13px',
      textDecoration: 'underline',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      marginBottom: '11px'
    },
    vacancyCompanyComment: {
      fontSize: '13px',
      fontWeight: '300',
      lineHeight: '1.62',
      maxHeight: '3.24em',
      overflow: 'hidden',
      marginTop: '17px',
      color: hexToRgb(BLACK_COLOR, '0.7')
    },
    vacancyActions: {
      ...fallbacksStyle('display', 'flex')
    },
    vacancyButton: {
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
    vacancyDate: {
      fontSize: '13px',
      color: hexToRgb(BLACK_COLOR, '0.4')
    },
    checkIcon: {
      width: '17px',
      height: '17px',
      marginLeft: '5px'
    },
    noBorder: {
      border: 'none'
    },
    appealButton: {
      marginRight: '10px'
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

const iconStyle = {
  width: '20px',
  height: '25px'
}

const VacancyBigCard = props => {
  const {
    history,
    classes,
    isAuth,
    isEmployer,
    smooth,
    marginBottom,
    noBorder,
    custom,
    data,
    ...rest
  } = props

  const name = _.get(data, 'title')
  const id = _.get(data, 'id')
  const isFav = _.get(data, 'isFavorite')
  const appealStatus = _.get(data, 'appealStatus')
  const questions = _.get(data, 'questions')

  const photo = _.get(data, 'owner.logo.file') || Image
  const desc = getOnlyString(_.get(data, 'duties'))
  const createdDate = _.get(data, 'publicationDate')

  const salaryCurrency = _.get(data, 'currency.name')
  const salaryFrom = _.get(data, 'salaryFrom')
  const salaryTo = _.get(data, 'salaryTo')
  const isHighlighted = _.get(data, 'isHighlighted')
  const isPremium = _.get(data, 'isPremium')
  const salary = getVacancySalary(salaryFrom, salaryTo, salaryCurrency, 'main_vacancy_salary_no')
  const companyId = _.get(data, ['owner', 'id'])
  const companyName = _.get(data, ['owner', 'title'])
  const companyIsApproved = _.get(data, ['owner', 'generalStatus']) === 'moderated'
  const region = _.get(data, ['place', 'name'])
  const [isFavorite, setFavorite] = useState(isFav)

  const onOpenLoginDialog = () => {
    history.replace({
      pathname: history.location.pathname,
      search: history.location.search,
      state: { openLoginDialog: true }
    })
    return Promise.resolve({})
  }

  const onOpenAppealDialog = () => {
    rest.reset('AppealForm')
    rest.setOpenAppeal(true)
  }

  return (
    <div
      onClick={() => history.push(sprintf(VACANCY_ITEM, id), smooth)}
      className={classNames({
        [classes.vacancy]: true,
        [classes.pinnedVacancy]: isHighlighted && !isPremium,
        [classes.premiumVacancy]: isPremium,
        [classes.marginBottom]: marginBottom,
        [classes.noBorder]: noBorder
      })}>
      {isPremium && <span className={classes.premium}><T>serv_premium_vacancy_shor</T></span>}
      <header>
        <div className={classes.vacancyTitle}>
          {name}
        </div>
        <div className={classes.vacancySalary}>{salary}</div>
      </header>
      <div className={classes.vacancyInfo}>
        <div className={classes.vacancyCompany}>
          <div className={classes.vacancyCompanyPhoto} style={{ backgroundImage: `url(${photo})` }}/>
          <div className={classes.vacancyCompanyInfo}>
            <CompanyName
              id={companyId}
              className={classes.companyName}
              isApproved={companyIsApproved}
              name={companyName}
            />
            <CompanyAddress name={region}/>
          </div>
        </div>
        <div className={classes.vacancyCompanyComment}>{desc}</div>
      </div>
      <footer onClick={event => event.stopPropagation()}>
        {custom
          ? <div className={classes.vacancyActions}>
            <div className={classNames(classes.vacancyButton, classes.primaryBtn)}>
              <T>vacancy_promotion</T>
            </div>
            <div className={classes.vacancyButton}>
              <TiPencil style={iconStyle}/>
              <T>main_global_edit</T>
            </div>
            <div className={classes.vacancyButton}>
              <IoMdTrash style={iconStyle}/>
              <T>button_simple_del</T>
            </div>
          </div>
          : isEmployer
            ? <div/>
            : (
              <div className={classes.vacancyActions}>
                <Button
                  text={appealStatus ? 'button_respond_already' : 'button_respond'}
                  className={classes.appealButton}
                  type={'small'}
                  color={GREY}
                  disabled={Boolean(appealStatus)}
                  onClick={isAuth ? onOpenAppealDialog : onOpenLoginDialog}
                />
                <FavTextButton
                  id={id}
                  isFavorite={isFavorite}
                  onSuccess={setFavorite}
                  onAdd={rest.vacancyFavCreate}
                  onRemove={rest.vacancyFavDelete}
                  onClick={isAuth ? null : onOpenLoginDialog}
                />
              </div>
            )}
        <div className={classes.vacancyDate}>
          <TW>
            {(lang) => dateFormat(createdDate, false, lang)}
          </TW>
        </div>
      </footer>

      <AppealDialog
        open={rest.openAppeal}
        onClose={() => rest.setOpenAppeal(false)}
        onAppeal={rest.handleAppeal}
        questions={questions}
      />
    </div>
  )
}

VacancyBigCard.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  isAuth: PropTypes.bool,
  isEmployer: PropTypes.bool,
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['new', 'top']),
  marginBottom: PropTypes.bool,
  noBorder: PropTypes.bool,
  custom: PropTypes.bool,
  smooth: PropTypes.bool
}

export default enhance(VacancyBigCard)
