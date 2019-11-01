import { LANGUAGES_LIST } from 'constants/api'
import { MAIN_COLOR } from 'constants/styles'
import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import { SearchFieldConfig, Label2 } from 'components/FormComponents'
import T from 'components/T'

const withStyles = injectSheet({
  wrapper: {

  },
  field: {
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  addLang: {
    color: MAIN_COLOR,
    cursor: 'pointer',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '10px'
  }
})

const LanguagesField = defProps => {
  const { classes, fields, onChange } = defProps
  return (
    <div className={classes.wrapper}>
      <Label2 label={<T>main_language_knowledge</T>} />
      <div>
        {fields.map((lang, index) => {
          return (
            <div key={index} className={classes.field}>
              <Field
                name={`${lang}.language`}
                component={SearchFieldConfig}
                api={LANGUAGES_LIST}
                pageSize={200}
                onChange={onChange}
              />
            </div>
          )
        })}
      </div>
      <div
        className={classes.addLang}
        onClick={() => fields.push({})}
      >
        <T>resume_add_language</T>
      </div>
    </div>
  )
}

export default withStyles(LanguagesField)
