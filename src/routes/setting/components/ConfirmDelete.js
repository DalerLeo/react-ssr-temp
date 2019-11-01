import { FIELD_BORDER_STYLE } from 'constants/styles'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import TextArea from 'antd/lib/input/TextArea'
import Dialog from 'components/Dialog'
import Title from 'components/Title'
import { Button } from 'components/Button'

const withStyles = injectSheet({
  wrapper: {
    padding: '40px 50px'
  },
  textArea: {
    border: FIELD_BORDER_STYLE,
    outline: 'none',
    padding: '12px',
    resize: 'none',
    '&:hover, &:focus': {
      border: FIELD_BORDER_STYLE
    },
    '&:focus': {
      boxShadow: 'none'
    }
  },
  button: {
    textAlign: 'right',
    marginTop: '30px'
  }
})

const ConfirmDelete = props => {
  const { classes, open, handleClose, handleSubmit } = props

  const [commentText, setCommentText] = useState(null)

  useEffect(() => {
    if (open) setCommentText(null)
  }, [open])

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={600}
    >
      <div className={classes.wrapper}>
        <Title text="Подтвердите действие" medium={true} />
        <TextArea
          autosize={{ minRows: 2, maxRows: 10 }}
          placeholder="Укажите причину (необязательно)"
          className={classes.textArea}
          onChange={event => setCommentText(event.target.value)}
        />
        <div className={classes.button}>
          <Button
            onClick={() => handleSubmit(commentText)}
            text="button_simple_del"
            type="medium"
          />
        </div>
      </div>
    </Dialog>
  )
}

ConfirmDelete.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withStyles(ConfirmDelete)
