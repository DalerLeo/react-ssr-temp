/* eslint-disable react/prop-types */
import fp from 'lodash/fp'
import React from 'react'
import Title from 'components/Title'
import { Field } from 'redux-form'
import { EMP_FORM } from 'constants/backend'
import * as API from 'constants/api'
import t, { getTranslate } from 'helpers/translate'
import {
  Checkbox,
  ImageUploadField,
  SearchFieldConfig,
  TextAreaField,
  TextField,
  Label
} from 'components/FormComponents'
import T from 'components/T'
import TW from 'components/TW'
import ProfilePic from 'components/ProfilePic'
import RenderOrNull from 'components/Utils/RenderOrNull'

const EmployerForm = ({ classes, userData, authFields }) => {
  const managerName = fp.get(['manager', 'fullName'], userData)
  const managerPhone = fp.get(['manager', 'phone'], userData)
  const managerEmail = fp.get(['manager', 'email'], userData)
  const managerPhoto = fp.get(['manager', 'photo', 'file'], userData)
  return (
    <React.Fragment>
      <Title isStatic={true} medium margin="0 0 15px 0" text={'main_info'}/>
      <div className={classes.picTitle}><T>company_photo</T></div>
      <TW>
        {lang => (
          <Field
            name={'logo'}
            label={t('button_simple_edit', lang)}
            component={ImageUploadField}
          />
        )}
      </TW>

      <div style={{ marginTop: '26px' }}>
        <TW>
          {lang => <Label label={t('register_emp_form', lang)} required={true}/>}
        </TW>
        <div className={classes.name}>
          <TW>
            {lang => (
              <React.Fragment>
                <Field
                  name={'form'}
                  margin={'0 10px 0 0'}
                  isStatic={true}
                  items={EMP_FORM}
                  component={SearchFieldConfig}
                  width={'124px'}
                />
                <Field
                  name={'title'}
                  placeholder={t('register_emp_title', lang)}
                  component={TextField}
                  width={'100%'}
                />
              </React.Fragment>
            )}
          </TW>
        </div>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <TW>
          {lang => (
            <Field
              disabled={true}
              name={'isRecruiter'}
              className={classes.itemMargin}
              component={Checkbox}
              required={true}
              label={t('register_emp_recruiter', lang)}
            />
          )}
        </TW>
      </div>
      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              name={'trademark'}
              label2={t('company_trademark', lang)}
              component={TextField}
            />
          )}
        </TW>
      </div>

      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              name={'industry'}
              label2={t('main_sphere', lang)}
              api={API.SPECIALITY_LIST}
              trigger={lang}
              getText={value => getTranslate(value, lang)}
              params={{ parents_only: true, ordering: 'name_' + lang }}
              component={SearchFieldConfig}
            />
          )}
        </TW>
      </div>

      <div className={classes.field}>
        <TW>
          {lang => (
            <Field
              name={'foundationDate'}
              label2={t('company_est_year', lang)}
              component={TextField}
            />
          )}
        </TW>
        <TW>
          {lang => (
            <Field
              component={TextField}
              name={'staffSize'}
              label2={t('company_staff_count', lang)}
            />
          )}
        </TW>
      </div>

      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              name={'address'}
              label2={t('company_address', lang)}
              component={TextField}
            />
          )}
        </TW>
      </div>
      <div className={classes.field}>
        <TW>
          {lang => (
            <Field
              component={TextField}
              name={'phone'}
              label2={t('company_phone', lang)}
            />
          )}
        </TW>
        <TW>
          {lang => (
            <Field
              component={TextField}
              name={'extraPhone'}
              label2={t('company_phone_extra', lang)}
            />
          )}
        </TW>
      </div>
      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              component={TextField}
              name={'contactPerson'}
              label2={t('company_contact_person', lang)}
            />
          )}
        </TW>
      </div>

      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              name={'siteUrl'}
              label2={t('company_website', lang)}
              component={TextField}
            />
          )}
        </TW>
      </div>

      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              name={'bankRequisites'}
              label={t('company_requisites', lang)}
              placeholder={t('company_requisites_placeholder', lang)}
              component={TextAreaField}
            />
          )}
        </TW>
      </div>

      <div className={classes.fieldOne}>
        <TW>
          {lang => (
            <Field
              name={'description'}
              label={t('company_description', lang)}
              component={TextAreaField}
            />
          )}
        </TW>
      </div>
      <div className={classes.line}/>
      {authFields}
      <RenderOrNull value={managerName}>
        <div className={classes.managerWrap}>
          <Title medium isStatic={true} margin="0 0 15px 0" text={'company_personal_manager'}/>
          <div className={classes.manager}>
            <ProfilePic image={managerPhoto} type={'mini'}/>
            <div style={{ marginLeft: '18px' }}>
              <div>{managerName}</div>
              <div className={classes.managerContact}>{managerPhone}</div>
              <div className={classes.managerContact}>{managerEmail}</div>
            </div>
          </div>
        </div>
      </RenderOrNull>
    </React.Fragment>
  )
}

export default EmployerForm
