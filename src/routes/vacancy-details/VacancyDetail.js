import React from 'react'
import ReactDOMServer from 'react-dom/server.browser'
import PropTypes from 'prop-types'
import loGet from 'lodash/get'
import loFilter from 'lodash/filter'
import loReplace from 'lodash/replace'
import fp from 'lodash/fp'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle,
  DATE_COLOR,
  FIELD_BORDER_STYLE_OPACITY,
  LIGHT_GREY_BORDER_STYLE,
  ROLL_UP_FADE_IN
} from 'constants/styles'
import {
  getEmpTypeValue,
  getExpValue,
  COMP_LITERACY,
  EDUCATION,
  GENDER,
  LANG_LEVEL,
  BONUS_LIST
} from 'constants/backend'
import {
  getVacancySalary,
  isApplicant,
  isEmployer,
  arrayObjToObj
} from 'helpers/get'
import t, { getTranslate } from 'helpers/translate'
import T from 'components/T'
import TW from 'components/TW'
import { SideBanner } from 'components/Banners'
import HtmlContent from 'components/HtmlContent'
import Container from 'components/Container'
import Title from 'components/Title'
import CompanyName from 'components/Cards/CompanyName'
import CompanyAddress from 'components/Cards/CompanyAddress'
import Vacancies from 'components/HomePage/Vacancies'
import ProfilePic from 'components/ProfilePic'
import { Button } from 'components/Button'
import dateFormat from 'helpers/dateFormat'
import FavButton from 'components/Button/FavButton'
import SectionList from './SectionList'
import RenderOrNull from 'components/Utils/RenderOrNull'
import AppealDialog from './AppealDialog'

const enhance = compose(
  injectSheet({
    ...ROLL_UP_FADE_IN,
    container: {
      ...fallbacksStyle('display', 'flex'),
      marginTop: '50px'
    },
    wrapper: {
      ...fallbacksStyle('flexGrow', '1'),
      animationName: 'rollUpFadeIn',
      animationDuration: '1s',
      marginRight: '50px',
      paddingBottom: '75px'
    },
    header: {
      position: 'relative',
      paddingBottom: '25px'
    },
    salary: {
      lineHeight: '1.38',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '18px'
    },
    flex: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between')
    },
    flexStart: {
      extend: 'flex',
      ...crossBrowserify('alignItems', 'unset')
    },
    titleWrap: {
      marginBottom: '18px'
    },
    date: {
      color: DATE_COLOR
    },
    topButtons: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      marginTop: '32px'
    },
    topButtonsAppealed: {
      '& > div, & > button': {
        order: '2'
      },
      '& > div:last-child': {
        order: '1',
        marginLeft: '0',
        marginRight: '10px'
      }
    },
    appealStatus: {
      fontSize: '13px',
      margin: '0 10px'
    },
    shortInfo: fallbacksStyle('display', 'flex'),
    shortItem: {
      borderRight: LIGHT_GREY_BORDER_STYLE,
      paddingRight: '40px',
      marginRight: '40px',
      '&:last-child': { borderRight: 'none' }
    },
    shortDesc: {
      fontSize: '15px',
      lineHeight: '1.47'
    },
    shortLabel: {
      extend: 'shortDesc',
      color: '#9f9f9f',
      marginBottom: '6px'
    },
    content: {
      borderTop: FIELD_BORDER_STYLE_OPACITY,
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      padding: '30px 0 40px',
      marginBottom: '35px'
    },
    section: {
      lineHeight: '25px',
      '& > div': {
        marginTop: '30px'
      }
    },
    addInfo: {
      fontSize: '15px',
      lineHeight: '1.67'
    },
    important: {
      extend: 'addInfo',
      fontWeight: '500'

    },
    btnWrap: {
      marginTop: '35px'
    },
    btn: {
      padding: '0 63px'
    },
    btnInfo: {
      display: 'inline-block',
      color: '#9a9a9a',
      lineHeight: '45px',
      marginLeft: '16px'
    }
  })
)

const reqStyle = {
  color: '#9F9F9F',
  fontWeight: '500'
}

const getClearMarkup = (content) => {
  return loReplace(content, '<p>&nbsp;</p>', '')
}

const appealStatuses = {
  'requested': 'applicant_vacancy_appeal_requested',
  'viewed': 'applicant_vacancy_appeal_viewed',
  'accepted': 'applicant_vacancy_appeal_accepted',
  'rejected': 'applicant_vacancy_appeal_rejected'
}

