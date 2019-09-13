import React from 'react'
import loGet from 'lodash/get'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import { compose, withReducer } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { Field, FieldArray } from 'redux-form'
import Title from 'components/Title'
import PropTypes from 'prop-types'
import {
  crossBrowserify,
  fallbacksStyle,
  BORDER_STYLE,
  LABEL_COLOR,
  animationStyle,
  MAIN_COLOR,
  FIELD_BORDER_STYLE_OPACITY
} from 'constants/styles'
import { getEmpTypeValue, LANG_LEVEL } from 'constants/backend'
import { getSalary, getExperience } from 'helpers/get'
import t, { getTranslate } from 'helpers/translate'
import SectionList from 'routes/resume-details/SectionList'
import ExpArrayField from 'components/FormComponents/ExpArrayField'
import EduArrayField from 'components/FormComponents/EduArrayField'
import { TextAreaField } from 'components/FormComponents'
import { GREY, Button } from 'components/Button'
import { ResumeProfessional, ResumeSkills } from './ResumeProfessional'
import FirstOrSecond from './FirstOrSecond'
import RenderOrNull from 'components/Utils/RenderOrNull'
import HtmlContent from 'components/HtmlContent'
import TitleTab from 'components/Title/TitleTab'
import T from 'components/T'
import TW from 'components/TW'

const expKeys = { desc: 'duties', name: 'organization', title: 'speciality.name' }
const eduKeys = { desc: 'faculty', name: 'institution.name', title: 'speciality' }

const enhance = compose(
  withReducer('state', 'dispatcher', (state, action) => {
    return { ...state, ...action }
  }, {
    wishes: true,
    workExperience: true,
    mainEducation: true,
    extraEducation: true,
    skills: true,
    hobbies: true,
    extraInfo: true
  }),
  injectSheet({
    wrapper: {
      ...crossBrowserify('flexGrow', '1')
    },
    form: {
      animationDuration: '1s',
      animationName: 'rollUpFadeIn',
      background: '#fbfcfd',
      marginTop: '20px',
      padding: '30px 40px'
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
      ...crossBrowserify('justifyContent', 'space-between')
    },
    edit: {
      color: LABEL_COLOR,
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px'
    },
    line: {
      width: '100%',
      borderTop: BORDER_STYLE,
      marginTop: '30px',
      paddingTop: '30px',
      opacity: '0.3'
    },
    title: {
      color: MAIN_COLOR,
      fontWeight: '600',
      marginBottom: '18px'
    },
    staticSalary: {
      fontWeight: '500',
      fontSize: '17px'
    },
    statics: {
      fontSize: '15px',
      lineHeight: '22px',
      '& div': {
        marginTop: '12px'
      },
      '& b': {
        fontWeight: '500',
        marginRight: '5px'
      }
    },
    readyTo: {
      color: LABEL_COLOR,
      marginLeft: '5px'
    },
    skillTitle: {
      fontWeight: '500',
      lineHeight: '25px',
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
      display: 'block',
      lineHeight: '25px',
      '&:after': {
        content: '","'
      },
      '&:last-child:after': {
        content: '""'
      }
    },
    skillLicense: {
      extend: 'skillContent',
      marginBottom: '20px'
    },
    actionButtons: {
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      margin: '30px 0',
      paddingBottom: '30px'
    }
  })
)

