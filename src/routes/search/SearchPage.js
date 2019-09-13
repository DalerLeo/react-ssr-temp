import fp from 'lodash/fp'
import React, { useEffect } from 'react'
import {
  compose,
  withState,
  withHandlers,
  mapPropsStream
} from 'recompose'
import injectSheet from 'react-jss'
import propTypes from 'prop-types'
import {
  reduxForm,
  Field,
  FieldArray,
  initialize,
  getFormValues,
  change
} from 'redux-form'
import { connect } from 'react-redux'
import MdSearch from 'react-icons/lib/md/search'
import {
  crossBrowserify,
  fallbacksStyle,
  PRIMARY_COLOR,
  BACKGROUND,
  ROLL_UP_FADE_IN
} from 'constants/styles'
import {
  EXPERIENCES_LIST,
  EMPLOYMENT_TYPE,
  EDUCATION_LIST,
  GENDER_LIST,
  MARITAL_STATUS_LIST
} from 'constants/backend'
import * as API from 'constants/api'
import * as ROUTE from 'constants/routes'
import withHistory from 'helpers/withHistory'
import queryToParams from 'helpers/queryToParams'
import paramsToQuery from 'helpers/paramsToQuery'
import t, { getTranslate } from 'helpers/translate'
import { joinArray } from 'helpers/joinSplitValues'
import { normalizeNumber } from 'helpers/normalizeNumber'
import { getStateData } from 'helpers/get'
import { getDriverLicenseList, getCurrencyList } from 'routes/action-common'
import Title from 'components/Title'
import Container from 'components/Container'
import T from 'components/T'
import TW from 'components/TW'
import { Button } from 'components/Button'
import {
  ModelSelectField,
  RadioGroup,
  Label2,
  Radio,
  TextField,
  SearchFieldConfig,
  Checkbox,
  CustomCheckBoxGroup
} from 'components/FormComponents'
import LanguagesField from 'components/FormComponents/SearchFilter/LanguagesField'

const formName = 'SearchForm'
const enhance = compose(
  withHistory,
  reduxForm({
    form: formName,
    enableReinitialize: true
  }),
  connect(state => ({
    formValues: getFormValues(formName)(state),
    ...getStateData('common.driverLicence', 'driverLicense', state, false),
    ...getStateData('common.currency', 'currency', state, false)
  }), {
    getDriverLicenseList,
    getCurrencyList,
    change
  }),
  mapPropsStream($props => {
    $props
      .first()
      .subscribe(props => {
        props.getDriverLicenseList()
        props.getCurrencyList()
      })
    return $props
  }),
  withHandlers({
    onSearch: props => () => {
      const { history, formValues } = props
      const employmentType = joinArray(fp.get('employmentType', formValues))
      const filteredFormValues = fp.omit(['sphere'], formValues)

      const industries = fp.flow(
        fp.get('sphere'),
        fp.filter(fp.get('isFull')),
        fp.map(fp.get('parent')),
        joinArray
      )(formValues)

      const specialities = fp.flow(
        fp.get('sphere'),
        fp.filter(item => !fp.get('isFull', item)),
        fp.map(item => {
          return fp.map(fp.get('id'), fp.get('children', item))
        }),
        fp.flatten,
        joinArray
      )(formValues)

      const languages = fp.flow(
        fp.get('languages'),
        fp.map(item => fp.get('language', item)),
        joinArray
      )(formValues)

      const driverLicense = joinArray(fp.get('driverLicense', formValues))

      return history.push({
        pathname: ROUTE.SEARCH_RESULTS_URL,
        search: queryToParams({
          ...filteredFormValues,
          employmentType,
          driverLicense,
          languages,
          industries,
          specialities
        })
      })
    }
  }),
  withState('visible', 'setVisible', false),
  injectSheet({
    ...ROLL_UP_FADE_IN,
    header: {
      marginTop: '32px',
      marginBottom: '38px'
    },
    content: {
      animationName: 'rollUpFadeIn',
      animationDuration: '1s',
      position: 'relative',
      padding: '70px 0 75px 226px',
      maxWidth: '870px'
    },
    itemMargin: {
      margin: '14px 0 0 18px'
    },
    marginTop: {
      marginTop: '40px'
    },
    field: {
      marginTop: '40px'
    },
    flexField: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      '& > div:not(:last-child)': {
        marginRight: '30px'
      }
    },
    salary: {
      marginTop: '40px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'flex-end'),
      '& > div:first-child': {
        marginRight: '10px'
      }
    },

    radio: {
      display: 'block',
      lineHeight: 'normal',
      marginBottom: '18px',
      marginRight: '0',
      marginLeft: '18px',
      '&:last-child': {
        marginBottom: '0'
      }
    },

    saveChanges: {
      color: PRIMARY_COLOR,
      cursor: 'pointer',
      fontSize: '15px',
      marginRight: '36px'
    }
  })
)

