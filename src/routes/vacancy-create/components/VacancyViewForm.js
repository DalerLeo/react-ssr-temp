import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import loGet from 'lodash/get'
import loMap from 'lodash/map'
import { compose, withReducer } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import moment from 'moment'
import { Field, FieldArray } from 'redux-form'
import {
  getEmpTypeValue,
  LANG_LEVEL,
  EXPERIENCES,
  EDUCATION,
  GENDER,
  COMP_LITERACY,
  BONUS_LIST
} from 'constants/backend'
import {
  VacancyProfessional,
  ResumeSkills,
  Questionnaire,
  WorkConditions
} from './VacancyFormBlocks'
import {
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE_OPACITY,
  LABEL_COLOR,
  MAIN_COLOR,
  animationStyle
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import dateFormat from 'helpers/dateFormat'
import { getTranslate } from 'helpers/translate'
import { getVacancySalary, arrayObjToObj, getDaysText } from 'helpers/get'
import FirstOrSecond from './FirstOrSecond'
import SectionList from 'routes/resume-details/SectionList'
import RenderOrNull from 'components/Utils/RenderOrNull'
import { TextAreaField } from 'components/FormComponents'
import { Button, GREY } from 'components/Button'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'
import HtmlContent from 'components/HtmlContent'
import TitleTab from 'components/Title/TitleTab'

const enhance = compose(
  withReducer('state', 'dispatcher', (state, action) => {
    return { ...state, ...action }
  }, {
    extra: true,
    prof: true,
    skills: true,
    duties: true,
    cond: true
  }),
  injectSheet({
    wrapForm: {
      maxWidth: '704px',
      width: 'calc(100% - 462px)'
    },
    headDate: {
      margin: '20px 0 10px',
      '& > span': {
        fontSize: '13px',
        display: 'inline-block',
        '&:first-child': {
          color: hexToRgb('#000', '0.4'),
          marginRight: '10px',
          paddingRight: '10px',
          borderRight: '1px solid #CBD0D8'
        }
      }
    },
    daysLeft: {
      fontSize: 'inherit'
    },
    daysLeftWarn: {
      color: '#ff478e'
    },
    form: {
      width: '100%',
      background: '#fbfcfd',
      animationName: 'rollUpFadeIn',
      animationDuration: '1s',
      padding: '30px 40px 0'
    },
    header: {
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      paddingBottom: '30px',
      marginBottom: '30px'
    },
    block: {
      position: 'relative'
    },
    fields: {
      marginTop: '40px'
    },
    titleWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginBottom: '15px'
    },
    edit: {
      color: LABEL_COLOR,
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: 'normal'
    },
    title: {
      fontWeight: '600',
      color: MAIN_COLOR
    },
    staticSalary: {
      fontWeight: '500',
      lineHeight: '1.29',
      fontSize: '17px'
    },
    statics: {
      fontSize: '15px',
      lineHeight: '22px',
      '& span': {
        color: LABEL_COLOR
      },
      '& div': {
        marginTop: '12px'
      }
    },
    skillTitle: {
      fontWeight: '500',
      marginBottom: '7px'
    },
    skillContent: {
      lineHeight: '25px',
      fontSize: '15px',
      marginBottom: '25px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    skillChip: {
      borderRadius: '20px',
      background: '#eef1f6',
      display: 'inline-block',
      padding: '2px 15px',
      margin: '0 10px 10px 0'
    },
    skillLicense: {
      extend: 'skillContent',
      marginBottom: '20px',
      paddingBottom: '20px',
      borderBottom: 'solid 1px',
      borderBottomColor: hexToRgb('c6cbd4', '0.3')
    },
    questionnaire: {
      margin: '0 -40px'
    },
    actionButtons: {
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      margin: '30px 0',
      paddingBottom: '30px'
    }
  }),
)