const ResumeViewForm = props => {
  const {
    tabs,
    classes,
    handleSubmit,
    userDetail,
    dispatcher,
    state,
    industries,
    change,
    licenceList,
    onUniverCreate,
    onTabChange,
    resumeDetail: { data }
  } = props

  const livingPlace = loGet(userDetail, ['data', 'livingPlace'])
  const title = loGet(data, 'title')
  const experiences = loGet(data, 'experiences')
  const workingExp = loGet(data, 'workExperience')
  const educations = loGet(data, 'educations')
  const defaultEducations = fp.filter(item => {
    return fp.get('educationLevel', item) !== 'additional'
  }, educations)
  const extraEducations = fp.filter(item => {
    return fp.get('educationLevel', item) === 'additional'
  }, educations)
  const languageSkills = loGet(data, 'languageSkills')
  const currency = loGet(data, 'currency.name')
  const fromSalary = getSalary(data)
  const isContractualSalary = loGet(data, 'isContractualSalary')
  const isReadyTravel = loGet(data, 'isReadyTravel') && 'resume_is_ready_travel'
  const isReadyMove = loGet(data, 'isReadyMove') && 'resume_is_ready_move'
  const wishedSphere = loGet(data, 'wishedIndustriesParent')
  const wishedIndustries = loGet(data, 'wishedIndustries')
  const computerKnowledge = fp.flow(
    fp.get('computerKnowledge'),
    fp.split(','),
    fp.filter(item => item)
  )(data)
  const driverLicences = fp.flow(
    fp.get('driverLicences'),
    fp.map(fp.get('title')),
    fp.join(', ')
  )(data)
  const hobbies = loGet(data, 'hobbies')
  const additionalInfo = loGet(data, 'additionalInfo')

  const onCancelChanges = (stateName) => {
    return dispatcher({
      [stateName]: true
    })
  }

  const onSaveChanges = (stateName, fields) => {
    return props.onSubmit({
      fields,
      hash: stateName,
      callbackFunc: () => dispatcher({
        [stateName]: true
      })
    })
  }

  const getActionButtons = (stateName, fields) => {
    return (
      <div className={classNames(classes.fields, classes.actionButtons)}>
        <Button
          type={'medium'}
          text={'button_cancel'}
          bordered={true}
          color={GREY}
          style={{ width: '180px' }}
          onClick={() => onCancelChanges(stateName)}
        />
        <Button
          type={'medium'}
          text={'button_save_changes'}
          style={{ width: '280px', marginLeft: '25px' }}
          onClick={handleSubmit(() => onSaveChanges(stateName, fields))}
        />
      </div>
    )
  }

  return (
    <div className={classes.wrapper} style={animationStyle}>
      <TitleTab type={'medium'} value={'ru'} onChange={onTabChange} tabs={tabs}/>
      <form className={classes.form}>
        <FirstOrSecond value={state.wishes}>
          <div id={'wishes'}>
            <Title
              type={'medium'}
              className={classes.title}
              text={title}
            />
            <div className={classes.titleWrap}>
              <div className={classes.staticSalary}>
                {isContractualSalary
                  ? <T>main_vacancy_salary_no</T>
                  : <React.Fragment>
                    <T>main_salary_from</T> {fromSalary} {currency}
                  </React.Fragment>}
              </div>
              <div className={classes.edit} onClick={() => dispatcher({ wishes: false })}><T>main_global_edit</T></div>
            </div>
            <div className={classes.statics}>
              <div>
                <TW>{lang => <span>{getTranslate(livingPlace, lang)}</span>}</TW>
                {(isReadyTravel || isReadyMove) &&
                <TW>
                  {lang => (
                    <span className={classes.readyTo}>({
                      fp.flow(
                        fp.filter(item => item),
                        fp.map(item => t(item, lang)),
                        fp.join(', ')
                      )([isReadyTravel, isReadyMove])
                    })</span>
                  )}
                </TW>}
              </div>
              <TW>
                {lang => (
                  <React.Fragment>
                    <div>
                      <b>{t('main_work_experience', lang)}:</b>
                      {getExperience(workingExp, lang)}
                    </div>
                    <div>
                      <b>{t('vacancy_wished_sphere', lang)}:</b>
                      {getTranslate(wishedSphere, lang)}
                    </div>
                    <div>
                      <b>{t('resume_wish_position', lang)}:</b>
                      {fp.flow(
                        fp.map(item => getTranslate(item, lang)),
                        fp.join(', ')
                      )(wishedIndustries)}
                    </div>
                    <div>
                      <b>{t('main_type_of_employment', lang)}:</b>
                      {fp.flow(
                        fp.get('employmentType'),
                        fp.map(item => t(getEmpTypeValue(item), lang)),
                        fp.join(', ')
                      )(data)}
                    </div>
                  </React.Fragment>
                )}
              </TW>
            </div>
            <div className={classes.line}/>
          </div>
          <React.Fragment>
            <ResumeProfessional
              isView={true}
              change={change}
              industries={industries}
            />
            {getActionButtons('wishes', [
              'title',
              'sphere',
              'wishedIndustries',
              'fromSalary',
              'currency',
              'isContractualSalary',
              'employmentType',
              'isReadyTravel',
              'isReadyMove'
            ])}
            <div className={classes.line}/>
          </React.Fragment>
        </FirstOrSecond>
        <FirstOrSecond value={state.workExperience}>
          <SectionList
            id={'workExperience'}
            onChange={() => dispatcher({ workExperience: false })}
            list={experiences}
            keys={expKeys}
            title={'main_work_experience'}
          />
          <div className={classes.block} id={'workExperience'}>
            <TW>
              {lang => (
                <FieldArray
                  name={'exp'}
                  component={ExpArrayField}
                  isUpdate={true}
                  lang={lang}
                />
              )}
            </TW>
            {getActionButtons('workExperience', ['experiences'])}
          </div>
        </FirstOrSecond>
        <FirstOrSecond value={state.mainEducation}>
          <SectionList
            id={'mainEducation'}
            onChange={() => dispatcher({ mainEducation: false })}
            list={defaultEducations}
            keys={eduKeys}
            title={'main_education'}
          />
          <div className={classes.block} id={'mainEducation'}>
            <FieldArray
              name={'edu'}
              onUniverCreate={onUniverCreate}
              component={EduArrayField}
            />
            {getActionButtons('mainEducation', ['educations'])}
          </div>
        </FirstOrSecond>
        <FirstOrSecond value={state.extraEducation}>
          <SectionList
            id={'extraEducation'}
            onChange={() => dispatcher({ extraEducation: false })}
            list={extraEducations}
            keys={eduKeys}
            title={'main_extra_education'}
          />
          <div className={classes.block} id={'extraEducation'}>
            <FieldArray
              name={'extraEdu'}
              onUniverCreate={onUniverCreate}
              component={EduArrayField}
              extra={true}
            />
            {getActionButtons('extraEducation', ['educations'])}
          </div>
        </FirstOrSecond>
        <FirstOrSecond value={state.skills}>
          <React.Fragment>
            <SectionList
              id={'skills'}
              title={'main_skills'}
              onChange={() => dispatcher({ skills: false })}>
              <RenderOrNull value={languageSkills}>
                <div className={classes.skillContent}>
                  <div className={classes.skillTitle}><T>main_language_knowledge</T>:</div>
                  <TW>
                    {lang => fp.flow(
                      fp.map(item => {
                        const id = fp.get('language.id', item)
                        const name = fp.get('language.name', item)
                        const level = t(LANG_LEVEL[fp.get('level', item)], lang)
                        return (
                          <div key={id}>{name} ({level})</div>
                        )
                      })
                    )(languageSkills)}
                  </TW>
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
                <div className={classes.skillLicense}>
                  <div className={classes.skillTitle}><T>main_driver_license</T>:</div>
                  {driverLicences}
                </div>
              </RenderOrNull>
            </SectionList>
          </React.Fragment>
          <React.Fragment>
            <ResumeSkills licenceList={licenceList}/>
            {getActionButtons('skills', [
              'languageSkills',
              'driverLicences',
              'compLiteracyLevel',
              'computerKnowledge'
            ])}
          </React.Fragment>
        </FirstOrSecond>
        <FirstOrSecond value={state.hobbies}>
          <SectionList
            id="hobbies"
            title={'main_hobby'}
            onChange={() => dispatcher({ hobbies: false })}>
            <RenderOrNull value={hobbies}>
              <div className={classes.skillContent}>
                <HtmlContent>{hobbies}</HtmlContent>
              </div>
            </RenderOrNull>
          </SectionList>
          <div id={'hobbies'}>
            <Title isStatic={true} medium={true} text={'main_hobby'}/>
            <Field
              rows={5}
              name={'hobbies'}
              component={TextAreaField}
            />
            {getActionButtons('hobbies', ['hobbies'])}
          </div>
        </FirstOrSecond>
        <FirstOrSecond value={state.extraInfo}>
          <SectionList
            id={'extraInfo'}
            title={'main_additional_info'}
            onChange={() => dispatcher({ extraInfo: false })}>
            <RenderOrNull value={additionalInfo}>
              <div className={classes.skillContent}>
                <HtmlContent>{additionalInfo}</HtmlContent>
              </div>
            </RenderOrNull>
          </SectionList>
          <div id={'extraInfo'}>
            <Title isStatic={true} medium={true} text={'main_additional_info'}/>
            <Field
              rows={5}
              name={'additionalInfo'}
              component={TextAreaField}
            />
            {getActionButtons('extraInfo', ['additionalInfo'])}
          </div>
        </FirstOrSecond>
      </form>
    </div>
  )
}

ResumeViewForm.propTypes = {
  tabs: PropTypes.array,
  classes: PropTypes.object,
  userDetail: PropTypes.object.isRequired,
  industries: PropTypes.array.isRequired,
  licenceList: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  onUniverCreate: PropTypes.func,
  onPreviewOpen: PropTypes.func,
  state: PropTypes.object.isRequired,
  resumeDetail: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dispatcher: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired
}

export default enhance(ResumeViewForm)