const VacancyDetail = props => {
  const {
    classes,
    userData,
    vacancyDetail,
    vacancyList,
    appealOpen,
    setAppealOpen,
    onAppeal,
    onFav,
    favLoading,
    history
  } = props
  // .const loading = loGet(vacancyDetail, 'loading')

  const canSeeButtons = !isEmployer(userData)
  const canInteractButtons = isApplicant(userData)

  const onAppealClose = () => {
    setAppealOpen(false)
  }
  const onAppealOpen = () => {
    setAppealOpen(true)
  }

  const onOpenLoginDialog = () => {
    history.replace(history.location.pathname, {
      openLoginDialog: true
    })
  }

  const data = loGet(vacancyDetail, 'data')
  const loading = loGet(vacancyDetail, 'loading')

  const bonusesList = arrayObjToObj(BONUS_LIST)

  const title = loGet(data, 'title')
  const owner = loGet(data, 'owner.title')
  const companyId = loGet(data, 'owner.id')
  const industry = loGet(data, 'industry')
  const companyIsApproved = loGet(data, 'owner.generalStatus') === 'moderated'
  const currency = loGet(data, 'currency.name')
  const duties = loGet(data, 'duties')
  const photo = loGet(data, 'owner.logo.file')
  const exp = getExpValue(loGet(data, 'experience'))
  const requirement = loGet(data, 'requirements')
  const questions = loGet(data, 'questions')
  const empType = getEmpTypeValue(loGet(data, 'employmentType'))
  const age = loGet(data, 'age')
  const addInfo = loGet(data, 'additionalInformation')
  const computerKnowledge = loGet(data, 'computerKnowledge')
  const bonus = loGet(data, 'bonus')
  const pubDate = dateFormat(loGet(data, 'publicationDate'))
  const place = loGet(data, 'place')
  const driverLicences = fp.flow(
    fp.get('driverLicences'),
    fp.map(fp.get('title')),
    fp.join(', ')
  )(data)
  const gender = GENDER[loGet(data, 'gender')]
  const educationLevel = EDUCATION[loGet(data, 'educationLevel')]
  const salaryFrom = loGet(data, 'salaryFrom')
  const salaryTo = loGet(data, 'salaryTo')
  const isFavorite = loGet(data, 'isFavorite')
  const salaryFromTo = getVacancySalary(salaryFrom, salaryTo, currency, 'main_vacancy_salary_no')
  const appealStatus = loGet(appealStatuses, loGet(data, 'appealStatus'))

  const languageRequirements = loGet(data, 'languageRequirements')
  const languages = (
    <TW>
      {language => fp.flow(
        fp.map(lang => {
          const langName = fp.get('language.name', lang)
          const langLevel = LANG_LEVEL[fp.get('level', lang)]
          return `${langName} (${t(langLevel, language)})`
        }),
        fp.join(', ')
      )(languageRequirements)}
    </TW>
  )

  const bonusArray = fp.flow(
    fp.split('-'),
    fp.map(item => fp.get(item, bonusesList)),
    fp.filter(item => item)
  )(bonus)
  const bonuses = ReactDOMServer.renderToStaticMarkup(
    <ul>
      {fp.map(item => <li key={item}>{item}</li>, bonusArray)}
    </ul>
  )
  const compLiteracyLevel = COMP_LITERACY[loGet(data, 'compLiteracyLevel')]

  const reqList = [
    <RenderOrNull value={empType}>
      <span style={reqStyle}><T>main_schedule</T></span> - <T>{empType}</T>
    </RenderOrNull>,
    <RenderOrNull value={gender}>
      <span style={reqStyle}><T>main_sex</T></span> - <T>{gender}</T>
    </RenderOrNull>,
    <RenderOrNull value={age}>
      <span style={reqStyle}><T>main_age</T></span> - {age}
    </RenderOrNull>,
    <RenderOrNull value={educationLevel}>
      <span style={reqStyle}><T>main_education</T></span> - <T>{educationLevel}</T>
    </RenderOrNull>,
    <RenderOrNull value={languageRequirements}>
      <span style={reqStyle}><T>main_language_knowledge</T></span> - {languages}
    </RenderOrNull>,
    <RenderOrNull value={compLiteracyLevel}>
      <span style={reqStyle}><T>main_pc_knowledge</T></span> - <T>{compLiteracyLevel}</T>
    </RenderOrNull>,
    <RenderOrNull value={computerKnowledge}>
      <span style={reqStyle}><T>resume_programm_knowledge</T></span> - {computerKnowledge}
    </RenderOrNull>,
    <RenderOrNull value={driverLicences}>
      <span style={reqStyle}><T>main_driver_license</T></span> - {driverLicences}
    </RenderOrNull>,
    <RenderOrNull value={requirement}>
      <span style={reqStyle}><T>main_additional_requirements</T>:</span>
      <HtmlContent lineHeight={25}>{getClearMarkup(requirement)}</HtmlContent>
    </RenderOrNull>
  ]
  return (
    <Container className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classNames(classes.flex, classes.titleWrap)}>
            <Title margin={'0'} text={title}/>
            <div className={classes.date}><T>main_published_date</T> {pubDate}</div>
          </div>

          <div className={classes.flexStart}>
            <div>
              <div className={classes.salary}>{salaryFromTo}</div>
              <CompanyName
                id={companyId}
                fontSize={14}
                name={owner}
                isApproved={companyIsApproved}
              />
              <TW>
                {lang => (
                  <CompanyAddress style={{ margin: '14px 0 32px' }} name={getTranslate(place, lang)}/>
                )}
              </TW>
              {canSeeButtons &&
              <div className={classNames(classes.topButtons, {
                [classes.topButtonsAppealed]: appealStatus
              })}>
                <Button
                  type={'small'}
                  text={appealStatus ? 'button_respond_already' : 'button_respond'}
                  disabled={Boolean(appealStatus)}
                  onClick={canInteractButtons ? onAppealOpen : onOpenLoginDialog}
                />
                {appealStatus &&
                <div className={classes.appealStatus}>
                  <div><T>emp_status_title</T>:</div>
                  <div><T>{appealStatus}</T></div>
                </div>}
                <FavButton
                  isFav={isFavorite}
                  loading={loading || favLoading}
                  onClick={canInteractButtons ? onFav : onOpenLoginDialog}
                />
              </div>}
            </div>
            <ProfilePic image={photo} square={true}/>
          </div>
        </div>

        <div className={classes.content}>
          <div className={classes.shortInfo}>
            <div className={classes.shortItem}>
              <div className={classes.shortLabel}><T>resume_job_area</T></div>
              <div className={classes.shortDesc}>
                <TW>{lang => getTranslate(industry, lang)}</TW>
              </div>
            </div>
            <div className={classes.shortItem}>
              <div className={classes.shortLabel}><T>main_work_experience</T></div>
              <div className={classes.shortDesc}><T>{exp}</T></div>
            </div>
          </div>
          <div className={classes.section}>
            <SectionList title={'main_responsibilities'}>
              <HtmlContent lineHeight={25}>{getClearMarkup(duties)}</HtmlContent>
            </SectionList>
            <SectionList title={'main_requirements'} list={loFilter(reqList)}/>
            <RenderOrNull value={bonusArray}>
              <SectionList title={'main_company_offer'}>
                <HtmlContent lineHeight={25}>{bonuses}</HtmlContent>
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={addInfo}>
              <SectionList title={'main_additional_info'}>
                <HtmlContent lineHeight={25}>{getClearMarkup(addInfo)}</HtmlContent>
              </SectionList>
            </RenderOrNull>
          </div>
          {canSeeButtons && !appealStatus &&
          <div className={classes.btnWrap}>
            <Button
              className={classes.btn}
              text={'button_respond_vacancy'}
              onClick={canInteractButtons ? onAppealOpen : onOpenLoginDialog}
              type={'medium'}
            />
            <div className={classes.btnInfo}><T>main_respond_desc</T></div>
          </div>}
        </div>

        <RenderOrNull value={vacancyList.data && !isEmployer(userData)}>
          <Vacancies
            smooth={true}
            value={'vacancy'}
            data={vacancyList}
            title={'vacancy_similar_list'}
          />
        </RenderOrNull>
      </div>
      <SideBanner/>

      <RenderOrNull value={appealOpen}>
        <AppealDialog
          onAppeal={onAppeal}
          open={appealOpen}
          classes={classes}
          questions={questions}
          onClose={onAppealClose}
        />
      </RenderOrNull>
    </Container>
  )
}

VacancyDetail.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  favLoading: PropTypes.bool,
  userData: PropTypes.object,
  vacancyList: PropTypes.object.isRequired,
  resumeList: PropTypes.object.isRequired,
  vacancyDetail: PropTypes.object.isRequired,
  appealOpen: PropTypes.bool.isRequired,
  setAppealOpen: PropTypes.func.isRequired,
  onFav: PropTypes.func.isRequired,
  onAppeal: PropTypes.func.isRequired,
  id: PropTypes.number
}

export default enhance(VacancyDetail)
