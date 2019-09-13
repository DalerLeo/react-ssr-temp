import fp from 'lodash/fp'
import moment from 'moment'
import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { reduxForm } from 'redux-form'
import { ONE, WHITE_COLOR } from 'constants/styles'
import {
  getEmployerChatId,
  getChatMessages
} from 'routes/user/actions'
import styles from './styles'
import Phone from 'icons/Phone'
import Spinner from 'icons/Spinner'
import TextArea from 'antd/lib/input/TextArea'

const mapStateToProps = state => ({
  userData: fp.get(['user', 'data'], state),
  token: fp.get(['login', 'data', 'token'], state)
})

const enhance = compose(
  reduxForm({ form: 'LifeChatForm' }),
  connect(mapStateToProps, {
    getEmployerChatId,
    getChatMessages
  }),
  injectSheet(styles)
)

/* eslint-disable no-undef */
const LiveChat = props => {
  const { classes, userData, token, ...otherProps } = props

  const managerId = fp.get('manager.id', userData)
  const managerName = fp.get('manager.fullName', userData)
  const managerEmail = fp.get('manager.email', userData)
  const managerPhoto = fp.get('manager.photo.file', userData)
  const userEmail = fp.get('username', userData)

  const avatarStyle = { backgroundImage: managerPhoto ? `url(${managerPhoto})` : 'none' }

  const chatWindowRef = useRef(null)
  const [chatId, setChatId] = useState(null)
  const [chatSocket, setChatSocket] = useState(null)
  const [openChatDialog, setOpenChatDialog] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [apiPage, setApiPage] = useState(ONE)
  const [oldMessages, setOldMessages] = useState([])
  const [hasMoreMessages, setHasMoreMessages] = useState(null)

  const [initialLoading, setInitialLoading] = useState(false)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  const updateMessages = (response) => {
    const messages = fp.reverse(fp.get(['value', 'results'], response))
    setApiPage(apiPage + ONE)
    setHasMoreMessages(fp.get(['value', 'next'], response))
    setOldMessages([...messages, ...oldMessages])
    setChatMessages([...messages, ...chatMessages])
  }

  const loadMoreMessages = () => {
    setLoadMoreLoading(true)
    otherProps.getChatMessages(chatId, { pageSize: 6, page: apiPage })
      .then(response => {
        setLoadMoreLoading(false)
        updateMessages(response)
      })
  }

  useEffect(() => {
    const chatSocketAPI = 'ws://apimyjob.wienerdeming.com:8001/chat/staff'
    const chatSocketFullAddress = `${chatSocketAPI}/${managerId}?token=${token}`
    setChatSocket(new WebSocket(chatSocketFullAddress))
    setInitialLoading(true)
    otherProps.getEmployerChatId()
      .then(({ value }) => {
        if (value.chat) {
          setChatId(value.chat)
          otherProps.getChatMessages(value.chat, { pageSize: 6 })
            .then(response => {
              setInitialLoading(false)
              updateMessages(response)
            })
            .catch(() => setInitialLoading(false))
        } else {
          setInitialLoading(false)
        }
      })
    return () => {
      if (chatSocket) chatSocket.close()
    }
  }, [])

  useEffect(() => {
    if (openChatDialog) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '7px'
    } else {
      document.body.style = ''
    }
  }, [openChatDialog])

  if (chatSocket) {
    chatSocket.onmessage = ({ data }) => {
      const messageData = JSON.parse(data)
      const chatWindowEl = chatWindowRef.current
      const timeout = 50
      setChatMessages([...chatMessages, messageData])
      setTimeout(() => {
        if (chatWindowEl) chatWindowEl.scrollTop = 10000
      }, timeout)
    }
  }

  const onOpenChatWindow = () => setOpenChatDialog(true)
  const onCloseChatWindow = () => setOpenChatDialog(false)
  const toggleChatWindow = () => setOpenChatDialog(!openChatDialog)

  const loading = initialLoading || loadMoreLoading

  return (
    <div className={classNames(classes.chatWrapper, {
      [classes.chatWrapperOpen]: openChatDialog
    })}>
      {false && <div className={classes.button} onClick={onOpenChatWindow}>
        <Phone color={WHITE_COLOR}/>
      </div>}
      <div className={classNames(classes.wrapper, {
        [classes.open]: openChatDialog
      })}>
        <div className={classes.header} onClick={toggleChatWindow}>
          <div className={classes.title}>
            <span className={classNames(classes.status, {
              [classes.statusActive]: true
            })}/>
            <span>Онлайн консультант</span>
          </div>
          {false && <div className={classes.close} onClick={onCloseChatWindow}>
            <span/>
          </div>}
        </div>

        <div className={classes.chat}>
          <div className={classes.user}>
            <div className={classes.avatar} style={avatarStyle}/>
            <div>
              <div className={classes.name}>{managerName}</div>
              <div>{managerEmail}</div>
            </div>
          </div>
        </div>

        <section className={classes.messagesWrapper}>
          <div className={classes.messages} ref={chatWindowRef}>
            {hasMoreMessages && !loading &&
            <div className={classes.loadMore} onClick={loadMoreMessages}>Load more</div>}
            {loading && <Spinner className={classes.loader}/>}
            {fp.map(item => {
              const fromDatabase = fp.has('sender', item)
              const id = fp.get('id', item)
              const date = fp.get('date', item)
              const message = fromDatabase ? JSON.parse(fp.get('message', item)) : fp.get('message', item)
              const messageFormatted = fromDatabase ? message.message : message
              const email = fp.get('email', item) || fp.get('sender.email', item)
              const employer = fp.get('employer.title', message)
              const order = fp.get('order.id', message)
              return (
                <div key={id || date} className={classNames(classes.message, {
                  [classes.ownMessage]: userEmail === email
                })}>
                  {order
                    ? <span>{fp.flow(
                      fp.replace('[employer]', employer),
                      fp.replace('[order]', `№${order}`)
                    )(messageFormatted)}</span>
                    : <span>{messageFormatted}</span>}
                </div>
              )
            }, chatMessages)}
          </div>
        </section>

        <div className={classes.form}>
          <TextArea
            autosize={{ minRows: 1, maxRows: 10 }}
            className={classes.input}
            placeholder={'Напишите сообщение'}
            onPressEnter={(event) => {
              const withShift = event.shiftKey
              const value = fp.trim(event.target.value)
              if (!withShift) {
                event.preventDefault()
                event.target.value = ''
                const messageData = {
                  message: value,
                  email: userEmail,
                  date: moment().format('x')
                }

                if (!fp.isEmpty(value)) {
                  chatSocket.send(JSON.stringify(messageData))
                }
              } else if (fp.isEmpty(value)) {
                event.preventDefault()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

LiveChat.propTypes = {
  classes: propTypes.object,
  userData: propTypes.object,
  token: propTypes.string
}

export default enhance(LiveChat)
