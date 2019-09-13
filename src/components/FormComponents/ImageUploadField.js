import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import { compose, withReducer, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import axios from 'helpers/axiosHelper'
import t from 'helpers/translate'
import * as PATH from 'constants/api'
import {
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE,
  MAIN_COLOR
} from 'constants/styles'
import EditIcon from 'icons/EditPen'
import ProfilePic from 'components/ProfilePic'
import TW from 'components/TW'

const enhance = compose(
  connect(store => ({ store })),
  withReducer('state', 'dispatcher', (state, action) => {
    return { ...state, ...action }
  }, {
    loading: false,
    error: ''
  }),
  withHandlers({
    onInputChange: props => (ev) => {
      /* eslint-disable no-undef */
      const { dispatch, store, dispatcher, input } = props
      const axiosData = { getState: () => store, dispatch }
      const IMAGE_MAX_SIZE = 150000

      const file = fp.get('target.files.0', ev)
      const formData = new FormData()
      const types = ['image/png', 'image/jpeg', 'image/gif']

      if (types.every(type => file.type !== type)) {
        dispatcher({ error: 'is not a supported format' })
      }

      if (file.size > IMAGE_MAX_SIZE) {
        dispatcher({ error: 'Too large' })
      }
      formData.append('file', file)
      dispatcher({ loading: true })
      return axios(axiosData).post(PATH.FILE_UPLOAD, formData)
        .then((response) => {
          dispatcher({ loading: false, error: null })
          input.onChange(response.data)
          return response

          //   SetObj(getImage(classes, response.data.file))
        }).catch((newError) => {
          const errorData = fp.get(['response', 'data'], newError)
          dispatcher({ loading: false, error: errorData })
          // SetFileUploadErrors(errorData)
          // SetFileUploadLoading(false)
          // Input.onChange(null)
        })
    }
  }),
  injectSheet({
    input: {
      width: '0.1px',
      height: '0.1px',
      opacity: '0',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: '-1'
    },
    imageWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      '& label': {
        color: MAIN_COLOR,
        fontWeight: '500',
        textDecoration: 'underline',
        cursor: 'pointer',
        marginTop: '8px'
      }
    },
    actionBtn: {
      ...crossBrowserify('borderRadius', '50px'),
      border: FIELD_BORDER_STYLE,
      marginLeft: '20px',
      padding: '10px 16px',
      '& svg': {
        color: '#A1A7B3',
        display: 'block',
        fontSize: '20px'
      }
    }
  })
)
const ImageUploadField = props => {
  const { classes, input, onInputChange } = props

  return (
    <div className={classes.imageWrap}>
      <div>
        <ProfilePic image={fp.get('value.file', input)} type={'mini'}/>
      </div>
      <input className={classes.input} onChange={onInputChange} type="file" id={'fileInput'}/>
      <TW>
        {lang => (
          <label htmlFor="fileInput" title={t('button_simple_edit', lang)}>
            <div className={classes.actionBtn}>
              <EditIcon/>
            </div>
          </label>
        )}
      </TW>
    </div>
  )
}

ImageUploadField.propTypes = {
  input: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired

}
export default enhance(ImageUploadField)
