import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { Field, FieldArray } from 'redux-form'
import t from 'helpers/translate'
import TW from 'components/TW'
import Title from 'components/Title'
import TitleTab from 'components/Title/TitleTab'
import ResumeUserInfo from './ResumeUserInfo'
import ExpArrayField from 'components/FormComponents/ExpArrayField'
import EduArrayField from 'components/FormComponents/EduArrayField'
import { Button } from 'components/Button'
import { ResumeProfessional, ResumeSkills } from './ResumeProfessional'
import { BORDER_STYLE, animationStyle } from 'constants/styles'
import { TextAreaField, FieldHint } from 'components/FormComponents'

const eduData = {
  title: 'main_education',
  desc: 'resume_education_hint'
}

const enhance = compose(
  injectSheet({
    form: {
      animationName: 'rollUpFadeIn',
      animationDuration: '1s',
      maxWidth: '685px',
      width: 'calc(100% - 528px)'
    },
    block: {
      position: 'relative'
    },
    fields: {
      marginTop: '40px'
    },
    line: {
      width: '100%',
      borderTop: BORDER_STYLE,
      marginTop: '30px',
      paddingTop: '30px'
    }
  })
)

const ResumeEditForm = props => {
  const {
    tabs,
    classes,
    handleSubmit,
    onTabChange,
    userDetail,
    licenceList,
    industries,
    onSubmit,
    onPreview,
    change,
    onUniverCreate
  } = props

  return (
    <div className={classes.form} style={animationStyle}>
      <Title isStatic={true} text={'resume_create'}/>
      <TitleTab type={'medium'} value={'ru'} onChange={onTabChange} tabs={tabs}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ResumeUserInfo userDetail={userDetail}/>
        <ResumeProfessional
          change={change}
          industries={industries}
        />
        <div className={classes.block} id={'workExperience'}>
          <TW>
            {lang => (
              <FieldArray
                name={'exp'}
                lang={lang}
                component={ExpArrayField}
              />
            )}
          </TW>
        </div>

        <div className={classes.block} id={'mainEducation'}>
          <FieldHint data={eduData}/>
          <TW>
            {lang => (
              <FieldArray
                name={'edu'}
                onUniverCreate={onUniverCreate}
                component={EduArrayField}
                lang={lang}
              />
            )}
          </TW>
        </div>

        <div className={classes.block} id={'extraEducation'}>
          <TW>
            {lang => (
              <FieldArray
                extra={true}
                name={'extraEdu'}
                onUniverCreate={onUniverCreate}
                component={EduArrayField}
                lang={lang}
              />
            )}
          </TW>
        </div>

        <ResumeSkills licenceList={licenceList}/>

        <div className={classes.fields} id={'hobbies'}>
          <Title isStatic={true} medium={true} text={'main_hobby'}/>
          <Field
            name={'hobbies'}
            rows={5}
            component={TextAreaField}
          />
        </div>

        <div className={classes.fields} id={'extraInfo'}>
          <Title isStatic={true} medium={true} text={'main_additional_info'}/>
          <Field
            name={'additionalInfo'}
            rows={5}
            component={TextAreaField}
          />
        </div>

        <div className={classes.fields}>
          <Button
            alternate
            onClick={onPreview}
            style={{ width: '50%' }}
            type={'medium'}
            text={'button_preview'}
          />
          <Button
            style={{ width: '50%' }}
            type={'medium'}
            submitType={'submit'}
            text={'button_save_resume'}
          />
        </div>
      </form>
    </div>
  )
}

ResumeEditForm.propTypes = {
  tabs: PropTypes.array,
  classes: PropTypes.object,
  userDetail: PropTypes.object.isRequired,
  licenceList: PropTypes.object.isRequired,
  industries: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  onUniverCreate: PropTypes.func.isRequired,
  sphere: PropTypes.string,
  onTabChange: PropTypes.func.isRequired
}

export default enhance(ResumeEditForm)
