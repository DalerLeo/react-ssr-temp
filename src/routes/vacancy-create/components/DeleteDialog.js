import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Dialog from 'components/Dialog'
import Title from 'components/Title'
import { Button, GREY } from 'components/Button'

const withStyles = injectSheet({
  wrapper: {
    padding: '40px 50px'
  },
  actionButtons: {
    textAlign: 'right',
    marginTop: '40px'
  }
})

const ActivateDialog = props => {
  const { classes, open, handleClose, handleSubmit } = props

  const onSubmit = () => handleSubmit(handleClose)

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={700}>
      <div className={classes.wrapper}>
        <Title medium={true} text={'Удаление вакансии'}/>
        <div className={classes.actionButtons}>
          <Button
            onClick={handleClose}
            type={'medium'}
            text={'button_cancel'}
            color={GREY}
            bordered={true}
            style={{ width: '180px', marginRight: '20px' }}
          />
          <Button
            type={'medium'}
            text={'button_simple_del'}
            style={{ width: '180px' }}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Dialog>
  )
}

ActivateDialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withStyles(ActivateDialog)
