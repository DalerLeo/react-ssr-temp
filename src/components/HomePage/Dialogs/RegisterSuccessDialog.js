import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import SuccessIcon from 'icons/RegisterSuccess'
import {

} from 'constants/styles'
import Dialog from 'components/Dialog'
import Title from 'components/Title'

const enhance = compose(
  injectSheet({
    dialogBody: {
      background: '#fff',
      padding: '40px 100px 33px',
      textAlign: 'center'
    }
  })
)

const LoginDialog = ({ ...props }) => {
  const {
    open,
    handleClose,
    classes
  } = props
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      handleClose={handleClose}
      maskStyle={{ background: '#fff' }}
      width={700}>
      <div className={classes.dialogBody}>
        <SuccessIcon/>
        <div style={{ textAlign: 'center' }}>
          <Title text={'Момент…'} margin={'37px 0 10px'}/>
          <div className={classes.text}>
            Мы отправили Вам на email письмо,<br/>для подтверждения Ваших действий.
          </div>
        </div>
      </div>
    </Dialog>
  )
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  handleClose: PropTypes.func.isRequired
}

export default enhance(LoginDialog)
