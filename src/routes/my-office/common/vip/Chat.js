import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import fp from 'lodash/fp'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import moment from 'moment'
import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  MAIN_COLOR,
  ZERO, ONE
} from 'constants/styles'
import { getCookieToken } from 'helpers/getCookieToken'
import { isEmployer } from 'helpers/get'
import { getChatMessages } from 'routes/user/actions'
import Star from 'icons/Star'
import SendIcon from 'icons/SendMessage'
import Attach from 'icons/Attach'
import T from 'components/T'
import CardRating from 'components/Cards/CardRating'
import ProfilePic from 'components/ProfilePic'
import ChatWindow from './ChatWindow'

const CHAT_BORDER_STYLE = '1px solid #E9ECEF'
const withStyles = compose(
  connect(() => {
    return {}
  }, { getChatMessages }),
  injectSheet({
    chatWrapper: {

    },
    newMessages: {
      color: BLACK_COLOR,
      fontSize: '16px',
      marginBottom: '28px',
      '& span': {
        color: MAIN_COLOR,
        fontWeight: '600'
      }
    },
    chatContainer: {
      ...fallbacksStyle('display', 'flex'),
      height: '590px',
      overflow: 'hidden'
    },
    chatMembers: {
      ...crossBrowserify('borderRadius', '4px 0 0 4px'),
      background: '#F9FAFB',
      overflowY: 'auto',
      minWidth: '325px',
      width: '325px'
    },
    emptyChat: {
      color: '#8798ad',
      fontWeight: '500',
      padding: '85px 20px',
      textAlign: 'center'
    },
    chatMember: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      borderBottom: CHAT_BORDER_STYLE,
      color: BLACK_COLOR,
      cursor: 'pointer',
      padding: '20px 16px 20px 20px',
      height: '90px',
      '&:hover': {
        background: '#ececee',
        '& $memberPhoto': {
          backgroundColor: '#fff'
        }
      },
      '&:active, &$chatMemberActive': {
        background: MAIN_COLOR,
        color: 'white',
        '& $chatDate': {
          color: 'white'
        },
        '& $newMessagesCount': {
          background: 'white',
          color: MAIN_COLOR
        },
        '& $rating': {
          color: '#fff'
        }
      }
    },
    chatMemberActive: {},
    memberInfo: {
      ...crossBrowserify('flexGrow', '1')
    },
    memberPhoto: {
      backgroundColor: '#E9ECEF',
      marginRight: '15px',
      height: '50px',
      minWidth: '50px',
      width: '50px'
    },
    flexx: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      '&:not(:last-child)': {
        marginBottom: '8px'
      }
    },
    memberPosition: {
      fontSize: '14px'
    },
    chatDate: {
      color: '#A1A7B3',
      fontSize: '13px'
    },
    rating: {

    },
    newMessagesCount: {
      ...crossBrowserify('borderRadius', '20px'),
      background: MAIN_COLOR,
      color: 'white',
      fontSize: '11px',
      fontWeight: '600',
      lineHeight: '18px',
      padding: '0 4px',
      textAlign: 'center',
      height: '18px',
      minWidth: '18px'
    }
  })
)

const momentChatFormat = {
  sameDay: 'HH:mm',
  lastDay: 'HH:mm',
  lastWeek: 'dd',
  sameElse: 'DD.MM.YY'
}

class ChatClass extends React.Component {
  constructor (props) {
    super(props)
    this.didMount = false
    this.chatSocket = null
    this.chatWindow = React.createRef()
    this.state = {
      loading: false,
      chatId: null,
      chatMessages: [],
      chatListCopy: [],
      activeChatUser: null,
      isConnected: false,
      chatError: null,

      oldMessages: [],
      oldMessagesPage: 1,
      oldMessagesCount: null,
      oldMessagesLoading: false
    }

    this.connectChat = this.connectChat.bind(this)
    this.socketOnConnect = this.socketOnConnect.bind(this)
    this.socketOnMessage = this.socketOnMessage.bind(this)
    this.socketOnClose = this.socketOnClose.bind(this)
    this.socketOnError = this.socketOnError.bind(this)
    this.reconnectToChat = this.reconnectToChat.bind(this)
    this.scrollChatWindow = this.scrollChatWindow.bind(this)
    this.fetchOldMessages = this.fetchOldMessages.bind(this)
    this.loadMoreMessages = this.loadMoreMessages.bind(this)
  }

