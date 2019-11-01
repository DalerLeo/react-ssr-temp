import * as API from 'constants/api'
import { crossBrowserify, fallbacksStyle, MAIN_COLOR, ONE } from 'constants/styles'
import { LANG_LEVEL_LIST } from 'constants/backend'
import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import hexToRgb from 'helpers/hexToRgb'
import t from 'helpers/translate'
import T from 'components/T'
import TW from 'components/TW'
import SearchFieldConfig from './SearchFieldConfig'

const enhance = compose(
  injectSheet({
    flex: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'baseline')
    },
    lang: {
      ...crossBrowserify('justifyContent', 'space-between'),
      extend: 'flex',
      position: 'relative',
      '& > div': {
        margin: '0 !important',
        width: 'calc(50% - 15px)'
      }
    },
    addBtn: {
      cursor: 'pointer',
      color: MAIN_COLOR,
      fontWeight: '500',
      display: 'block',
      textAlign: 'center',
      marginTop: '30px'
    },
    removeBtn: {
      color: '#B1B9C9',
      lineHeight: 'normal',
      textAlign: 'right',
      marginTop: '5px'
    },
    langWrap: {
      marginTop: '20px',
      borderTop: '1px solid ' + hexToRgb('#c6cbd4', '0.5'),
      paddingTop: '20px',
      '&:nth-child(1)': {
        marginTop: '0',
        borderTop: 'none',
        paddingTop: '0'
      }
    }
  })
)

const LangArrayField = (props) => {
  const { classes, fields } = props
  const handleTouchTap = () => {
    return fields.push({})
  }
  const onRemove = (index) => fields.remove(index)

  return (
    <div>
      <div>
        {fields.map((item, index) => {
          return (
            <div key={index} className={classes.langWrap}>
              <div className={classes.lang}>
                <TW>
                  {lang => (
                    <>'                     '<Field
                      name={`${item}.language`}
                      component={SearchFieldConfig}
                      api={API.LANGUAGES_LIST}
                      label2={t('resume_language', lang)}
                      type="text"
                    />'                     '<Field
                                               name={`${item}.level`}
                                               component={SearchFieldConfig}
                                               label2={t('resume_language_level', lang)}
                                               isStatic={true}
                                               items={LANG_LEVEL_LIST}
                                                                      />'                   '
                    </>
                  )}
                </TW>
              </div>
              {fields.length > ONE &&
              <div onClick={() => onRemove(index)} className={classes.removeBtn}>
                <span style={{ cursor: 'pointer' }}><T>button_simple_del</T></span>
              </div>}
            </div>
          )
        })}
      </div>
      <div onClick={handleTouchTap} className={classes.addBtn}><T>resume_add_language</T></div>
    </div>
  )
}

LangArrayField.propTypes = {
  classes: PropTypes.object,
  fields: PropTypes.object.isRequired
}
export default enhance(LangArrayField)