const WARNING_AT = 7
const VacancyViewForm = props => {
  const {
    tabs,
    classes,
    handleSubmit,
    dispatcher,
    state,
    industries,
    change,
    licenceList,
    onTabChange,
    vacancyDetail: { data }
  } = props

  const bonusesList = arrayObjToObj(BONUS_LIST)

  const title = loGet(data, 'title')
  const generalStatus = loGet(data, 'generalStatus')
  const isActive = loGet(data, 'isActive')
  const isTemp = loGet(data, 'isTemp')
  const isModerated = generalStatus === 'moderated'
  const closedDate = loGet(data, 'closedDate')
  const modifiedDate = dateFormat(loGet(data, 'modifiedDate'))
  const daysLeft = moment(closedDate).diff(moment(), 'days')
  const industry = loGet(data, 'industry')
  const experience = EXPERIENCES[loGet(data, 'experience')]
  const educationLevel = EDUCATION[loGet(data, 'educationLevel')]
  const gender = GENDER[loGet(data, 'gender')]
  const age = loGet(data, 'age')
  const languageRequirements = loGet(data, 'languageRequirements')
  const place = loGet(data, 'place')
  const computerKnowledge = fp.flow(
    fp.get('computerKnowledge'),
    fp.split(','),
    fp.map(fp.trim),
    fp.filter(item => item)
  )(data)
  const compLiteracyLevel = COMP_LITERACY[loGet(data, 'compLiteracyLevel')]
  const driverLicences = fp.flow(fp.get('driverLicences'), fp.map(fp.get('title')), fp.join(', '))(data)
  const additionalInfo = loGet(data, 'additionalInformation')
  const duties = loGet(data, 'duties')
  const bonus = loGet(data, 'bonus')
  const bonuses = fp.flow(
    fp.split('-'),
    fp.map(item => fp.get(item, bonusesList))
  )(bonus)
  const requirements = loGet(data, 'requirements')
  const salaryFrom = loGet(data, 'salaryFrom')
  const salaryTo = loGet(data, 'salaryTo')
  const currency = loGet(data, 'currency.name')
  const vacancySalary = getVacancySalary(salaryFrom, salaryTo, currency, null)
  const empType = fp.flow(fp.get('employmentType'), getEmpTypeValue)(data)

  const onCancelChanges = (stateName) => {
    return dispatcher({
      [stateName]: true
    })
  }

  const onSaveChanges = (stateName, hash) => {
    const callBack = () => dispatcher({
      [stateName]: true
    })
    return props.onSubmit({
      callBack,
      hash
    })
  }

  const getActionButtons = (...params) => {
    return (
      <div className={classNames(classes.fields, classes.actionButtons)}>
        <Button
          type={'medium'}
          text={'button_cancel'}
          bordered={true}
          color={GREY}
          style={{ width: '180px' }}
          onClick={() => onCancelChanges(...params)}
        />
        <Button
          type={'medium'}
          text={'button_simple_save'}
          style={{ width: '180px', marginLeft: '25px' }}
          onClick={handleSubmit(() => onSaveChanges(...params))}
        />
      </div>
    )
  }

  return (
    <div style={animationStyle} className={classes.wrapForm}>
      <TitleTab type={'medium'} value={'ru'} onChange={onTabChange} tabs={tabs}/>
      <div className={classes.headDate}>
        <span><T>main_update_date</T>: {modifiedDate}</span>
        {isActive
          ? isModerated
            ? (
              <TW>
                {lang => (
                  <React.Fragment>
                    <T>vacancy_rest_detail</T>: <span className={classNames(classes.daysLeft, {
                      [classes.daysLeftWarn]: daysLeft <= WARNING_AT
                    })}>{getDaysText(daysLeft, lang)}</span>
                  </React.Fragment>
                )}
              </TW>
            )
            : <span className={classes.daysLeftWarn}><T>emp_vacancy_waiting_moderation</T></span>
          : isTemp
            ? <span className={classes.daysLeftWarn}><T>applicant_drafts</T></span>
            : <span className={classes.daysLeftWarn}><T>vacancy_in_archive</T></span>}
      </div>
      <form className={classes.form}>
        <FirstOrSecond value={state.prof}>
          <div id={'mainInfo'} className={classes.header}>
            <div className={classes.titleWrap}>
              <Title
                type={'medium'}
                margin={'0'}
                className={classes.title}
                text={title}
              />
              <span
                onClick={() => dispatcher({ prof: false })}
                className={classes.edit}><T>main_global_edit</T></span>
            </div>
            <TW>
              {lang => {
                const specialities = fp.flow(
                  fp.get('specialities'),
                  fp.map(item => getTranslate(item, lang)),
                  fp.join('; ')
                )(data)
                return (
                  <div className={classes.statics}>
                    <RenderOrNull value={industry}>
                      <div>{getTranslate(industry, lang)}: {specialities}</div>
                    </RenderOrNull>
                    <div>{getTranslate(place, lang)}</div>
                    <RenderOrNull value={empType}>
                      <div><T>main_type_of_employment</T>: <T>{empType}</T></div>
                    </RenderOrNull>
                  </div>
                )
              }}
            </TW>
          </div>
          <React.Fragment>
            <VacancyProfessional
              isUpdate={true}
              change={change}
              industries={industries}
            />
            {getActionButtons('prof', 'mainInfo')}
          </React.Fragment>
        </FirstOrSecond>

        <FirstOrSecond value={state.skills}>
          <SectionList
            id={'requirements'}
            title={'main_requirements'}
            onChange={() => dispatcher({ skills: false })}>
            <RenderOrNull value={experience}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_work_experience</T>:</div>
                <T>{experience}</T>
              </div>
            </RenderOrNull>
            <RenderOrNull value={educationLevel}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_education</T>:</div>
                <T>{educationLevel}</T>
              </div>
            </RenderOrNull>
            <RenderOrNull value={gender}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_sex</T>:</div>
                <T>{gender}</T>
              </div>
            </RenderOrNull>
            <RenderOrNull value={age}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_age</T>:</div>
                {age}
              </div>
            </RenderOrNull>
            <RenderOrNull value={languageRequirements}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_language_knowledge</T>:</div>
                {fp.map(lan => {
                  const langName = fp.get('language.name', lan)
                  const langLevel = LANG_LEVEL[fp.get('level', lan)]
                  return (
                    <div key={langName}>
                      {langName} (<T>{langLevel}</T>)
                    </div>
                  )
                }, languageRequirements)}
              </div>
            </RenderOrNull>
            <RenderOrNull value={compLiteracyLevel}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_pc_knowledge</T>:</div>
                <T>{compLiteracyLevel}</T>
              </div>
            </RenderOrNull>
            <RenderOrNull value={computerKnowledge}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_programm_knowledge</T>:</div>
                {loMap(computerKnowledge, (item, index) => {
                  return <div key={index} className={classes.skillChip}>{item}</div>
                })}
              </div>
            </RenderOrNull>
            <RenderOrNull value={driverLicences}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_driver_license</T>:</div>
                {driverLicences}
              </div>
            </RenderOrNull>
            <RenderOrNull value={requirements}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>main_additional_requirements</T>:</div>
                <HtmlContent>{requirements}</HtmlContent>
              </div>
            </RenderOrNull>
          </SectionList>
          <div id={'requirements'}>
            <Title isStatic={true} medium={true} text={'main_requirements'}/>
            <ResumeSkills licenceList={licenceList}/>
            {getActionButtons('skills', 'requirements')}
          </div>
        </FirstOrSecond>

        <FirstOrSecond value={state.duties}>
          <SectionList
            id={'duties'}
            title={'main_responsibilities'}
            onChange={() => dispatcher({ duties: false })}>
            <RenderOrNull value={duties}>
              <div className={classes.skillContent}>
                <HtmlContent>{duties}</HtmlContent>
              </div>
            </RenderOrNull>
          </SectionList>
          <div id={'duties'}>
            <Title isStatic={true} medium={true} text={'main_responsibilities'}/>
            <Field
              name={'duties'}
              component={TextAreaField}
            />
            {getActionButtons('duties', 'duties')}
          </div>
        </FirstOrSecond>

        <FirstOrSecond value={state.cond}>
          <SectionList
            id={'conditions'}
            title={'vacancy_working_conditions'}
            onChange={() => dispatcher({ cond: false })}>
            <RenderOrNull value={vacancySalary}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>vacancy_salary</T>:</div>
                <div>{vacancySalary}</div>
              </div>
            </RenderOrNull>
            <RenderOrNull value={bonus}>
              <div className={classes.skillContent}>
                <div className={classes.skillTitle}><T>vacancy_bonus_pack</T>:</div>
                {loMap(bonuses, (item, index) => {
                  return <div key={index}>{item}</div>
                })}
              </div>
            </RenderOrNull>
          </SectionList>
          <div id={'conditions'}>
            <Title isStatic={true} medium={true} text={'vacancy_working_conditions'}/>
            <WorkConditions/>
            {getActionButtons('cond', 'conditions')}
          </div>
        </FirstOrSecond>

        <FirstOrSecond value={state.extra}>
          <SectionList
            id={'extraInfo'}
            title={'main_additional_info'}
            onChange={() => dispatcher({ extra: false })}>
            <RenderOrNull value={additionalInfo}>
              <div className={classes.skillContent}>
                <HtmlContent>{additionalInfo}</HtmlContent>
              </div>
            </RenderOrNull>
          </SectionList>
          <div id={'extraInfo'}>
            <Title isStatic={true} medium={true} text={'main_additional_info'}/>
            <Field
              name={'additionalInformation'}
              component={TextAreaField}
            />
            {getActionButtons('extra', 'extraInfo')}
          </div>
        </FirstOrSecond>
        <div id={'questions'} className={classes.questionnaire}>
          <FieldArray
            component={Questionnaire}
            name={'questions'}
          />
        </div>
      </form>
    </div>
  )
}

VacancyViewForm.propTypes = {
  classes: PropTypes.object,
  tabs: PropTypes.array,
  userDetail: PropTypes.object.isRequired,
  industries: PropTypes.array.isRequired,
  licenceList: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  onPreviewOpen: PropTypes.func,
  state: PropTypes.object.isRequired,
  vacancyDetail: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dispatcher: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired
}

export default enhance(VacancyViewForm)
