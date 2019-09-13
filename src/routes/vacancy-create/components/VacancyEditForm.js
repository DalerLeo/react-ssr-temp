import fp from 'lodash/fp'
import loMap from 'lodash/map'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { Field, FieldArray } from 'redux-form'
import { scrollToBlock } from 'helpers/scroll'
import t from 'helpers/translate'
import TW from 'components/TW'
import Title from 'components/Title'
import RenderOrNull from 'components/Utils/RenderOrNull'
import TitleTab from 'components/Title/TitleTab'
import ResumeUserInfo from './VacancyUserInfo'
import { Button } from 'components/Button'
import {
  VacancyProfessional,
  ResumeSkills,
  WorkConditions,
  Questionnaire
} from './VacancyFormBlocks'
import {
  animationStyle,
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE_OPACITY
} from 'constants/styles'
import { TextAreaField } from 'components/FormComponents'
import ServiceCheckBoxGroup from 'components/FormComponents/CheckboxGroup/ServiceCheckBoxGroup'
import ServicesGroup from './ServicesGroup'
import VacancyTypesRadio from './VacancyTypesRadio'

const enhance = compose(
  injectSheet({
    form: {
      animationName: 'rollUpFadeIn',
      animationDuration: '1s',
      maxWidth: '685px',
      width: 'calc(100% - 528px)'
    },
    block: {
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      paddingBottom: '40px',
      marginBottom: '40px',
      position: 'relative'
    },
    fields: {
      marginTop: '40px'
    },
    vacancyType: {
      marginTop: '15px',
      paddingLeft: '20px'
    },
    radioGroup: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center')
    },
    radioBtn: {
      '&:last-child': {
        marginRight: '0'
      }
    }
  })
)

const blockFieldNames = [
  {
    key: 'mainInfo',
    fields: [
      'title',
      'sphere',
      'specialities',
      'place',
      'employmentType'
    ]
  },
  {
    key: 'requirements',
    fields: [
      'experience',
      'educationLevel',
      'gender',
      'languageRequirements',
      'compLiteracyLevel',
      'computerKnowledge',
      'driverLicences',
      'requirements'
    ]
  },
  {
    key: 'duties',
    fields: ['duties']
  },
  {
    key: 'conditions',
    fields: [
      'salaryFrom',
      'salaryTo',
      'currency',
      'bonus'
    ]
  },
  {
    key: 'extraInfo',
    fields: ['additionalInformation']
  }
]

const vacancyTypesCodes = ['ES5', 'ES7']

const VacancyEditForm = props => {
  const {
    tabs,
    history,
    isUpdate,
    isActive,
    classes,
    formValues,
    submitErrors,
    handleSubmit,
    onTabChange,
    userDetail,
    licenceList,
    industries,
    onSubmit,
    change,
    onPreviewOpen,
    servicesList,
    allServicesList
  } = props

  const services = fp.filter(item => {
    const code = fp.get('service.code', item)
    return !fp.includes(code, vacancyTypesCodes)
  }, fp.get('data', servicesList))

  const allServices = fp.get('data', allServicesList)
  const userEmail = fp.get('data.username', userDetail)

  const formErrorsKeys = loMap(submitErrors, (val, key) => key)
  const errorBlocks = fp.filter(item => {
    return fp.some(field => {
      return fp.includes(field, formErrorsKeys)
    }, item.fields)
  }, blockFieldNames)

  useEffect(() => {
    if (!fp.isEmpty(submitErrors)) {
      const firstErrorBlockKey = fp.flow(fp.first, fp.get('key'))(errorBlocks)
      scrollToBlock(history, firstErrorBlockKey)
    }
  }, [submitErrors])

  const showServices = isUpdate ? !isActive : true
  const saveAndPublish = fp.get('vacancyType', formValues)

  return (
    <div className={classes.form} style={animationStyle}>
      <Title isStatic={true} text={isUpdate ? 'vacancy_edit_title' : 'vacancy_create_title'}/>
      <TitleTab type={'medium'} value={'ru'} onChange={onTabChange} tabs={tabs}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section id={'mainInfo'} className={classes.block}>
          <ResumeUserInfo userDetail={userDetail}/>
          <VacancyProfessional change={change} industries={industries}/>
        </section>

        <section id={'requirements'} className={classes.block}>
          <Title isStatic={true} medium={true} text={'main_requirements'}/>
          <ResumeSkills licenceList={licenceList}/>
        </section>

        <section id={'duties'} className={classes.block}>
          <Title isStatic={true} medium={true} text={'main_responsibilities'}/>
          <TW>
            {lang => (
              <Field
                name={'duties'}
                component={TextAreaField}
                label={t('vacancy_official_duties_label', lang)}
              />
            )}
          </TW>
        </section>

        <section id={'conditions'} className={classes.block}>
          <Title isStatic={true} medium={true} text={'vacancy_working_conditions'}/>
          <WorkConditions/>
        </section>

        <section id={'extraInfo'} className={classes.block}>
          <Title isStatic={true} medium={true} text={'main_additional_info'}/>
          <TW>
            {lang => (
              <Field
                name={'additionalInformation'}
                component={TextAreaField}
                label={t('main_additional_info_label', lang)}
              />
            )}
          </TW>
        </section>

        <section className={classes.block}>
          <FieldArray
            component={Questionnaire}
            name={'questions'}
          />
        </section>

        <RenderOrNull value={showServices && fp.get('data', servicesList)}>
          <section className={classes.block}>
            <Title isStatic={true} medium={true} text={'serv_additional_emp'}/>
            <RenderOrNull value={services}>
              <Field
                name={'orderServices'}
                component={ServicesGroup}
                items={services}
              />
            </RenderOrNull>
            <VacancyTypesRadio
              className={classes.vacancyType}
              services={servicesList}
            />
          </section>
        </RenderOrNull>

        <section className={classes.block}>
          <Field
            name={'allServices'}
            title={'main_mj_serv_all'}
            component={ServiceCheckBoxGroup}
            items={allServices}
            userEmail={userEmail}
          />
        </section>

        <div className={classes.fields}>
          <Button
            alternate
            onClick={onPreviewOpen}
            style={{ width: '50%', padding: '0 15px' }}
            type={'medium'}
            text={'button_preview'}
          />
          <Button
            style={{ width: '50%' }}
            type={'medium'}
            submitType={'submit'}
            text={saveAndPublish
              ? 'button_save_publish'
              : 'button_save_vacancy'}
          />
        </div>
      </form>
    </div>
  )
}

VacancyEditForm.propTypes = {
  isUpdate: PropTypes.bool,
  isActive: PropTypes.bool,
  classes: PropTypes.object,
  formValues: PropTypes.object,
  history: PropTypes.object,
  tabs: PropTypes.array,
  submitErrors: PropTypes.object,
  userDetail: PropTypes.object.isRequired,
  licenceList: PropTypes.object.isRequired,
  industries: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onPreviewOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  sphere: PropTypes.string,
  onTabChange: PropTypes.func.isRequired,
  servicesList: PropTypes.object.isRequired,
  allServicesList: PropTypes.object.isRequired
}

export default enhance(VacancyEditForm)