  connectChat (activeChatUser) {
    /* eslint-disable no-undef */
    const receicerUserType = isEmployer(this.props.userData) ? 'applicant' : 'employer'
    const chatSocketAPI = `ws://apimyjob.wienerdeming.com:8001/chat/${receicerUserType}`
    const token = getCookieToken(document.cookie)
    this.setState({ loading: true })
    if (this.didMount) {
      this.chatSocket = new WebSocket(`${chatSocketAPI}/${activeChatUser}?token=${token}`)
    }
  }

  socketOnConnect () {
    this.chatSocket.onopen = event => {
      this.setState({
        loading: false,
        isConnected: true
      })
      console.warn('connected', event)
    }
  }

  socketOnMessage () {
    this.chatSocket.onmessage = event => {
      const eventData = fp.get('data', event)
      const data = JSON.parse(eventData)
      this.setState({
        chatMessages: [
          ...this.state.chatMessages,
          data
        ]
      })
      this.scrollChatWindow()
    }
  }

  socketOnClose (activeChatUser) {
    this.chatSocket.onclose = () => {
      this.setState({
        loading: false,
        isConnected: false,
        activeChatUser: null,
        chatError: 'Соединение прервано'
      })
      this.reconnectToChat(activeChatUser)
      console.warn('closed')
    }
  }

  socketOnError () {
    this.chatSocket.onerror = event => {
      console.warn('error', event)
      this.setState({
        loading: false,
        activeChatUser: null
      })
    }
  }

  reconnectToChat (activeChatUser) {
    const TIMEOUT = 2000
    if (this.didMount) {
      setTimeout(() => {
        console.warn('reconnecting')
        this.connectChat(activeChatUser)
      }, TIMEOUT)
    }
  }

  scrollChatWindow () {
    const chatWindow = this.chatWindow.current
    if (chatWindow) {
      chatWindow.scrollTop = 1000000
    }
  }

  fetchOldMessages (chatId) {
    const TIMEOUT = 100
    this.setState({ oldMessagesLoading: true })
    this.props.getChatMessages(chatId)
      .then(({ value }) => {
        const messages = fp.flow(
          fp.get('results'),
          fp.reverse
        )(value)
        this.setState({
          oldMessages: messages,
          chatMessages: messages,
          oldMessagesLoading: false,
          oldMessagesCount: fp.get('count', value),
          oldMessagesPage: this.state.oldMessagesPage + ONE
        })
        setTimeout(() => {
          this.scrollChatWindow()
        }, TIMEOUT)
      })
  }

  componentDidMount () {
    this.didMount = true
  }
  componentDidUpdate (prevProps, prevState) {
    /* eslint-disable max-depth */
    const { chatList } = this.props
    const { activeChatUser, chatId } = this.state
    if (activeChatUser !== prevState.activeChatUser) {
      this.setState({
        chatMessages: [],
        oldMessages: [],
        oldMessagesPage: 1
      })
      if (activeChatUser) {
        if (this.chatSocket) this.chatSocket.close()
        // Clear new messages count from chat
        this.setState({
          chatListCopy: fp.map(item => {
            const thisChatId = fp.get('chat.id', item)
            if (thisChatId === chatId) {
              return {
                ...item,
                chat: {
                  ...item.chat,
                  newMessagesCount: 0
                }
              }
            }
            return item
          }, this.state.chatListCopy)
        })
        this.connectChat(activeChatUser)
        this.socketOnMessage()
        this.socketOnConnect()
        // This.socketOnClose(activeChatUser)
        this.socketOnError()
      }
    }
    if (chatId !== prevState.chatId && chatId) {
      this.fetchOldMessages(chatId)
    }
    // Set chatListCopy
    if (prevProps.chatList.loading !== chatList.loading && !chatList.loading) {
      this.setState({
        chatListCopy: chatList.data
      })
    }
  }
  componentWillUnmount () {
    this.didMount = false
    if (this.chatSocket) {
      this.chatSocket.close()
    }
  }

  loadMoreMessages () {
    const lastMessageId = fp.flow(
      fp.last,
      fp.get('id')
    )(this.state.oldMessages)
    this.setState({ oldMessagesLoading: true })
    this.props.getChatMessages(this.state.chatId, {
      id: lastMessageId,
      page: this.state.oldMessagesPage
    })
      .then(({ value }) => {
        const messages = fp.flow(
          fp.get('results'),
          fp.reverse
        )(value)
        this.setState({
          oldMessages: [...messages, ...this.state.oldMessages],
          chatMessages: [...messages, ...this.state.chatMessages],
          oldMessagesPage: this.state.oldMessagesPage + ONE,
          oldMessagesLoading: false
        })
      })
  }

