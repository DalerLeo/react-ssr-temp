import React from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import {
  COMP_LITERACY_LIST,
  EDUCATION_LIST,
  EXPERIENCES_LIST,
  GENDER_LIST
} from 'constants/backend'
import t from 'helpers/translate'
import withStyles from './withStyles'
import {
  CustomCheckBoxGroup,
  Label2 as Label,
  SearchFieldConfig,
  TextAreaField,
  TextField
} from 'components/FormComponents'
import LangArrayField from 'components/FormComponents/LangArrayField'
import T from 'components/T'
import TW from 'components/TW'

const ResumeSkills = props => {
  const { classes, licenceList } = props

  return (
    <React.Fragment>
      <TW>
        {lang => (
          <Field
            name={'experience'}
            isStatic={true}
            label2={t('main_work_experience', lang)}
            component={SearchFieldConfig}
            items={EXPERIENCES_LIST}
          />
        )}
      </TW>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'educationLevel'}
              isStatic={true}
              label2={t('main_education', lang)}
              component={SearchFieldConfig}
              items={EDUCATION_LIST}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'gender'}
              isStatic={true}
              label2={t('main_sex', lang)}
              component={SearchFieldConfig}
              items={GENDER_LIST}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <React.Fragment>
              <Label label={t('main_age', lang)}/>
              <div className={classes.age}>
                <span><T>main_from</T></span>
                <Field
                  width={'75px'}
                  name={'from'}
                  component={TextField}
                />
                <div style={{ marginLeft: '20px' }}><T>main_to</T></div>
                <Field
                  width={'75px'}
                  name={'to'}
                  component={TextField}
                />
              </div>
            </React.Fragment>
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <FieldArray
          name={'languageRequirements'}
          component={LangArrayField}
        />
      </div>

      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'compLiteracyLevel'}
              isStatic={true}
              label2={t('main_pc_knowledge', lang)}
              component={SearchFieldConfig}
              items={COMP_LITERACY_LIST}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'computerKnowledge'}
              component={TextField}
              label2={t('main_programm_knowledge', lang)}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              className={classes.itemMargin}
              name={'driverLicences'}
              label={t('main_driver_license', lang)}
              component={CustomCheckBoxGroup}
              type={'inline'}
              items={fp.get('data', licenceList)}
              itemName={'title'}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'requirements'}
              component={TextAreaField}
              label={t('main_additional_requirements', lang)}
            />
          )}
        </TW>
      </div>
    </React.Fragment>
  )
}

ResumeSkills.propTypes = {
  licenceList: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default withStyles(ResumeSkills)
