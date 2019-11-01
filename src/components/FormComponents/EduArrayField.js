import * as API from 'constants/api'
import {
  crossBrowserify,
  fallbacksStyle,
  fieldArrayStyles, ONE
} from 'constants/styles'
import { EDUCATION_LIST } from 'constants/backend'
import React from 'react'
import { compose } from 'recompose'
import fp from 'lodash/fp'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import t from 'helpers/translate'
import T from 'components/T'
import Title from 'components/Title'
import DeleteIcon from 'icons/Delete'
import TextField from './TextField/TextField'
import SearchFieldConfig from './SearchFieldConfig'
import { Checkbox, CustomDateField } from './index'

const enhance = compose(
  injectSheet({
    ...fieldArrayStyles,
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
      marginLeft: '20px !important'
    }
  })
)

const EduArrayField = (props) => {
  const { lang, classes, fields, extra, onUniverCreate } = props
  const onAdd = () => {
    fields.push({})
  }
  return (
    <div className={classes.wrapper}>
      <Title
        isStatic={true}
        medium={true}
        margin="0 0 30px"
        text={extra ? 'main_extra_education' : 'main_education'}
      />
      <div>
        {fields.map((field, index) => {
          const present = fp.get('present', fields.get(index))
          const country = fp.get('country', fields.get(index))
          const type = fp.get('educationLevel', fields.get(index))
          const hideFields = fp.includes(type, ['average', 'lower_secondary'])
          return (
            <div className={classes.listItem} key={index}>
              {!extra &&
              <div className={classes.fields}>
                <Field
                  name={`${field}.educationLevel`}
                  isStatic={true}
                  component={SearchFieldConfig}
                  items={fp.filter(item => item.id !== 'irrelevant', EDUCATION_LIST)}
                  label2={t('main_education_level', lang)}
                />
              </div>}
              {false &&
              <div className={classes.fields}>
                <Field
                  name={`${field}.country`}
                  component={SearchFieldConfig}
                  api={API.REGIONS_LIST}
                  itemName="nameRu"
                  params={{ type: 'region' }}
                  label2="Город обучения"
                />
              </div>}
              {!hideFields &&
              <>'               '<div className={classes.fields}>
                <Field
                  name={`${field}.institution`}
                  label2={t('resume_institution', lang)}
                  component={SearchFieldConfig}
                  api={API.INSTITUTION_LIST}
                  disableOpenOnFocus={true}
                  onBlur={(event, univer) => {
                    onUniverCreate({
                      univer,
                      country,
                      fieldName: field,
                      type
                    })
                  }}
                />
                                 </div>'               '{!extra && <div className={classes.fields}>
                <Field
                                     name={`${field}.faculty`}
                                     component={TextField}
                                     label2={t('resume_faculty', lang)}
                                   />
                                                </div>}'               '<div className={classes.fields}>
                <Field
                                                    name={`${field}.speciality`}
                                                    component={TextField}
                                                    label2={t('resume_specialty', lang)}
                                                  />
                                      </div>'             '
              </>}
              <div className={classes.time}>
                <Field
                  name={`${field}.fromDate`}
                  component={CustomDateField}
                  label={t('resume_start_edu', lang)}
                  type="month"
                />
                {!present && (
                  <Field
                    name={`${field}.toDate`}
                    component={CustomDateField}
                    label={t('resume_end_edu', lang)}
                    type="month"
                  />
                )}
              </div>
              <Field
                name={`${field}.present`}
                className={classes.itemMargin}
                component={Checkbox}
                label={t('resume_until_edu', lang)}
              />
              {fields.length > ONE &&
              <div className={classes.deleteBtn} onClick={() => fields.remove(index)}>
                <DeleteIcon />
              </div>}
            </div>
          )
        })}
      </div>
      <div onClick={onAdd} className={classes.addBtn}>
        <T>{extra ? 'resume_add_extra_education' : 'resume_add_education'}</T>
      </div>
    </div>
  )
}

EduArrayField.propTypes = {
  lang: PropTypes.string,
  classes: PropTypes.object,
  fields: PropTypes.object,
  extra: PropTypes.bool,
  onUniverCreate: PropTypes.func,
  label: PropTypes.string
}
export default enhance(EduArrayField)
