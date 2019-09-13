import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Dialog from 'components/Dialog'
import Title from 'components/Title'
import VacancyTypesRadio from './VacancyTypesRadio'
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
  const { classes, open, handleClose, handleSubmit, servicesList } = props

  const [service, setService] = useState(null)

  const onChangeService = event => setService(event.target.value)
  const onSubmit = () => handleSubmit({
    callBack: handleClose,
    service
  })

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={700}>
      <div className={classes.wrapper}>
        <Title medium={true} text={'Разместить повторно'}/>
        <VacancyTypesRadio
          services={servicesList}
          onChange={onChangeService}
        />
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
            text={'button_publish'}
            style={{ width: '180px' }}
            onClick={onSubmit}
            disabled={!service}
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
  handleSubmit: PropTypes.func.isRequired,
  servicesList: PropTypes.object.isRequired
}

export default withStyles(ActivateDialog)
