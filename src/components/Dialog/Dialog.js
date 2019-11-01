import { crossBrowserify } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Modal from 'antd/lib/modal/Modal'
import MdClose from 'react-icons/lib/md/close'

const enhance = compose(
  injectSheet({
    modalWrapper: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      pointerEvents: 'none',
      zIndex: '1100',
      '& $closeIcon': {
        opacity: '0',
        visibility: 'hidden'
      }
    },
    modalWrapperOpen: {
      pointerEvents: 'all',
      '& $closeIcon': {
        opacity: '1',
        visibility: 'visible'
      }
    },
    wrapper: {
      textAlign: 'center',
      '&:before': {
        content: '""',
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle',
        width: '0'
      }
    },
    modal: {
      color: 'inherit',
      display: 'inline-block',
      fontFamily: 'inherit',
      verticalAlign: 'middle',
      padding: '70px 0',
      top: '0',
      textAlign: 'left',
      '& .ant-modal-close': {
        display: 'none'
      },
      '& .ant-modal-content': {
        borderRadius: 'unset',
        boxShadow: 'unset',
        backgroundColor: 'transparent'
      },
      '& .ant-modal-body': {
        background: '#F6F7F9',
        padding: '0',
        position: 'relative'
      }
    },
    fullScreenWrap: {
      '&:before': {
        display: 'none'
      },
      '& $modal': {
        display: 'block',
        padding: '0',
        verticalAlign: 'baseline',
        '& .ant-modal-body': {
          minHeight: '100vh'
        }
      },
      '& $closeIcon': {
        top: '15px',
        right: '15px'
      }
    },
    closeIcon: {
      ...crossBrowserify('transition', 'all 300ms'),
      background: 'transparent',
      borderRadius: '50%',
      cursor: 'pointer',
      padding: '10px',
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      '&:hover': {
        background: '#efefef'
      },
      '& > svg': {
        color: '#000',
        fontSize: '24px',
        verticalAlign: 'unset'
      }
    }
  })
)

const Dialog = (props) => {
  const {
    open,
    handleSubmit,
    handleClose,
    submitText,
    cancelText,
    children,
    classes,
    className,
    iconClassName,
    width,
    fullScreen,
    ...otherProps
  } = props

  return (
    <Modal
      maskStyle={{ background: '#fff' }}
      className={classNames(classes.modal, className)}
      wrapClassName={classNames(classes.wrapper, {
        [classes.fullScreenWrap]: fullScreen
      })}
      visible={open}
      okText={submitText}
      cancelText={cancelText}
      onOk={handleSubmit}
      onCancel={handleClose}
      maskClosable={false}
      footer={null}
      zIndex={1000}
      width={fullScreen ? '100%' : width}
      {...otherProps}
    >

      {children}

      <div
        className={classNames(classes.closeIcon, iconClassName)}
        onClick={handleClose}
      >
        <MdClose />
      </div>
    </Modal>
  )
}

Dialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  iconClassName: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fullScreen: PropTypes.bool
}

Dialog.defaultProps = {
  width: '100%'
}

export default enhance(Dialog)
