import React, { useState } from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { reduxForm } from 'redux-form'
import classNames from 'classnames'
import Container from 'components/Container'
import { fallbacksStyle } from 'constants/styles'
import SideNav from 'components/SideAnchor'
import ProgressBar from 'components/ProgressBar'
import VacancyPreview from './components/VacancyPreview'
import VacancyEditForm from './components/VacancyEditForm'
import VacancyViewForm from './components/VacancyViewForm'
import VacancyActions from './components/VacancyActions'
import VacancyPromote from './VacancyPromote'
import VacancyArchive from './VacancyArchive'

const styles = {
  createWrapper: {
    paddingTop: '40px',
    paddingBottom: '140px',
    background: '#fcfcfd'
  },
  wrapper: {
    ...fallbacksStyle('display', 'flex')
  },
  view: {
    background: '#fff'
  }
}
const enhance = compose(
  reduxForm({
    form: 'VacancyCreate',
    enableReinitialize: true
  }),
  injectSheet(styles)
)
const headings = [
  {
    name: 'vacancy_view_vacancy_tab',
    href: 'mainInfo',
    children: [
    ]
  },
  {
    name: 'vacancy_view_requirements_tab',
    href: 'requirements'
  },
  {
    name: 'vacancy_view_duties_tab',
    href: 'duties',
    children: []
  },
  {
    name: 'vacancy_view_conditions_tab',
    href: 'conditions',
    children: []
  },
  {
    name: 'vacancy_view_extra_info_tab',
    href: 'extraInfo',
    children: []
  },
  {
    name: 'vacancy_view_questions_tab',
    href: 'questions'
  }
]

const tabs = [
  {
    isTranslated: true,
    value: 'ru',
    label: 'На русском'
  },
  {
    isTranslated: true,
    value: 'uz',
    label: 'O’zbek tilida'
  },
  {
    isTranslated: true,
    value: 'en',
    label: 'In English'
  }
]

const VacancyCreate = props => {
  const {
    id,
    classes,
    history,
    onTabChange,
    userDetail,
    vacancyDetail,
    handleSubmit,
    actionName,
    licenceList,
    onSubmit,
    onResumeLater,
    onActivate,
    onDelete,
    formValues,
    submitErrors,
    vacancyArchiveForm,
    currencyList,
    specialityList,
    countryList,
    languageList,
    servicesList,
    allServicesList,
    vacacncyAppealData,
    change
  } = props

  const isView = actionName === 'view'
  const isUpdate = actionName === 'edit'
  const isActive = fp.get('data.isActive', vacancyDetail) || false

  const [openPreView, setOpenPreview] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)

  const onPreViewClose = (ev) => {
    ev.preventDefault()
    setOpenPreview(false)
  }
  const onPreViewOpen = (ev) => {
    ev.preventDefault()
    return setOpenPreview(true)
  }

  const sphere = fp.flow(fp.get('sphere'), fp.toInteger)(formValues)
  const industries = fp.flow(
    fp.get('data'),
    fp.filter(item => item.parent.id === sphere)
  )(specialityList)

  return (
    <div className={classNames({
      [classes.createWrapper]: true,
      [classes.view]: isView }
    )}>
      <Container className={classes.wrapper}>
        <SideNav list={headings}/>
        {isView
          ? <React.Fragment>
            <VacancyViewForm
              tabs={tabs}
              change={change}
              industries={industries}
              onSubmit={onSubmit}
              onPreviewOpen={onPreViewOpen}
              licenceList={licenceList}
              vacancyDetail={vacancyDetail}
              userDetail={userDetail}
              handleSubmit={handleSubmit}
              onTabChange={onTabChange}
            />
            <VacancyActions
              details={vacancyDetail.data}
              onOpenPromo={() => setPromoOpen(true)}
              onOpenArchive={() => setArchiveOpen(true)}
              vacacncyAppealData={vacacncyAppealData}
              onActivate={onActivate}
              onDelete={onDelete}
              servicesList={servicesList}
              history={history}
            />
          </React.Fragment>
          : <VacancyEditForm
            history={history}
            tabs={tabs}
            formValues={formValues}
            submitErrors={submitErrors}
            change={change}
            onSubmit={onSubmit}
            licenceList={licenceList}
            userDetail={userDetail}
            industries={industries}
            handleSubmit={handleSubmit}
            onPreviewOpen={onPreViewOpen}
            onTabChange={onTabChange}
            isUpdate={isUpdate}
            isActive={isActive}
            servicesList={servicesList}
            allServicesList={allServicesList}
          />}
      </Container>

      <ProgressBar
        text={'emp_vacancy_progress'}
        isView={isView}
        percent={54}
        onResumeLater={onResumeLater}
      />

      <VacancyPromote
        open={promoOpen}
        handleClose={() => setPromoOpen(false)}
        userData={fp.get('data', userDetail)}
        vacancy={fp.toNumber(id)}
      />

      <VacancyArchive
        fetchOnSuccess={'item'}
        vacancy={fp.toNumber(id)}
        open={archiveOpen}
        handleClose={() => setArchiveOpen(false)}
        formValues={vacancyArchiveForm}
      />

      <VacancyPreview
        open={openPreView}
        handleClose={onPreViewClose}
        data={formValues}
        userData={fp.get('data', userDetail)}
        licenceList={fp.get('data', licenceList)}
        countryList={fp.get('data', countryList)}
        languageList={fp.get('data', languageList)}
        currencyList={fp.get('data', currencyList)}
        industries={industries}
      />
    </div>
  )
}

VacancyCreate.propTypes = {
  id: PropTypes.string,
  actionName: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  onTabChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onResumeLater: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  languageList: PropTypes.object.isRequired,
  specialityList: PropTypes.object.isRequired,
  userDetail: PropTypes.object.isRequired,
  formValues: PropTypes.object,
  submitErrors: PropTypes.object,
  vacancyArchiveForm: PropTypes.object,
  licenceList: PropTypes.object.isRequired,
  currencyList: PropTypes.object.isRequired,
  countryList: PropTypes.object.isRequired,
  allServicesList: PropTypes.object.isRequired,
  servicesList: PropTypes.object.isRequired,
  vacancyDetail: PropTypes.object.isRequired,
  vacacncyAppealData: PropTypes.object
}

export default enhance(VacancyCreate)
