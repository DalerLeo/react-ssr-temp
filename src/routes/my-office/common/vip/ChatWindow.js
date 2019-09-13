import fp from 'lodash/fp'
import loReplace from 'lodash/replace'
import React from 'react'
import moment from 'moment'
import sprintf from 'sprintf'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import { RESUME_ITEM } from 'constants/routes'
import { isEmployer } from 'helpers/get'
import t from 'helpers/translate'
import Spinner from 'icons/Spinner'
import TextArea from 'antd/lib/input/TextArea'
import T from 'components/T'
import TW from 'components/TW'

const CHAT_BORDER_STYLE = '1px solid #E9ECEF'
const withStyles = injectSheet({
  chatWindow: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('flexGrow', '1'),
    ...crossBrowserify('flexDirection', 'column'),
    ...crossBrowserify('justifyContent', 'space-between'),
    ...crossBrowserify('borderRadius', '0 4px 4px 0'),
    background: 'white',
    border: CHAT_BORDER_STYLE
  },
  selectChat: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'center'),
    color: '#8798ad',
    fontWeight: '500',
    padding: '85px 65px'
  },
  chatHeader: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    borderBottom: CHAT_BORDER_STYLE,
    padding: '15px 20px'
  },
  chatMemberPhoto: {
    ...crossBrowserify('borderRadius', '50%'),
    extend: 'memberPhoto',
    height: '37px',
    minWidth: '37px',
    width: '37px'
  },
  chatMemberPosition: {
    fontWeight: '500',
    lineHeight: '22px'
  },
  chatMemberLastDate: {
    color: '#a1a7b3',
    fontSize: '13px'
  },

  chatBody: {
    ...crossBrowserify('flexGrow', '1'),
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    padding: '20px'
  },
  loader: {
    color: '#8798ad',
    display: 'block',
    margin: 'auto'
  },
  loadMore: {
    fontSize: '13px',
    cursor: 'pointer',
    color: '#8798ad',
    fontWeight: '500',
    lineHeight: '24px',
    textAlign: 'center'
  },
  chatMessageItem: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('flexWrap', 'wrap'),
    color: 'black',
    '&:not(:first-child)': {
      marginTop: '25px'
    },
    '& + $chatMessageItem:not($chatMessageItemMe)': {
      marginTop: '10px'
    }
  },
  chatMessageItemMe: {
    ...crossBrowserify('justifyContent', 'flex-end'),
    color: 'white',
    '& + $chatMessageItemMe': {
      marginTop: '10px'
    },
    '& + $chatMessageItem:not($chatMessageItemMe)': {
      marginTop: '25px'
    },
    '& $chatMessage': {
      background: MAIN_COLOR,
      '&:after': {
        left: 'unset',
        right: '-6px'
      }
    }
  },
  chatMessageLink: {
    '& $chatMessage': {
      color: 'inherit !important',
      textDecoration: 'none !important',
      '&:hover': {
        borderColor: MAIN_COLOR
      }
    }
  },
  chatMessage: {
    ...crossBrowserify('borderRadius', '5px'),
    ...crossBrowserify('transition', 'all 300ms'),
    background: '#ececee',
    border: '1px solid transparent',
    fontSize: '13px',
    display: 'inline-block',
    maxWidth: '70%',
    padding: '12px 15px',
    position: 'relative',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    '&:after': {
      ...crossBrowserify('borderRadius', '2px'),
      ...crossBrowserify('transform', 'rotate(45deg)'),
      background: 'inherit',
      position: 'absolute',
      bottom: '10px',
      left: '-6px',
      height: '14px',
      width: '14px'
    }
  },

  chatFooter: {
    borderTop: CHAT_BORDER_STYLE,
    padding: '20px'
  },
  messageInput: {
    border: 'none',
    color: 'inherit',
    fontSize: '13px',
    fontFamily: 'inherit',
    display: 'block',
    lineHeight: '20px',
    outline: 'none',
    resize: 'none',
    padding: '0',
    width: '100%',
    '&:focus': {
      boxShadow: 'none'
    }
  }
})

const ChatWindow = props => {
  const {
    classes,
    activeChatData,
    userData,
    chatMessages,
    isConnected,
    chatSocket,
    chatWindowRef,
    loading,
    hasMore,
    loadMore,
    momentChatFormat,
    emptyChatList
  } = props

  const chatTitle = isEmployer(userData)
    ? fp.get('resume.title', activeChatData)
    : fp.get('employer.title', activeChatData)
  const userEmail = fp.get('email', userData) || fp.get('username', userData)

  const lastMessage = fp.last(chatMessages)
  const lastMessageBySocket = fp.has('date', lastMessage)
  const lastMessageDate = lastMessageBySocket
    ? moment(fp.get('date', lastMessage), 'x')
    : moment(fp.get('createdDate', lastMessage))

  return (
    <div className={classes.chatWindow}>
      {activeChatData
        ? <React.Fragment>
          <div className={classes.chatHeader}>
            <div className={classes.chatMemberPhoto}/>
            <div>
              <div className={classes.chatMemberPosition}>{chatTitle}</div>
              {lastMessage &&
              <div className={classes.chatMemberLastDate}>
                <T>chat_last_message</T> {lastMessageDate.calendar(null, momentChatFormat)}
              </div>}
            </div>
          </div>
          <div ref={chatWindowRef} className={classes.chatBody}>
            {loading
              ? <Spinner className={classes.loader}/>
              : hasMore && <div className={classes.loadMore} onClick={loadMore}><T>chat_load_more</T></div>}
            {fp.map(item => {
              const fromDatabase = fp.has('sender', item)
              const isMe = fromDatabase
                ? fp.get('sender.email', item) === userEmail
                : fp.get('email', item) === userEmail
              const id = fp.get('id', item)
              const date = fp.get('date', item)
              const message = fp.get('message', item)
              const messageParsed = fromDatabase && JSON.parse(message)
              const resumeId = fp.get('resume.id', messageParsed)
              const resumeTitle = fp.get('resume.title', messageParsed)
              const messageFormatted = fromDatabase ? fp.get('message', messageParsed) : message
              return (
                <div key={id || date} className={classNames(classes.chatMessageItem, {
                  [classes.chatMessageLink]: resumeId,
                  [classes.chatMessageItemMe]: isMe
                })}>
                  {resumeId
                    ? <a
                      target={'_blank'}
                      href={sprintf(RESUME_ITEM, resumeId)}
                      className={classes.chatMessage}>{loReplace(messageFormatted, '[resume]', resumeTitle)}</a>
                    : <div className={classes.chatMessage}>{messageFormatted}</div>}
                </div>
              )
            }, chatMessages)}
          </div>
          {isConnected && <div className={classes.chatFooter}>
            <TW>
              {lang => (
                <TextArea
                  className={classes.messageInput}
                  placeholder={t('chat_write_message', lang)}
                  autosize={{ minRows: 1, maxRows: 10 }}
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
              )}
            </TW>
            <div className={classes.actionIcons}></div>
          </div>}
        </React.Fragment>
        : !emptyChatList && <div className={classes.selectChat}><T>chat_select_chat</T></div>}
    </div>
  )
}

ChatWindow.propTypes = {
  classes: PropTypes.object,
  activeChatData: PropTypes.object,
  userData: PropTypes.object,
  chatMessages: PropTypes.array,
  isConnected: PropTypes.bool,
  chatSocket: PropTypes.any,
  chatWindowRef: PropTypes.any,
  loadMore: PropTypes.func,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  momentChatFormat: PropTypes.object,
  emptyChatList: PropTypes.bool
}

export default withStyles(ChatWindow)
