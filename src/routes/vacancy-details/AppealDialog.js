import loMap from 'lodash/map'
import loGet from 'lodash/get'
import loIsEmpty from 'lodash/isEmpty'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { Field, reduxForm } from 'redux-form'
import withHistory from 'helpers/withHistory'
import Dialog from 'components/Dialog'
import * as API from 'constants/api'
import { ONE } from 'constants/styles'
import { RESUME_CREATE_URL } from 'constants/routes'
import t from 'helpers/translate'
import {
  TextField,
  Label2 as Label,
  RadioGroup,
  SearchFieldConfig
} from 'components/FormComponents'
import { Button } from 'components/Button'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'

const enhance = compose(
  withHistory,
  reduxForm({
    form: 'AppealForm'
  }),
  injectSheet({
    appealWrap: {
      padding: '40px 50px 50px'
    },
    radio: {
      marginBottom: '18px'
    },
    appealBtn: {
      marginTop: '38px',
      textAlign: 'right'
    },
    questWrap: {
      marginBottom: '24px'
    },
    quest: {
      marginBottom: '14px'
    }
  })
)

const AppealDialog = props => {
  const {
    classes,
    history,
    open,
    onClose,
    onAppeal,
    questions,
    wantToWork
  } = props

  const [resumeList, setResumeList] = useState(null)
  const hasNoResumes = loIsEmpty(resumeList) && resumeList !== null

  return (
    <Dialog
      open={open}
      handleClose={onClose}
      width={900}>
      <div className={classes.appealWrap}>
        <Title
          isStatic={true}
          text={wantToWork ? 'button_work_here' : 'button_respond_vacancy'}
          medium={true}
        />
        <div>
          <TW>
            {lang => (
              <Field
                component={SearchFieldConfig}
                api={API.RESUME_LIST}
                params={{ is_active: true }}
                itemName={'title'}
                name={'resume'}
                label2={t('resume_choose', lang)}
                getDataSource={(data) => setResumeList(data)}
              />
            )}
          </TW>
        </div>
        {!wantToWork && !loIsEmpty(questions) &&
        <div style={{ marginTop: '40px' }}>
          <Label label={<T>vacancy_answer_questions</T>}/>
          <div>
            {loMap(questions, (question, index) => {
              const quest = loGet(question, 'question')
              const choices = loGet(question, 'type') === 'choices'
              const answers = loMap(loGet(question, 'answers'), i => ({ name: i, id: i }))
              return (
                <div className={classes.questWrap}>
                  <div className={classes.quest}>{ONE + index}. {quest}</div>
                  {choices && <Field
                    component={RadioGroup}
                    items={answers}
                    name={'answers[' + index + ']'}
                    block={true}
                  />}
                  {!choices && (
                    <div style={{ marginLeft: '18px' }}>
                      <Field
                        component={TextField}
                        name={'answers[' + index + ']'}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>}
        <div className={classes.appealBtn}>
          {hasNoResumes
            ? <Button
              type={'medium'}
              text={'menu_create_resume'}
              onClick={() => history.push(RESUME_CREATE_URL)}
            />
            : <React.Fragment>
              <Button
                color={'grey'}
                type={'medium'}
                text={'button_cancel'}
                bordered={true}
                onClick={onClose}
                style={{ marginRight: '20px', width: '180px' }}
              />
              <Button
                onClick={onAppeal}
                type={'medium'}
                text={'button_respond'}
                style={{ width: '180px' }}
              />
            </React.Fragment>}
        </div>
      </div>
    </Dialog>
  )
}

AppealDialog.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  onAppeal: PropTypes.func.isRequired,
  questions: PropTypes.array,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  wantToWork: PropTypes.bool
}

AppealDialog.defaultProps = {
  wantToWork: false
}

export default enhance(AppealDialog)
