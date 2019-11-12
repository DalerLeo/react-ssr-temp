/*
import { fallbacksStyle, crossBrowserify } from 'constants/styles'
import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import SuccessIcon from 'icons/Success'
import ErrorIcon from 'icons/Error'

const enhance = compose(
  injectSheet({
    notifyWrap: {
      ...fallbacksStyle('display', 'flex'),
      overflow: 'hidden',
      transition: 'all 500ms',
      background: '#FFFFFF',
      borderRadius: '4px',
      zIndex: '99999'
    },
    errorWrap: {
      '& $icon': {
        background: '#F62733'
      }
    },
    icon: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      background: '#3ACC6C',
      padding: '22px 13px',
      minWidth: '60px',
      width: '60px',
      '& svg': {
        color: 'white',
        fontSize: '24px'
      }
    },
    body: {
      padding: '20px 28px 20px 15px'
    },
    title: {
      color: '#323C47',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '10px'
    },
    description: {
      color: '#9197A4',
      fontSize: '14px'
    }
  })
)
const GlobalNotify = props => {
  const { classes, title, message, type } = props
  const isError = type === 'error'
  return (
    <div className={classNames(classes.notifyWrap, {
      [classes.errorWrap]: isError
    })}
    >
      <div className={classes.icon}>
        {isError ? <ErrorIcon /> : <SuccessIcon />}
      </div>
      <div className={classes.body}>
        <div className={classes.title}>{title}</div>
        <div className={classes.description} dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  )
}

GlobalNotify.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error'])
}

GlobalNotify.defaultProps = {
  title: 'Сохранено',
  message: 'Ваши данные сохранены',
  type: 'success'
}

export default enhance(GlobalNotify)
*/
