import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Dialog from 'components/Dialog'
import Title from 'components/Title'
import { Button } from 'components/Button'
import TextSimpleField from 'components/FormComponents/TextField/TextAreaField'

const withStyles = injectSheet({
  wrapper: {
    padding: '40px 50px'
  },
  button: {
    marginTop: '30px',
    textAlign: 'right'
  }
})

const InviteDialog = props => {
  const { classes, open, onClose, onSubmit } = props

  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (open) setMessage(null)
  }, [open])

  return (
    <Dialog
      open={open}
      handleClose={onClose}
      width={600}>
      <div className={classes.wrapper}>
        <Title isStatic={true} medium={true} text={'button_to_invite'}/>
        <TextSimpleField
          value={message}
          onChange={event => setMessage(event.target.value)}
          autosize={{ minRows: 3, maxRows: 6 }}
        />
        <div className={classes.button}>
          <Button
            type={'medium'}
            text={'button_send'}
            disabled={!message}
            onClick={() => onSubmit(message)}
          />
        </div>
      </div>
    </Dialog>
  )
}

InviteDialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(InviteDialog)
