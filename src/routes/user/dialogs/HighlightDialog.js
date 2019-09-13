import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import Icon from 'antd/lib/icon'
import Dialog from 'components/Dialog'
import { Button } from 'components/Button/index'
import { PRIMARY_COLOR } from 'constants/styles'

const enhance = compose(
  injectSheet({
    dialogBody: {
      lineHeight: '1',
      padding: '56px 42px 50px 90px'
    },

    field: {
      marginBottom: '25px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    header: {
      fontSize: '33px',
      fontWeight: 'bold',
      color: PRIMARY_COLOR
    },
    actionButtons: {
      textAlign: 'right'
    },

    orderBtn: {
      fontSize: '20px',
      padding: '0 84px'
    },
    text: {
      color: '#3d3d3d',
      fontSize: '15px',
      lineHeight: '1.8',
      margin: '60px 0 80px',
      paddingRight: '115px'
    },
    iconClass: {
      width: '30px',
      height: '30px'
    }
  })
)

const HighlightDialog = props => {
  const {
    open,
    onClose,
    onSubmit,
    classes,
    loading
  } = props
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      handleClose={onClose}
      iconClass={classes.iconClass}
      width={1024}>
      <form onSubmit={onSubmit} className={classes.dialogBody}>
        <div className={classes.fields}>
          <div className={classes.header}>
            Выделить резюме
          </div>
          <div className={classes.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at erat a Leo ultrices
            euismod vitae non lacus. Integer nec lectus ex. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nunc at erat a Leo
            ultrices euismod vitae non lacus. Integer nec lectus ex.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at erat a Leo ultrices
            euismod vitae non lacus. Integer nec lectus ex. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet
            , consectetur adipiscing elit. Nunc at erat a Leo ultrices euismod vitae non lacus. Integer
            nec lectus ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </div>
        </div>
        <div className={classes.actionButtons}>
          <Button
            type={'medium'}
            text={loading ? <Icon type={'loading'}/> : 'Заказать услугу'}
            className={classes.orderBtn}/>
        </div>
      </form>
    </Dialog>
  )
}

HighlightDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default enhance(HighlightDialog)
