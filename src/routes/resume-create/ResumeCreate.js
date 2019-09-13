import React, { useEffect } from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { reduxForm, initialize } from 'redux-form'
import classNames from 'classnames'
import Container from 'components/Container'
import { fallbacksStyle } from 'constants/styles'
import SideNav from 'components/SideAnchor'
import ProgressBar from 'components/ProgressBar'
import ResumeEditForm from './components/ResumeEditForm'
import ResumeViewForm from './components/ResumeViewForm'
import ResumeViewButtons from './components/ResumeViewButtons'

const enhance = compose(
  reduxForm({
    form: 'ResumeCreate',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false
  }),
  injectSheet({
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
    },
    previewWrap: {
      height: '100%'
    }
  })
)

const headings = [
  {
    name: 'main_wishes',
    href: 'wishes',
    children: []
  },
  {
    name: 'main_work_experience',
    href: 'workExperience'
  },
  {
    name: 'main_education',
    href: 'mainEducation',
    children: []
  },
  {
    name: 'main_extra_education_short',
    href: 'extraEducation',
    children: []
  },
  {
    name: 'main_skills',
    href: 'skills',
    children: []
  },
  {
    name: 'main_hobby',
    href: 'hobbies'
  },
  {
    name: 'main_additional_info_short',
    href: 'extraInfo'
  }
]

const ResumeCreate = props => {
  const {
    classes,
    onTabChange,
    userDetail,
    resumeDetail,
    handleSubmit,
    actionName,
    licenceList,
    onSubmit,
    onPreview,
    onResumeLater,
    formValues,
    specialityList,
    onUniverCreate,
    change,
    ...otherProps
  } = props

  const isView = actionName === 'view'

  useEffect(() => {
    if (!isView) {
      props.dispatch(initialize('ResumeCreate', props.initialValues))
    }
  }, [])

  const sphere = fp.flow(
    fp.get('sphere'),
    fp.toInteger
  )(formValues)

  const industries = fp.flow(
    fp.get('data'),
    fp.filter(item => item.parent.id === sphere)
  )(specialityList)

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

  return (
    <div className={classNames({
      [classes.createWrapper]: true,
      [classes.view]: isView }
    )}>
      <Container className={classes.wrapper}>
        <SideNav list={headings}/>
        {isView
          ? (
            <React.Fragment>
              <ResumeViewForm
                tabs={tabs}
                change={change}
                onUniverCreate={onUniverCreate}
                industries={industries}
                onSubmit={onSubmit}
                licenceList={licenceList}
                resumeDetail={resumeDetail}
                userDetail={userDetail}
                handleSubmit={handleSubmit}
                onTabChange={onTabChange}
              />
              <ResumeViewButtons resume={fp.toNumber(otherProps.id)}/>
            </React.Fragment>
          )
          : (
            <ResumeEditForm
              tabs={tabs}
              change={change}
              onSubmit={onSubmit}
              onPreview={onPreview}
              onResumeLater={onResumeLater}
              licenceList={licenceList}
              userDetail={userDetail}
              industries={industries}
              handleSubmit={handleSubmit}
              onUniverCreate={onUniverCreate}
              onTabChange={onTabChange}
            />
          )}
      </Container>

      <ProgressBar
        isView={isView}
        percent={56}
        text={'applicant_resume_progress'}
        onResumeLater={onResumeLater}
      />
    </div>
  )
}

ResumeCreate.propTypes = {
  actionName: PropTypes.string,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  initialValues: PropTypes.object,
  onTabChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onResumeLater: PropTypes.func.isRequired,
  onUniverCreate: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  institutionList: PropTypes.object.isRequired,
  languageList: PropTypes.object.isRequired,
  specialityList: PropTypes.object.isRequired,
  userDetail: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  licenceList: PropTypes.object.isRequired,
  currencyList: PropTypes.object.isRequired,
  countryList: PropTypes.object.isRequired,
  resumeDetail: PropTypes.object.isRequired
}
export default enhance(ResumeCreate)
