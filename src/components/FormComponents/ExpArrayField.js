import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import * as API from 'constants/api'
import {
  ONE,
  crossBrowserify,
  fallbacksStyle,
  fieldArrayStyles
} from 'constants/styles'
import t, { getTranslate } from 'helpers/translate'
import DeleteIcon from 'icons/Delete'
import SearchFieldConfig from './SearchFieldConfig'
import TextField from './TextField/TextField'
import { Checkbox, TextAreaField, CustomDateField, FieldHint } from './index'
import Title from 'components/Title'

const expData = {
  title: 'main_work_experience',
  desc: 'resume_work_hint'
}

const enhance = compose(
  connect(state => ({
    hasExperience: fp.get(['form', 'ResumeCreate', 'values', 'hasExperience'], state)
  })),
  injectSheet({
    ...fieldArrayStyles,
    content: {
      marginTop: '12px'
    },
    time: {
      marginTop: '40px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'flex-end'),
      '& > div': {
        width: 'calc(50% - 15px)',
        marginBottom: '16px'
      },
      '& > div:first-child': {
        marginRight: '30px'
      }
    },
    itemMargin: {
      marginLeft: '20px'
    }
  })
)

const ExpArrayField = (props) => {
  const { lang, classes, fields, isUpdate, hasExperience } = props

  return (
    <div className={classes.wrapper}>
      <Title
        isStatic={true}
        margin={'0 0 30px'}
        medium={true}
        text={'main_work_experience'}
      />
      <Field
        name={'hasExperience'}
        component={Checkbox}
        label={t('resume_work_exp', lang)}
      />
      {hasExperience &&
      <React.Fragment>
        {!isUpdate && <FieldHint data={expData}/>}
        <div className={classes.content} id={'companyRef'}>
          {fields.map((field, index) => {
            const present = fp.get('present', fields.get(index))
            const country = fp.get('country', fields.get(index))
            const region = fp.get('region', fields.get(index))
            const countryIsUzb = String(country) === '108'
            return (
              <div className={classes.listItem} key={index}>
                <Field
                  name={`${field}.organization`}
                  component={TextField}
                  label2={t('resume_company_title', lang)}
                />
                <div className={classes.fields}>
                  <Field
                    name={`${field}.speciality`}
                    component={SearchFieldConfig}
                    api={API.SPECIALITY_LIST}
                    getText={value => getTranslate(value, lang)}
                    params={{ ordering: 'name_' + lang }}
                    label2={t('resume_job_area', lang)}
                    trigger={lang}
                  />
                </div>
                <div className={classes.fields}>
                  <Field
                    name={`${field}.position`}
                    component={TextField}
                    label2={t('resume_position_select', lang)}
                  />
                </div>
                <div className={classes.fields}>
                  <Field
                    name={`${field}.country`}
                    component={SearchFieldConfig}
                    api={API.REGIONS_LIST}
                    getText={value => getTranslate(value, lang)}
                    params={{ type: 'country' }}
                    label2={t('resume_country', lang)}
                    trigger={lang}
                  />
                  {countryIsUzb &&
                  <React.Fragment>
                    <Field
                      name={`${field}.region`}
                      component={SearchFieldConfig}
                      api={API.REGIONS_LIST}
                      getText={value => getTranslate(value, lang)}
                      parent={country}
                      params={{ type: 'region', parent: country }}
                      label2={t('main_region', lang)}
                      trigger={lang}
                    />
                    {Boolean(region) &&
                    <Field
                      name={`${field}.city`}
                      component={SearchFieldConfig}
                      api={API.REGIONS_LIST}
                      getText={value => getTranslate(value, lang)}
                      parent={region}
                      params={{ type: 'city', parent: region }}
                      label2={t('resume_city', lang)}
                      trigger={lang}
                    />}
                  </React.Fragment>}
                  {(Boolean(country) && !countryIsUzb) &&
                  <Field
                    name={`${field}.newCity`}
                    component={TextField}
                    label2={t('resume_city', lang)}
                  />}
                </div>
                <div className={classes.time}>
                  <Field
                    name={`${field}.fromDate`}
                    component={CustomDateField}
                    label={t('resume_start_date', lang)}
                    type={'month'}
                  />
                  {!present && (
                    <Field
                      name={`${field}.toDate`}
                      component={CustomDateField}
                      label={t('resume_end_date', lang)}
                      type={'month'}
                    />
                  )}
                </div>
                <Field
                  name={`${field}.present`}
                  className={classes.itemMargin}
                  component={Checkbox}
                  label={t('resume_until_today', lang)}
                />

                <div className={classes.fields}>
                  <Field
                    name={`${field}.duties`}
                    rows={5}
                    component={TextAreaField}
                    label={t('resume_duties', lang)}
                    placeholder={t('resume_desc', lang)}
                  />
                </div>
                {fields.length > ONE &&
                <div className={classes.deleteBtn} onClick={() => fields.remove(index)}>
                  <DeleteIcon/>
                </div>}
              </div>
            )
          })}
        </div>
        <div onClick={() => fields.push({})} className={classes.addBtn}>
          {t('resume_add_work_exp', lang)}
        </div>
      </React.Fragment>}
    </div>)
}

ExpArrayField.propTypes = {
  lang: PropTypes.string,
  classes: PropTypes.object,
  isUpdate: PropTypes.bool,
  fields: PropTypes.object,
  hasExperience: PropTypes.bool
}

ExpArrayField.defaultProps = {
  isUpdate: false
}

export default enhance(ExpArrayField)
