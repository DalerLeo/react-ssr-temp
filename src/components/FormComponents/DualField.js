import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import { SEARCH_TYPE } from 'constants/backend'
import {
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_COLOR
} from 'constants/styles'
import t from 'helpers/translate'
import MdSearch from 'react-icons/lib/md/search'
import TW from 'components/TW'
import Title from 'components/Title'
import TextSimpleField from './TextField/TextSimpleField'
import SearchFieldConfig from './SearchFieldConfig'
import { Button } from 'components/Button'

const enhance = compose(
  injectSheet({
    dualWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      marginBottom: '30px'
    },
    dualText: {
      borderRight: 'none',
      borderBottomRightRadius: '0',
      borderTopRightRadius: '0'
    },
    dualSelect: {
      marginBottom: '0',
      '& input': {
        borderLeft: 'none !important',
        borderRight: 'none !important',
        borderRadius: '0!important'
      }
    },
    divver: {
      margin: '8px 0',
      height: '29px',
      background: FIELD_BORDER_COLOR,
      width: '1px'
    },
    dualBtn: {
      padding: '0 30px',
      borderBottomLeftRadius: '0',
      borderTopLeftRadius: '0'
    }

  })
)

const DualField = (props) => {
  const { classes, onSubmit } = props
  return (
    <React.Fragment>
      <Title
        isStatic={true}
        margin="19px 0 9px"
        medium={true}
        text={'main_find_wished_company'}
      />
      <div className={classes.dualWrap}>
        <TW>
          {lang => (
            <Field
              name={'search'}
              component={TextSimpleField}
              width={'calc(100% - 312px)'}
              wrapperClass={classes.dualText}
              prefix={<MdSearch/>}
              placeholder={t('main_fast_search', lang)}
              onKeyPress={event => {
                const keyIsEnter = 13
                if (event.charCode === keyIsEnter) onSubmit()
              }}
            />
          )}
        </TW>
        <div className={classes.divver}/>
        <Field
          name={'type'}
          component={SearchFieldConfig}
          width="205px"
          className={classes.dualSelect}
          items={SEARCH_TYPE}
          isStatic={true}
        />
        <Button
          onClick={onSubmit}
          className={classes.dualBtn}
          type='medium'
          text={'button_find'}
        />
      </div>
    </React.Fragment>
  )
}

DualField.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default enhance(DualField)
