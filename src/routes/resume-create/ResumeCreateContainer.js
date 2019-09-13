import fpGet from 'lodash/fp/get'
import fp from 'lodash/fp'
import sprintf from 'sprintf'
import {
  pure,
  compose,
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'
import { RESUME_EDIT_VIEW, RESUME_ITEM, APPLICANT_ITEM_URL } from 'constants/routes'
import { getItemStateData, getSalary, getStateData } from 'helpers/get'
import { dateObjectFormat } from 'helpers/customDate'
import { queryToParams } from 'helpers'
import { scrollToBlock } from 'helpers/scroll'
import formValidate from 'helpers/formValidate'
import withHistory from 'helpers/withHistory'
import setGlobalLoader from 'helpers/setGlobalLoader'
import {
  getSpecialityList,
  getInstitutionList,
  institutionCreateAction,
  countryListAction,
  languageListAction,
  getDriverLicenseList
} from '../action-common'
import {
  createResumeAction,
  updateResumeAction,
  resumeFetchItem
} from './actions'
import ResumeCreate from './ResumeCreate'

const mapDispatchToProps = {
  formValidate,
  resumeFetchItem,
  createResumeAction,
  updateResumeAction,
  getSpecialityList,
  getInstitutionList,
  institutionCreateAction,
  countryListAction,
  languageListAction,
  setGlobalLoader,
  getDriverLicenseList,
  changeForm: change
}

const mapStateToProps = (state) => {
  return {
    ...getItemStateData('resume.item', 'resume', state),
    ...getStateData('common.driverLicence', 'licence', state),
    ...getStateData('common.currency', 'currency', state),
    ...getStateData('common.speciality', 'speciality', state),
    ...getStateData('common.country', 'country', state),
    ...getStateData('common.language', 'language', state),
    ...getStateData('common.institution', 'institution', state),
    ...getItemStateData('user', 'user', state),
    userData: fp.get('user.data', state),
    formValues: getFormValues('ResumeCreate')(state) || {}
  }
}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  pure,
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        if (props.id) {
          props.setGlobalLoader(true)
          props.resumeFetchItem(props.id)
            .then(() => props.setGlobalLoader(false))
        }
      })

    props$
      .first()
      .filter(fp.flow(fp.get('specialityList.data'), fp.isEmpty))
      .subscribe(props => props.getSpecialityList({ pageSize: '1000', parentsOnly: 'false' }))

    props$
      .first()
      .filter(fp.flow(fp.get('languageList.data'), fp.isEmpty))
      .subscribe(props => props.languageListAction())

    props$
      .first()
      .filter(fp.flow(fp.get('countryList.data'), fp.isEmpty))
      .subscribe(props => props.countryListAction())

    props$
      .first()
      .filter(fp.flow(fp.get('institutionList.data'), fp.isEmpty))
      .subscribe(props => props.getInstitutionList({ pageSize: '1000' }))

    props$
      .first()
      .filter(fp.flow(fp.get('licenceList.data'), fp.isEmpty))
      .subscribe(props => props.getDriverLicenseList())

    const { handler: onTabChange, stream: onTabChange$ } = createEventHandler()
    const { handler: onSubmit, stream: onSubmit$ } = createEventHandler()
    const { handler: onUpdate, stream: onUpdate$ } = createEventHandler()
    const { handler: onPreview, stream: onPreview$ } = createEventHandler()
    const { handler: onResumeLater, stream: onResumeLater$ } = createEventHandler()
    const { handler: onUniverCreate, stream: onUniverCreate$ } = createEventHandler()

    onUniverCreate$
      .withLatestFrom(props$)
      .subscribe(([{ univer, fieldName, ...others }, { ...props }]) => {
        const institution = fp.toInteger(univer)
        if (univer && !institution) {
          props.institutionCreateAction({ name_en: univer, ...others })
            .then(({ value }) => {
              props.changeForm('ResumeCreate', `${fieldName}[institution]`, value.id)
            })
        }
      })

    onTabChange$
      .withLatestFrom(props$)
      .subscribe(([value, { history, tab, pathname }]) => {
        return history.replace(pathname, { 'smooth': true })
      })

    onPreview$
      .withLatestFrom(props$)
      .subscribe(([, props]) => {
        const { formValues } = props
        props.setGlobalLoader(true)
        return props.createResumeAction({ ...formValues, isTemp: true })
          .then(({ value }) => {
            props.setGlobalLoader(false)
            const pathname = sprintf(RESUME_ITEM, value.id) + queryToParams({ isTemp: true })
            window.open(pathname, '_blank')
          })
          .catch(error => {
            props.history.replace(props.history.location.pathname, { smooth: true })
            return props.formValidate('ResumeCreate', error)
          })
      })

    onResumeLater$
      .withLatestFrom(props$)
      .subscribe(([, props]) => {
        const { formValues } = props
        props.setGlobalLoader(true)
        return props.createResumeAction({ ...formValues, isTemp: true })
          .then(() => {
            props.setGlobalLoader(false)
            props.history.push({
              pathname: sprintf(APPLICANT_ITEM_URL, 'resume'),
              search: queryToParams({
                switcher: 'temp'
              }),
              state: { smooth: true }
            })
          })
          .catch(error => {
            props.history.replace(props.history.location.pathname, { smooth: true })
            return props.formValidate('ResumeCreate', error)
          })
      })

    onUpdate$
      .withLatestFrom(props$)
      .subscribe(([params, props]) => {
        const { id, formValues, history } = props
        const { fields, callbackFunc, hash } = params
        return props.updateResumeAction(formValues, fields, id)
          .then(() => {
            callbackFunc()
            scrollToBlock(history, hash)
            props.history.replace({
              pathname: sprintf(RESUME_EDIT_VIEW, Number(id), 'view')
            })
            props.setGlobalLoader(false)
          })
          .then(() => {
            props.resumeFetchItem(id)
          })
          .catch(error => {
            props.history.replace(props.history.location.pathname, { smooth: true })
            return props.formValidate('ResumeCreate', error)
          })
      })

    onSubmit$
      .withLatestFrom(props$)
      .subscribe(([params, { formValues, ...props }]) => {
        const { fields, callbackFunc, hash } = params
        props.setGlobalLoader(true)
        if (props.id) {
          return onUpdate({
            hash,
            fields,
            callbackFunc
          })
        }
        return props.createResumeAction({ ...formValues, isActive: true })
          .then(() => {
            props.setGlobalLoader(false)
            props.history.push({
              pathname: sprintf(APPLICANT_ITEM_URL, 'resume'),
              search: queryToParams({
                switcher: 'active'
              })
            }, { smooth: true })
          })
          .catch(error => {
            props.history.replace(props.history.location.pathname, { smooth: true })
            return props.formValidate('ResumeCreate', error)
          })
      })

    return props$.combineLatest(props => {
      const { resumeDetail, id } = props
      const data = fp.get('data', resumeDetail)
      const isUpdate = Boolean(id)

      const mapEducation = fp.map(item => ({
        country: fpGet('country.id', item),
        educationLevel: fpGet('educationLevel', item),
        faculty: fpGet('faculty', item),
        speciality: fpGet('speciality', item),
        institution: fpGet('institution.id', item),
        fromDate: dateObjectFormat(fpGet('fromDate', item)),
        toDate: dateObjectFormat(fpGet('toDate', item)),
        present: fp.isEqual(fpGet('toDate', item), 'present')
      }))

      const education = fp.flow(
        fp.filter(item => fp.get('educationLevel', item) !== 'additional'),
        mapEducation
      )(fpGet('educations', data))

      const extraEducation = fp.flow(
        fp.filter(item => fp.get('educationLevel', item) === 'additional'),
        mapEducation
      )(fpGet('educations', data))

      const exp = fp.map(item => {
        const country = fp.get('country', item)
        const isUzbekistan = !fp.isNil(fpGet('parent.parent', country))
        const isNewCity = fp.get('parent', country)
        const countries = isUzbekistan
          ? {
            country: fpGet('parent.parent.id', country),
            region: fpGet('parent.id', country),
            city: fpGet('id', country)
          }
          : {
            country: isNewCity || fp.get('id', country),
            newCity: isNewCity ? fp.get('name', country) : ''
          }
        return {
          ...countries,
          duties: fpGet('duties', item),
          organization: fpGet('organization', item),
          position: fpGet('position', item),
          speciality: fpGet('speciality.id', item),
          fromDate: dateObjectFormat(fpGet('fromDate', item)),
          toDate: dateObjectFormat(fpGet('toDate', item)),
          present: fp.isEqual(fpGet('toDate', item), 'present')
        }
      }, fpGet('experiences', data))

      const employmentType = fpGet('employmentType', data)

      const lanuageSkills = fp.map(
        item => ({ language: item.language.id, level: item.level }),
        fp.get('languageSkills', data))

      const initialValues = isUpdate
        ? {
          extraEdu: fp.isEmpty(extraEducation) ? [{}] : extraEducation,
          edu: fp.isEmpty(education) ? [{}] : education,
          languageSkills: fp.isEmpty(lanuageSkills) ? [{}] : lanuageSkills,
          hasExperience: !fp.flow(
            fp.filter(item => !fp.isEmpty(item)),
            fp.isEmpty
          )(exp),
          exp: fp.isEmpty(exp) ? [{}] : exp,
          currency: fpGet('currency.id', data),
          fromSalary: getSalary(data),
          isContractualSalary: fp.get('isContractualSalary', data),
          hobbies: fpGet('hobbies', data),
          title: fpGet('title', data),
          sphere: fpGet('wishedIndustriesParent.id', data),
          wishedIndustries: fp.map(item => item.id, fpGet('wishedIndustries', data)),
          computerKnowledge: fpGet('computerKnowledge', data),
          compLiteracyLevel: fpGet('compLiteracyLevel', data),
          driverLicences: fp.map(item => item.id, fpGet('driverLicences', data)) || [],
          isReadyTravel: fpGet('isReadyTravel', data),
          isReadyMove: fpGet('isReadyMove', data),
          additionalInfo: fpGet('additionalInfo', data),
          employmentType: employmentType
        }
        : {
          employmentType: [],
          extraEdu: [{}],
          edu: [{}],
          languageSkills: [{}],
          exp: [{}]
        }

      return {
        ...props,
        initialValues,
        isUpdate,
        onTabChange,
        onSubmit,
        onResumeLater,
        onPreview,
        onUniverCreate
      }
    })
  }),
  pure
)(ResumeCreate)
