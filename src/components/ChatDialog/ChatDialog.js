import React, { useEffect } from 'react'
import fpGet from 'lodash/fp/get'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import setChatDialog from 'helpers/setChatDialog'
import { getStateData } from 'helpers/get'
import { getChatList } from 'routes/action-common/chat'
import Dialog from 'components/Dialog'
import Chat from 'routes/my-office/common/vip/Chat'

const mapStateToProps = state => ({
  open: fpGet('chatDialog.data.open', state) || false,
  ...getStateData('chat.front', 'chat', state, false)
})
const mapDispatchToProps = {
  setChatDialog,
  getChatList
}

const withStyles = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet({
    chatContainer: {
      background: '#fff',
      color: '#000'
    },
    title: {
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: 'normal',
      marginBottom: '20px'
    }
  })
)

const ChatDialog = props => {
  const {
    open,
    classes,
    userData,
    chatList,
    ...otherProps
  } = props

  useEffect(() => {
    if (open) otherProps.getChatList()
  }, [open])

  const handleClose = () => otherProps.setChatDialog(false)

  return (
    <Dialog open={open} handleClose={handleClose} width={900}>
      <div className={classes.chatContainer}>
        <div className={classes.title}>Сообщения</div>
        <Chat
          showHeader={false}
          userData={userData}
          chatList={chatList}
        />
      </div>
    </Dialog>
  )
}

ChatDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  userData: PropTypes.object.isRequired,
  chatList: PropTypes.object.isRequired
}

export default withStyles(ChatDialog)
