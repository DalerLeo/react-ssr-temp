import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import {
  orderCreateAction,
  orderMakePaymentAction
} from 'routes/action-common/order'
import { userInfoFetch } from 'routes/user/actions'
import {
  activateServicesAction,
  promoteApplicantResumeAction
} from 'routes/services/actions'
import { Button, YELLOW } from 'components/Button'
import T from 'components/T'
import PromoteDialog from 'routes/user/components/Resume/PromoteDialog'

const mapStateToProps = state => ({})

const withStyles = compose(
  withState('openPromote', 'setOpenPromote', false),
  connect(mapStateToProps, {
    orderCreateAction,
    orderMakePaymentAction,
    activateServicesAction,
    userInfoFetch
  }),
  withHandlers({
    onPromoteResume: ({ resume, setOpenPromote, ...props }) => services => {
      return promoteApplicantResumeAction({
        props,
        services,
        resume,
        callBack: () => setOpenPromote(false)
      })
    }
  }),
  injectSheet({
    wrapper: {
      marginLeft: '28px',
      minWidth: '220px',
      width: '220px'
    },
    action: {

    },
    infoText: {
      color: '#9a9a9a',
      fontSize: '13px',
      marginTop: '10px'
    }
  })
)

const ResumeViewButtons = props => {
  const {
    classes,
    openPromote,
    setOpenPromote,
    onPromoteResume
  } = props

  const onOpenDialog = () => setOpenPromote(true)
  const onCloseDialog = () => setOpenPromote(false)

  return (
    <div className={classes.wrapper}>
      <div className={classes.action}>
        <Button
          text={'resume_promotion'}
          color={YELLOW}
          fullWidth={true}
          type={'small'}
          onClick={onOpenDialog}
        />
        <div className={classes.infoText}><T>resume_promotion_desc</T></div>
      </div>

      <PromoteDialog
        open={openPromote}
        handleClose={onCloseDialog}
        handleSubmit={onPromoteResume}
      />
    </div>
  )
}

ResumeViewButtons.propTypes = {
  classes: PropTypes.object,
  resume: PropTypes.number,
  openPromote: PropTypes.bool,
  setOpenPromote: PropTypes.func,
  onPromoteResume: PropTypes.func
}

export default withStyles(ResumeViewButtons)
