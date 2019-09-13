/* eslint-disable react/prop-types */
import fp from 'lodash/fp'
import React from 'react'
import { Field, FieldArray } from 'redux-form'
import * as API from 'constants/api'
import {
  GENDER_LIST,
  MARITAL_STATUS_LIST,
  MONTH_LIST,
  APPLICANT_STATUSES
} from 'constants/backend'
import t, { getTranslate } from 'helpers/translate'
import {
  ImageUploadField,
  SearchFieldConfig,
  TextField,
  Label2
} from 'components/FormComponents'
import ContactsArrayField from 'components/FormComponents/ContactsArrayField'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'

const ApplicantForm = ({ classes, authFields }) => {
  return (
    <React.Fragment>
      <Title medium isStatic={true} margin="0 0 15px 0" text={'register_app_personal'}/>
      <div className={classes.picTitle}><T>register_app_photo</T></div>
      <Field name={'photo'} component={ImageUploadField}/>

      <div style={{ marginTop: '26px' }} className={classes.field}>
        <TW>
          {lang => (
            <Field
              component={TextField}
              name={'name'}
              label2={t('register_app_name', lang)}
            />
          )}
        </TW>
        <TW>
          {lang => (
            <div>
              <Label2 label={t('register_app_birthdate', lang)}/>
              <div className={classes.birthdate}>
                <Field
                  component={TextField}
                  name={'day'}
                  width={'55px'}
                />
                <Field
                  isStatic={true}
                  name={'month'}
                  component={SearchFieldConfig}
                  items={MONTH_LIST}
                  margin={'0'}
                  width={'calc(100% - 160px)'}
                />
                <Field
                  component={TextField}
                  width={'75px'}
                  name={'year'}
                />
              </div>
            </div>
          )}
        </TW>
      </div>
      <div className={classes.field}>
        <TW>
          {lang => (
            <React.Fragment>
              <Field
                component={SearchFieldConfig}
                api={API.REGIONS_LIST}
                params={{ type: 'city' }}
                pageSize={200}
                name={'livingPlace'}
                getText={value => getTranslate(value, lang)}
                label2={t('applicant_living_place', lang)}
                trigger={lang}
              />
              <Field
                component={SearchFieldConfig}
                isStatic={true}
                name={'gender'}
                items={fp.filter(item => item.id !== 'irrelevant', GENDER_LIST)}
                label2={t('main_sex', lang)}
              />
            </React.Fragment>
          )}
        </TW>
      </div>
      <div className={classes.field}>
        <TW>
          {lang => (
            <React.Fragment>
              <Field
                component={SearchFieldConfig}
                items={MARITAL_STATUS_LIST}
                isStatic={true}
                name={'maritalStatus'}
                label2={t('main_marital_status', lang)}
              />
              <Field
                component={SearchFieldConfig}
                items={APPLICANT_STATUSES}
                isStatic={true}
                name={'searchWorkStatus'}
                label2={t('emp_status_title', lang)}
              />
            </React.Fragment>
          )}
        </TW>
      </div>
      <div className={classes.contacts}>
        <Title medium isStatic={true} margin="0 0 15px 0" text={'footer_contact'}/>

        <div className={classes.field}>
          <TW>
            {lang => (
              <React.Fragment>
                <Field
                  component={TextField}
                  name={'phone'}
                  label2={t('register_app_phone', lang)}
                />
                <Field
                  component={TextField}
                  name={'extraPhone'}
                  label2={t('company_phone_extra', lang)}
                />
              </React.Fragment>
            )}
          </TW>
        </div>

        <TW>
          {lang => (
            <FieldArray
              name='otherContacts'
              component={ContactsArrayField}
              lang={lang}
            />
          )}
        </TW>
      </div>
      {authFields}
    </React.Fragment>
  )
}

export default ApplicantForm
