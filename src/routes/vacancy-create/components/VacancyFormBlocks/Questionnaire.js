import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ONE } from 'constants/styles'
import classNames from 'classnames'
import { Field, FieldArray } from 'redux-form'
import t from 'helpers/translate'
import withStyles from './withStyles'
import Dialog from 'components/Dialog'
import { Radio, RadioGroup, TextField } from 'components/FormComponents'
import Title from 'components/Title'
import AnswersArrayField from 'components/FormComponents/AnswersArrayField'
import { Button, GREY } from 'components/Button'
import T from 'components/T'
import TW from 'components/TW'

const Questionnaire = props => {
  const { classes, fields } = props
  const [openDialog, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const onOpen = () => {
    fields.push({})
    setOpen(true)
  }
  const onSave = () => {
    if (!fp.isNull(editIndex)) {
      fields.move(fields.length - ONE, editIndex)
      fields.remove(editIndex + ONE)
      setEditIndex(null)
    }
    setOpen(false)
  }
  const onCancel = () => {
    fields.pop()
    setOpen(false)
  }
  const onEdit = (index) => {
    setOpen(true)
    fields.push(fields.get(index))
    setEditIndex(index)
  }
  return (
    <div id={'questions'} className={classes.questions}>
      <div className={classes.title}><T>vacancy_questions</T></div>
      <div className={classes.decr}><T>vacancy_questions_desc</T></div>
      <div className={classes.questionList}>
        {fields.map((question, index) => {
          const val = fields.get(index)
          const questionText = fp.get('question', val)
          const withAnswers = fp.get('type', val) === 'choices'
          return (
            <React.Fragment key={index}>
              <div className={classes.question}>
                <div>
                  {questionText}
                </div>
                <div className={classes.questionActions}>
                  <span onClick={() => onEdit(index)}><T>button_simple_edit</T></span>
                  <span onClick={() => fields.remove(index)}><T>button_simple_del</T></span>
                </div>
              </div>
              <Dialog
                open={openDialog}
                width={900}
                handleClose={onCancel}>
                <div className={classes.addQuestions}>
                  <Title isStatic={true} medium={true} text={'vacancy_questions'}/>
                  <div className={classes.field}>
                    <TW>
                      {lang => (
                        <Field
                          label={t('vacancy_question_title', lang)}
                          name={`${question}.question`}
                          component={TextField}
                        />
                      )}
                    </TW>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <TW>
                      {lang => (
                        <Field name={`${question}.type`} component={RadioGroup}>
                          <Radio value={'open'} label={t('vacancy_question_open', lang)}/>
                          <Radio value={'choices'} label={t('vacancy_question_variants', lang)}/>
                        </Field>
                      )}
                    </TW>
                  </div>
                  <div className={classNames({
                    [classes.answers]: true,
                    [classes.answerAnim]: withAnswers
                  })}>
                    <FieldArray component={AnswersArrayField} name={`${question}.answers`}/>
                  </div>
                  <div className={classes.answerBtn}>
                    <Button
                      onClick={onCancel}
                      type={'medium'}
                      style={{ marginRight: '20px' }}
                      text={'button_cancel'}
                      color={GREY}
                    />
                    <Button
                      onClick={onSave}
                      type={'medium'}
                      text={'button_simple_save'}
                    />
                  </div>
                </div>
              </Dialog>
            </React.Fragment>
          )
        })}
      </div>
      <div className={classes.button} onClick={onOpen}><T>button_add_question</T></div>
    </div>
  )
}

Questionnaire.propTypes = {
  classes: PropTypes.object,
  fields: PropTypes.object
}

export default withStyles(Questionnaire)

