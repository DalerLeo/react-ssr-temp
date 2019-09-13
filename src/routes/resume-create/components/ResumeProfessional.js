import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import fp from 'lodash/fp'
import {
  TextField,
  Checkbox,
  SearchFieldConfig,
  Label2 as Label,
  CustomCheckBoxGroup,
  FieldHint
} from 'components/FormComponents'
import * as API from 'constants/api'
import { normalizeNumber } from 'helpers/normalizeNumber'
import t, { getTranslate } from 'helpers/translate'
import {
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE,
  FIELD_BORDER_STYLE_OPACITY
} from 'constants/styles'
import { COMP_LITERACY_LIST, EMPLOYMENT_TYPE } from 'constants/backend'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import LangArrayField from 'components/FormComponents/LangArrayField'
import Title from 'components/Title'
import TW from 'components/TW'

const enhance = compose(
  connect(state => ({
    salaryIsAgreement: fp.get(['form', 'ResumeCreate', 'values', 'agreement'], state)
  })),
  injectSheet({
    block: {
      position: 'relative'
    },
    fields: {
      marginTop: '40px',
      '&:first-child': {
        marginTop: '0'
      }
    },
    salary: {
      marginTop: '40px',
      marginBottom: '18px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'flex-end'),
      '& > div:first-child': {
        marginRight: '10px'
      }
    },
    itemMargin: {
      marginLeft: '20px'
    },
    radioWrap: {
      margin: '40px 0 30px',
      paddingBottom: '30px',
      borderBottom: FIELD_BORDER_STYLE_OPACITY
    },
    sphereWrapper: {
      opacity: '0',
      visibility: 'hidden',
      maxHeight: '0',
      transition: 'all 300ms'
    },
    sphereAnima: {
      marginTop: '40px',
      opacity: '1',
      visibility: 'visible',
      maxHeight: '300px'
    },
    spheres: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: FIELD_BORDER_STYLE,
      '& > div': {
        maxHeight: '180px',
        overflow: 'hidden',
        overflowY: 'auto'
      }
    },
    checkboxGroup: {
      marginBottom: '40px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    checkboxInline: {
      display: 'inline-block'
    }
  })
)

const prefData = {
  title: 'resume_wish_position',
  desc: 'vacancy_title_desc'
}

const ResumeProfessional = enhance(props => {
  const { classes, change, industries, isView, salaryIsAgreement } = props

  return (
    <div id={'wishes'} className={classes.block}>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'title'}
              label2={t('resume_wish_position', lang)}
              component={TextField}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'sphere'}
              label2={t('resume_professional_area', lang)}
              component={SearchFieldConfig}
              getText={value => getTranslate(value, lang)}
              onChange={() => change('wishedIndustries', [])}
              params={{ parents_only: true, ordering: 'name_' + lang }}
              api={API.SPECIALITY_LIST}
              trigger={lang}
            />
          )}
        </TW>
      </div>

      <div className={classNames({
        [classes.sphereWrapper]: true,
        [classes.sphereAnima]: !fp.isEmpty(industries)
      })}>
        <TW>
          {lang => (
            <React.Fragment>
              <Label label={t('vacancy_wished_sphere', lang)}/>
              <div className={classes.spheres}>
                <div>
                  <Field
                    name={'wishedIndustries'}
                    component={CustomCheckBoxGroup}
                    maxSelected={3}
                    itemName={'name' + fp.capitalize(lang)}
                    items={industries}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </TW>
      </div>
      <div className={classes.salary}>
        <TW>
          {lang => (
            <Field
              name={'fromSalary'}
              label2={t('resume_wish_salary', lang)}
              component={TextField}
              width={'270px'}
              disabled={salaryIsAgreement}
              normalize={normalizeNumber}
            />
          )}
        </TW>
        <Field
          name={'currency'}
          component={SearchFieldConfig}
          api={API.CURRENCY_LIST}
          disabled={salaryIsAgreement}
          width={'90px'}
        />
      </div>
      <TW>
        {lang => (
          <Field
            name={'isContractualSalary'}
            label={t('resume_no_sallary', lang)}
            className={classes.itemMargin}
            component={Checkbox}
          />
        )}
      </TW>
      <div className={classes.radioWrap}>
        <div className={classes.checkboxGroup}>
          <TW>
            {lang => (
              <Field
                isStatic={true}
                name={'employmentType'}
                label={t('main_type_of_employment', lang)}
                grid={{ span: 12 }}
                component={CustomCheckBoxGroup}
                className={classes.checkbox}
                items={EMPLOYMENT_TYPE}
              />
            )}
          </TW>
        </div>

        <TW>
          {lang => (
            <div className={classes.checkboxGroup}>
              <Label label={t('resume_relocation_travel', lang)}/>
              <Row className={classes.itemMargin}>
                <Col span={12}>
                  <Field
                    name={'isReadyTravel'}
                    label={t('resume_is_ready_travel', lang)}
                    component={Checkbox}
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name={'isReadyMove'}
                    label={t('resume_is_ready_move', lang)}
                    component={Checkbox}
                  />
                </Col>
              </Row>
            </div>
          )}
        </TW>
      </div>
      {!isView && <FieldHint data={prefData}/>}
    </div>
  )
})

ResumeProfessional.propTypes = {
  classes: PropTypes.object,
  industries: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  isView: PropTypes.bool
}

const ResumeSkills = enhance(props => {
  const { classes, licenceList } = props
  const licenceLoading = fp.get('loading', licenceList)
  const licenceData = fp.get('data', licenceList)

  return (
    <div id={'skills'}>
      <Title medium={true} text={'Навыки и умения'}/>
      <FieldArray
        name={'languageSkills'}
        component={LangArrayField}
      />

      {!licenceLoading &&
      <div className={classes.fields}>
        <Field
          name={'driverLicences'}
          label={'Водительские права'}
          component={CustomCheckBoxGroup}
          type={'inline'}
          items={licenceData}
          itemName={'title'}
        />
      </div>}
      <div className={classes.fields}>
        <Field
          name={'compLiteracyLevel'}
          isStatic={true}
          label2={'Знание компьютера'}
          component={SearchFieldConfig}
          items={COMP_LITERACY_LIST}
        />
      </div>
      <div className={classes.fields}>
        <Field
          name={'computerKnowledge'}
          component={TextField}
          label2={'Знание компьютерных программ'}
        />
      </div>
    </div>
  )
})

ResumeSkills.propTypes = {
  licenceList: PropTypes.object.isRequired,
  classes: PropTypes.object,
  salaryIsAgreement: PropTypes.bool
}

export { ResumeProfessional, ResumeSkills }