const searchKeys = [
  { value: 'vacancy', label: 'main_vacancy' },
  { value: 'resume', label: 'main_resume' }
]

const SearchPage = (props) => {
  const {
    classes,
    onSearch,
    formValues,
    driverLicenseList,
    ...rest
  } = props

  useEffect(() => {
    const { dispatch, history } = rest
    const initialType = fp.get('type', paramsToQuery(history.location.search))
    const initialValues = {
      type: initialType,
      currency: '2',
      employmentType: [],
      languages: [{}]
    }
    dispatch(initialize(formName, initialValues))
  }, [])

  const type = fp.get('type', formValues)
  const sphere = fp.get('sphere', formValues)

  return (
    <div style={{ backgroundColor: BACKGROUND }}>
      <Container className={classes.wrapper}>
        <div className={classes.content}>
          <Title text={<T>search_advanced_title</T>}/>
          <TW>
            {(lang) => (
              <Field
                name={'text'}
                component={TextField}
                big={true}
                placeholder={t('main_search', lang)}
                prefix={<MdSearch color={'#c6cbd4'}/>}
              />
            )}
          </TW>
          <TW>
            {(lang) => (
              <Field
                className={classes.itemMargin}
                component={RadioGroup}
                name={'type'}
                items={fp.map(item => ({
                  ...item, label: t(item.label, lang)
                }), searchKeys)}
                onChange={(event, value) => {
                  const clearFields = fieldNames => fp.forEach(fieldName => {
                    const fieldValue = fp.get(fieldName, formValues)
                    if (fieldValue) rest.change(formName, fieldName, '')
                  }, fieldNames)
                  if (value === 'resume') {
                    const fieldNames = ['education', 'minSalary', 'experience', 'employmentType']
                    clearFields(fieldNames)
                  }
                  if (value === 'vacancy') {
                    const fieldNames = [
                      'minAge',
                      'maxAge',
                      'driverLicense',
                      'gender',
                      'maritalStatus',
                      'minSalary',
                      'experience',
                      'employmentType'
                    ]
                    const languages = fp.get('languages', formValues)
                    if (!fp.isEmpty(languages)) {
                      rest.change(formName, 'languages', [{}])
                    }
                    clearFields(fieldNames)
                  }
                }}
              />
            )}
          </TW>
          <TW>
            {(lang) => (
              <Field
                className={classes.marginTop}
                component={ModelSelectField}
                label={t('main_sphere', lang)}
                selectLabel={fp.isEmpty(sphere)
                  ? t('main_sphere_select', lang)
                  : t('button_change', lang)}
                api={API.PROFESSIONS_LIST}
                name={'sphere'}
                lang={lang}
              />
            )}
          </TW>
          <TW>
            {(lang) => (
              <div>
                <Field
                  name={'region'}
                  label2={t('main_region', lang)}
                  placeholder={t('main_region_select', lang)}
                  className={classes.marginTop}
                  component={SearchFieldConfig}
                  getText={(value) => getTranslate(value, lang)}
                  pageSize={1000}
                  api={API.REGIONS_LIST}
                  trigger={lang}
                  params={{ ordering: 'name', type: 'region' }}
                />
              </div>
            )}
          </TW>

          {type === 'resume'
            ? <React.Fragment>
              <div className={classes.field}>
                <Label2 label={<T>main_age</T>}/>
                <div className={classes.flexField}>
                  <TW>
                    {(lang) => (
                      <React.Fragment>
                        <Field
                          name={'minAge'}
                          component={TextField}
                          placeholder={t('main_from', lang)}
                          width={'150px'}
                        />
                        <Field
                          name={'maxAge'}
                          component={TextField}
                          placeholder={t('main_to', lang)}
                          width={'150px'}
                        />
                      </React.Fragment>
                    )}
                  </TW>
                </div>
              </div>
              <div className={classes.field}>
                <FieldArray
                  name={'languages'}
                  component={LanguagesField}
                />
              </div>
              <div className={classes.field}>
                <Label2 label={<T>main_driver_license</T>}/>
                <div className={classes.itemMargin}>
                  <Field
                    name={'driverLicense'}
                    component={CustomCheckBoxGroup}
                    items={driverLicenseList.data}
                    itemName={'title'}
                    type={'inline'}
                  />
                </div>
              </div>
              <div className={classes.field}>
                <Label2 label={<T>main_sex</T>}/>
                <Field name={'gender'} component={RadioGroup}>
                  <TW>
                    {(lang) => fp.map((item) => {
                      return (
                        <Radio
                          key={item.id}
                          className={classes.radio}
                          label={t(item.name, lang)}
                          value={item.id}
                        />
                      )
                    }, GENDER_LIST)}
                  </TW>
                </Field>
              </div>
              <div className={classes.field}>
                <Label2 label={<T>main_marital_status</T>}/>
                <Field name={'maritalStatus'} component={RadioGroup}>
                  <TW>
                    {(lang) => fp.map((item) => {
                      return (
                        <Radio
                          key={item.id}
                          className={classes.radio}
                          label={t(item.name, lang)}
                          value={item.id}
                        />
                      )
                    }, MARITAL_STATUS_LIST)}
                  </TW>
                </Field>
              </div>
            </React.Fragment>
            : <React.Fragment>
              <div className={classes.field}>
                <Label2 label={<T>main_education_level</T>}/>
                <div className={classes.itemMargin}>
                  <TW>
                    {(lang) => (
                      <Field
                        name={'education'}
                        component={CustomCheckBoxGroup}
                        items={fp.map(item => ({
                          id: item.id,
                          name: t(item.name, lang)
                        }), EDUCATION_LIST)}
                      />
                    )}
                  </TW>
                </div>
              </div>
            </React.Fragment>}

          <div className={classes.salary}>
            <TW>
              {(lang) => (
                <Field
                  name={'minSalary'}
                  component={TextField}
                  width={'270px'}
                  label2={t('main_salary_from', lang)}
                  normalize={normalizeNumber}
                />
              )}
            </TW>
            <Field
              name={'currency'}
              api={API.CURRENCY_LIST}
              component={SearchFieldConfig}
              width={'78px'}
            />
          </div>

          <div>
            <TW>
              {(lang) => (
                <Field
                  name={'hideWithoutSalary'}
                  className={classes.itemMargin}
                  component={Checkbox}
                  label={t('main_filter_salary_none', lang)}
                />
              )}
            </TW>
          </div>

          <div className={classes.marginTop}>
            <TW>
              {(lang) => (
                <React.Fragment>
                  <Label2 label={t('main_work_experience', lang)}/>
                  <Field name={'experience'} component={RadioGroup}>
                    {fp.map((item) => {
                      return (
                        <Radio
                          key={item.id}
                          className={classes.radio}
                          label={t(item.name, lang)}
                          value={item.id}
                        />
                      )
                    }, EXPERIENCES_LIST)}
                  </Field>
                </React.Fragment>
              )}
            </TW>
          </div>

          <div className={classes.marginTop}>
            <TW>
              {(lang) => (
                <React.Fragment>
                  <Label2 label={t('main_type_of_employment', lang)}/>
                  <div className={classes.itemMargin}>
                    <Field
                      name={'employmentType'}
                      component={CustomCheckBoxGroup}
                      items={fp.map(item => ({
                        id: item.id,
                        name: t(item.name, lang)
                      }), EMPLOYMENT_TYPE)}
                    />
                  </div>
                </React.Fragment>
              )}
            </TW>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Button
              onClick={onSearch}
              type={'medium'}
              fullWidth>
              <T>button_find</T>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

SearchPage.propTypes = {
  classes: propTypes.object,
  history: propTypes.object,
  formValues: propTypes.object,
  visible: propTypes.bool,
  onSearch: propTypes.func,
  setVisible: propTypes.func,
  driverLicenseList: propTypes.object.isRequired
}

export default enhance(SearchPage)