  render () {
    const {
      classes,
      userData,
      chatList,
      showHeader
    } = this.props
    const {
      // Socket loading
      // _loading,
      chatListCopy,
      isConnected,
      activeChatUser,
      chatMessages,
      oldMessages,
      oldMessagesCount,
      oldMessagesLoading
    } = this.state

    const emptyChatList = fp.isEmpty(chatListCopy) && !chatList.loading

    const newMessagesCount = fp.sumBy(fp.get('chat.newMessagesCount'), chatListCopy)
    const hasMoreMessages = oldMessagesCount > oldMessages.length

    const MAX_NEW_MESSAGES_COUNT = 99
    const userIsEmployer = isEmployer(userData)
    const userEmail = fp.get('email', userData) || fp.get('username', userData)
    const activeChatData = fp.find(item => {
      return userIsEmployer
        ? fp.get('resume.owner.id', item) === activeChatUser
        : fp.get('employer.id', item) === activeChatUser
    }, chatListCopy)
    return (
      <div className={classes.chatWrapper}>
        {newMessagesCount > ZERO && showHeader &&
        <div className={classes.newMessages}><T>chat_new_messages</T> <span>+{newMessagesCount}</span></div>}
        <div className={classes.chatContainer}>
          <div className={classes.chatMembers}>
            {emptyChatList
              ? <div className={classes.emptyChat}><T>chat_no_messages</T></div>
              : fp.map(item => {
                const chatId = fp.getOr(null, 'chat.id', item)
                const resume = fp.get('resume', item)
                const employer = fp.get('employer', item)
                const id = userIsEmployer ? fp.get('id', resume) : fp.get('id', employer)
                const name = userIsEmployer ? fp.get('title', resume) : fp.get('title', employer)
                const lastMessageDate = fp.get('lastMessageDate', item)
                const chatDateFormatted = moment(lastMessageDate).calendar(null, momentChatFormat)
                const applicant = fp.get('owner.id', resume)
                const rating = fp.get('owner.rating', resume)
                const photo = userIsEmployer ? fp.get('owner.photo.file', resume) : fp.get('logo.file', employer)
                const newMessages = fp.get('chat.newMessagesCount', item)
                const isActiveChat = userIsEmployer ? applicant === activeChatUser : id === activeChatUser

                return (
                  <div
                    key={id}
                    className={classNames(classes.chatMember, {
                      [classes.chatMemberActive]: isActiveChat
                    })}
                    onClick={() => this.setState({
                      activeChatUser: userIsEmployer ? applicant : id,
                      chatId
                    })}>
                    <ProfilePic className={classes.memberPhoto} image={photo}/>
                    <div className={classes.memberInfo}>
                      <div className={classes.flexx}>
                        <div className={classes.memberPosition}>{name}</div>
                        <div className={classes.chatDate}>{chatDateFormatted}</div>
                      </div>
                      <div className={classes.flexx}>
                        {userIsEmployer ? <CardRating className={classes.rating} rating={rating}/> : <span/>}
                        {newMessages > ZERO &&
                        <div className={classes.newMessagesCount}>
                          {newMessages > MAX_NEW_MESSAGES_COUNT
                            ? `${MAX_NEW_MESSAGES_COUNT}+`
                            : newMessages}
                        </div>}
                      </div>
                    </div>
                  </div>
                )
              }, chatListCopy)}
          </div>
          <ChatWindow
            userData={userData}
            userEmail={userEmail}
            isConnected={isConnected}
            activeChatData={activeChatData}
            chatMessages={chatMessages}
            chatSocket={this.chatSocket}
            chatWindowRef={this.chatWindow}
            loadMore={this.loadMoreMessages}
            loading={oldMessagesLoading}
            hasMore={hasMoreMessages}
            momentChatFormat={momentChatFormat}
            emptyChatList={emptyChatList}
          />
        </div>
      </div>
    )
  }
}

ChatClass.propTypes = {
  classes: PropTypes.object,
  showHeader: PropTypes.bool,
  userData: PropTypes.object,
  chatList: PropTypes.object.isRequired,
  getChatMessages: PropTypes.func
}

ChatClass.defaultProps = {
  showHeader: true
}

export default withStyles(ChatClass)
