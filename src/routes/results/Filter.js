import {
  ALTERNATE_COLOR,
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import {
  EXPERIENCES_LIST,
  EMPLOYMENT_TYPE,
  EDUCATION_LIST,
  GENDER_LIST,
  MARITAL_STATUS_LIST
} from 'constants/backend'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import mapKeys from 'lodash/mapKeys'
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { reduxForm, Field } from 'redux-form'
import { splitToArray } from 'helpers/joinSplitValues'
import toBoolean from 'helpers/toBoolean'
import t, { getTranslate } from 'helpers/translate'
import Spinner from 'icons/Spinner'
import {
  RadioGroup,
  Radio,
  CustomCheckBoxGroup
} from 'components/FormComponents'
import toSnakeCase from 'helpers/toSnakeCase'
import T from 'components/T'
import TW from 'components/TW'
import RenderOrNull from 'components/Utils/RenderOrNull'
import AppliedFilter from './AppliedFilter'

const replaceIrrelevant = (sourceArray) => {
  return [
    { id: '0', name: 'common_irrelevant' },
    ...fp.filter(item => item.id !== 'irrelevant', sourceArray)
  ]
}

const EDUCATION_LIST_2 = replaceIrrelevant(EDUCATION_LIST)
const GENDER_LIST_2 = replaceIrrelevant(GENDER_LIST)

const enhance = compose(
  reduxForm({
    form: 'SearchResultsForm',
    enableReinitialize: true
  }),

  injectSheet({
    wrapper: {
      padding: '60px 35px 35px 0',
      position: 'relative',
      '&:before': {
        background: 'inherit',
        content: '""',
        position: 'absolute',
        right: '100%',
        top: '0',
        bottom: '0',
        width: '100%'
      }
    },
    searchWrapper: {
      marginBottom: '50px'
    },
    saveSearch: {
      ...crossBrowserify('borderRadius', '25px'),
      ...crossBrowserify('transition', 'all 300ms'),
      border: '1px solid',
      color: MAIN_COLOR,
      cursor: 'pointer',
      display: 'inline-block',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '0 15px',
      marginBottom: '20px',
      '&:hover': {
        background: MAIN_COLOR,
        color: 'white'
      }
    },
    filterTitle: {
      borderLeft: `4px solid ${ALTERNATE_COLOR}`,
      fontSize: '13px',
      fontWeight: '600',
      lineHeight: '32px',
      padding: '0 45px',
      marginBottom: '65px'
    },
    searchField: {
      borderWidth: '1.5px',
      height: '36px',
      width: '285px'
    },
    radioContent: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginBottom: '16px',
      '&:last-child': {
        marginBottom: '0'
      },
      '& $radio': {
        marginBottom: '0'
      }
    },
    count: {
      color: LABEL_COLOR
    },
    radio: {
      display: 'block',
      marginBottom: '16px',
      marginRight: '0',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    field: {
      color: BLACK_COLOR,
      marginBottom: '27px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    xpandField: {
      extend: 'field',
      '&:not($xpand)': {
        '& $customCheckbox:nth-child(n + 6)': {
          display: 'none'
        },
        '& $customRadio:nth-child(n + 6)': {
          display: 'none'
        }
      }
    },
    xpand: {
      '& $value': {
        marginBottom: '20px'
      }
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.57',
      marginBottom: '15px'
    },
    value: {

    },
    customCheckbox: {

    },
    customRadio: {

    },
    list: {
      transition: 'all 300ms',
      cursor: 'pointer',
      fontSize: '15px',
      marginBottom: '26px',
      '&:hover': {
        color: '#333'
      }
    },
    expand: {
      color: '#a1a7b3',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '0 5px',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  })
)

const Filter = (props) => {
  const {
    isAuth,
    classes,
    resultFilter,
    professionsList,
    regionsList,
    languagesList,
    driverLicenseList,
    onClear,
    onFilterChange,
    initialValues,
    onSaveSearch,
    onSearch,
    type
  } = props

  const resultCounts = mapKeys(props.resultCounts, (val, key) => {
    switch (key) {
    case 'educationLevel': return 'education'
    case 'industry': return 'industries'
    case 'driverLicences': return 'driverLicense'
    case 'employmentTypes': return 'employmentType'
    default: return key
    }
  })

  const [expandIndustry, setExpandIndustry] = useState(false)
  const [expandSphere, setExpandSphere] = useState(false)
  const [expandLangs, setExpandLangs] = useState(false)
  const [expandRegions, setExpandRegions] = useState(false)

  const isCatalogue = toBoolean(resultFilter.getParam('catalogue'))
  const getFacetedData = fieldName => {
    const data = fp.get(fieldName, resultCounts)
    return loMap(data, (value, key) => fp.toInteger(key))
  }
  const facetedIndustries = getFacetedData('industries')
  const facetedSpecialities = getFacetedData('specialities')
  const facetedRegions = getFacetedData('region')

  const profList = fp.flow(
    fp.get('data'),
    fp.filter(item => fp.includes(item.id, facetedIndustries)),
    fp.sortBy(fp.get('nameRu'))
  )(professionsList)
  const profLoading = fp.get('loading', professionsList)
  const regList = fp.flow(
    fp.get('data'),
    fp.filter(item => fp.includes(item.id, facetedRegions))
  )(regionsList)
  const regLoading = fp.get('loading', regionsList)
  const langList = fp.get('data', languagesList)
  const langLoading = fp.get('loading', languagesList)
  const driverLicenseData = fp.get('data', driverLicenseList)
  const driverLicenseLoading = fp.get('loading', driverLicenseList)

  const showFilterFields = fp.includes(type, ['vacancy', 'resume'])

  const getSelectedUnselectedList = (fieldName, sourceList, isSelected) => {
    const selectedIDs = splitToArray(resultFilter.getParam(fieldName))
    const selectedList = fp.filter(item => {
      return fp.includes(fp.get('id', item), selectedIDs)
    }, sourceList)
    const unselectedList = fp.filter(item => {
      return !fp.includes(fp.get('id', item), selectedIDs)
    }, sourceList)
    return isSelected ? selectedList : unselectedList
  }

  const selectedIndustriesList = getSelectedUnselectedList('industries', profList, true)
  const unselectedIndustriesList = getSelectedUnselectedList('industries', profList, false)

  const specialitiesList = fp.flow(
    fp.map(fp.get('children')),
    fp.flatten,
    fp.filter(item => fp.includes(item.id, facetedSpecialities)),
    fp.sortBy(fp.get('nameRu'))
  )(selectedIndustriesList)

  const selectedSpecialitiesList = getSelectedUnselectedList('specialities', specialitiesList, true)
  const unselectedSpecialitiesList = getSelectedUnselectedList('specialities', specialitiesList, false)

  const getRadioButtons = (array, fieldName, { isStatic, radioClassName }) => {
    const counts = toSnakeCase(fp.get(fieldName, resultCounts))
    return (
      <TW>
        {(lang) => (
          <Field
            name={fieldName}
            component={RadioGroup}
            onChange={(ev, value) => onFilterChange({ value, fieldName })}
          >
            {fp.map(item => {
              const id = fp.get('id', item)
              const isStaticItem = fp.get('isStatic', item)
              const label = (isStaticItem || isStatic) ? t(item.name, lang) : getTranslate(item, lang)
              const count = fp.get(id, counts)
              return (
                <div className={classNames(classes.radioContent, radioClassName)} key={id}>
                  <Radio
                    className={classes.radio}
                    value={id}
                    label={label}
                  />
                  <span className={classes.count}>{count}</span>
                </div>
              )
            }, array)}
          </Field>
        )}
      </TW>
    )
  }

  const getExpandButton = (state, setState, list) => {
    const MIN_ITEMS_COUNT = 5
    if (list && list.length > MIN_ITEMS_COUNT) {
      return (
        <div
          className={classes.expand}
          onClick={() => setState(!state)}
        >
          <T>{state ? 'button_hide' : 'button_more'}</T>
        </div>
      )
    }
    return null
  }

  const getSpecialitiesFieldProps = (fieldName, lang) => {
    return {
      name: fieldName,
      component: CustomCheckBoxGroup,
      itemName: 'name' + fp.capitalize(lang),
      withCounts: true,
      counts: fp.get(fieldName, resultCounts),
      onChange: (event, value) => onFilterChange({ value, fieldName })
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchWrapper} />

      {!isCatalogue &&
      <>'       '{isAuth && <div onClick={onSaveSearch} className={classes.saveSearch}><T>button_save_search</T></div>}'       '<div className={classes.field}>
        <div className={classes.label}><T>main_search_by</T></div>
        <div className={classes.value}>
          <Field
            name="type"
            component={RadioGroup}
            onChange={(ev, value) => onFilterChange({ value, fieldName: 'type' })}
          >
            <TW>
              {(lang) => (
                <>'                   '<Radio className={classes.radio} label={t('main_vacancy', lang)} value="vacancy" />'                   '<Radio className={classes.radio} label={t('main_resume', lang)} value="resume" />'                   '<Radio className={classes.radio} label={t('main_companies', lang)} value="employer" />'                 '</>
              )}
            </TW>
          </Field>
        </div>
                                                                                                                                </div>'     '
      </>}

      <div className={classNames({
        [classes.xpandField]: true,
        [classes.xpand]: expandIndustry
      })}
      >
        <div className={classes.label}><T>main_sphere</T></div>
        {profLoading && fp.isEmpty(profList) && <Spinner />}
        <TW>
          {(lang) => {
            const fieldProps = getSpecialitiesFieldProps('industries', lang)
            return (
              <>'               '<Field
                {...fieldProps}
                items={selectedIndustriesList}
              />'               '<div className={classes.value}>
                                   <Field
                  {...fieldProps}
                  items={unselectedIndustriesList}
                  className={classes.customCheckbox}
                />
                                                    </div>'             '
              </>
            )
          }}
        </TW>
        {getExpandButton(expandIndustry, setExpandIndustry, profList)}
      </div>

      <RenderOrNull value={specialitiesList}>
        {type !== 'employer' &&
        <div className={classNames({
          [classes.xpandField]: true,
          [classes.xpand]: expandSphere
        })}
        >
          <div className={classes.label}><T>resume_specialty</T></div>
          <TW>
            {(lang) => {
              const fieldProps = getSpecialitiesFieldProps('specialities', lang)
              return (
                <>'                 '<Field
                  {...fieldProps}
                  items={selectedSpecialitiesList}
                />'                 '<div className={classes.value}>
                                       <Field
                    {...fieldProps}
                    items={unselectedSpecialitiesList}
                    className={classes.customCheckbox}
                  />
                                                          </div>'               '
                </>
              )
            }}
          </TW>
          {getExpandButton(expandSphere, setExpandSphere, specialitiesList)}
        </div>}
      </RenderOrNull>
      {showFilterFields &&
      <>'       '<div>
        {false && (
          <AppliedFilter
            profList={profList}
            regList={regList}
            onSaveSearch={onSaveSearch}
            onClear={onClear}
          />
        )}
                 </div>'
       '<div className={classes.field}>
         <div className={classes.label}><T>main_work_experience</T></div>
         <div className={classes.value}>
          {getRadioButtons(EXPERIENCES_LIST, 'experience', { isStatic: true })}
        </div>
        </div>'
       '<div className={classes.field}>
         <div className={classes.label}><T>main_education</T></div>
         {getRadioButtons(EDUCATION_LIST_2, 'education', { isStatic: true })}
        </div>'
       '{type === 'resume' && <>'         '<div className={classes.field}>
        <div className={classes.label}><T>main_sex</T></div>
        <div className={classes.value}>
           {getRadioButtons(GENDER_LIST_2, 'gender', { isStatic: true })}
         </div>
      </div>'         '<div className={classes.field}>
                                             <div className={classes.label}><T>main_marital_status</T></div>
                                             <div className={classes.value}>
          {getRadioButtons(MARITAL_STATUS_LIST, 'maritalStatus', { isStatic: true })}
        </div>
      </div>'         '<div className={classNames({
        [classes.xpandField]: true,
        [classes.xpand]: expandLangs
      })}
                                        >
                         <div className={classes.label}><T>main_language_knowledge</T></div>
                         <div className={classes.value}>
          <Field
                             name="languages"
                             component={CustomCheckBoxGroup}
                             items={langList}
                             itemName="name"
                             className={classes.customCheckbox}
                             onChange={(ev, value) => {
              onFilterChange({ value, fieldName: 'languages' })
            }}
                             withCounts={true}
                             counts={fp.get('languages', resultCounts)}
                           />
        </div>
                         {getExpandButton(expandLangs, setExpandLangs, langList)}
      </div>'
         '<div className={classes.field}>
        <div className={classes.label}><T>main_driver_license</T></div>
        <div className={classes.value}>
             <Field
            name="driverLicense"
            component={CustomCheckBoxGroup}
            items={driverLicenseData}
            itemName="title"
            type="block"
            withCounts={true}
            counts={fp.get('driverLicense', resultCounts)}
            onChange={(ev, value) => onFilterChange({ value, fieldName: 'driverLicense' })}
          />
           </div>
      </div>'
         '<div className={classes.field}>
        <div className={classes.label}><T>main_photo_availability</T></div>
        <div className={classes.value}>
             {getRadioButtons([
            { id: '1', name: 'main_with_photo' },
            { id: '0', name: 'main_without_photo' },
            { id: 'null', name: 'common_irrelevant' }
          ], 'withPhoto', { isStatic: true })}
           </div>
      </div>'       '
                              </>}'       '<div className={classes.field}>
                                <div className={classes.label}><T>main_schedule</T></div>
                                <div className={classes.value}>
                                  <TW>
                                    {(lang) => (
                                      <Field
                                        name="employmentType"
                                        component={CustomCheckBoxGroup}
                                        withCounts={true}
                                        counts={toSnakeCase(fp.get('employmentType', resultCounts))}
                                        items={fp.map(item => {
                                          return {
                                            ...item,
                                            name: t(item.name, lang)
                                          }
                                        }, EMPLOYMENT_TYPE)}
                                        itemName="name"
                                        onChange={(ev, value) => onFilterChange({ value, fieldName: 'employmentType' })}
                                      />
                                    )}
                                  </TW>
                                </div>
                                           </div>'       '<RenderOrNull value={regList}>
                                <div className={classNames({
                                  [classes.xpandField]: true,
                                  [classes.xpand]: expandRegions
                                })}
                                             >
                                               <div className={classes.label}><T>main_region</T></div>
                                               <div className={classes.value}>
                                    {getRadioButtons(
                                      [{ id: 'null', name: 'common_irrelevant', isStatic: true }, ...regList],
                                      'region', {
                                        isStatic: false,
                                        radioClassName: classes.customRadio
                                      }
                                    )}
                                    {false && <Field
                                                   name="region"
                                                   component={RadioGroup}
                                                   onChange={(ev, value) => onFilterChange({ value, fieldName: 'region' })}
                                                           >
                                                   <TW>
                                        {(lang) => fp.map(item => {
                                          return (
                                            <>'                       '<Radio
                                              value=""
                                              className={classNames(classes.radio, classes.customRadio)}
                                              label={getTranslate('common_irrelevant', lang)}
                                            />'                       '<Radio
                                                                         key={item.id}
                                                                         className={classNames(classes.radio, classes.customRadio)}
                                                                         value={item.id}
                                                                         label={getTranslate(item, lang)}
                                                                                                  />'                     '
                                            </>
                                          )
                                        }, regList)}
                                      </TW>
                                                           </Field>}
                                  </div>
                                               {getExpandButton(expandRegions, setExpandRegions, regList)}
                                             </div>
                                             </RenderOrNull>'     '
      </>}
    </div>
  )
}

Filter.propTypes = {
  isAuth: propTypes.bool,
  classes: propTypes.object,
  resultFilter: propTypes.object,
  resultCounts: propTypes.object,
  initialValues: propTypes.object.isRequired,
  professionsList: propTypes.object.isRequired,
  regionsList: propTypes.object.isRequired,
  languagesList: propTypes.object.isRequired,
  driverLicenseList: propTypes.object.isRequired,
  onFilterChange: propTypes.func.isRequired,
  onSaveSearch: propTypes.func.isRequired,
  onClear: propTypes.func.isRequired,
  onSearch: propTypes.func.isRequired,
  type: propTypes.string
}
export default enhance(Filter)
