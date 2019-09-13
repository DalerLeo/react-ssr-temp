import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import classNames from 'classnames'
import { EMPLOYMENT_TYPE } from 'constants/backend'
import * as API from 'constants/api'
import t, { getTranslate } from 'helpers/translate'
import withStyles from './withStyles'
import {
  CustomCheckBoxGroup,
  FieldHint,
  Label2 as Label,
  SearchFieldConfig,
  TextField
} from 'components/FormComponents'
import TW from 'components/TW'

const profData = {
  title: 'vacancy_title',
  desc: 'vacancy_title_desc'
}

const VacancyProfessional = props => {
  const { classes, change, industries, isUpdate } = props

  return (
    <div id={'mainInfo'} className={classes.block}>
      {!isUpdate && <FieldHint data={profData}/>}
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'title'}
              label2={t('vacancy_title', lang)}
              placeholder={t('vacancy_title', lang)}
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
              onChange={() => change('specialities', [])}
              params={{ 'parents_only': true, ordering: 'name_' + lang }}
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
              <Label label={t('main_sphere', lang)}/>
              <div className={classes.spheres}>
                <div>
                  <Field
                    name={'specialities'}
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
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'place'}
              component={SearchFieldConfig}
              api={API.REGIONS_LIST}
              label2={t('resume_city', lang)}
              getText={value => getTranslate(value, lang)}
              params={{ type: 'city' }}
            />
          )}
        </TW>
      </div>
      <div className={classes.fields}>
        <TW>
          {lang => (
            <Field
              name={'employmentType'}
              isStatic={true}
              component={SearchFieldConfig}
              items={EMPLOYMENT_TYPE}
              label2={t('main_schedule', lang)}
            />
          )}
        </TW>
      </div>
    </div>
  )
}

VacancyProfessional.propTypes = {
  classes: PropTypes.object,
  isUpdate: PropTypes.bool,
  industries: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired
}

export default withStyles(VacancyProfessional)
