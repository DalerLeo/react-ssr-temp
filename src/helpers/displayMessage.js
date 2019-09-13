import message from 'antd/lib/message'

message.config({
  top: 120,
  duration: 3,
  maxCount: 1
})

const displayMessage = (text, type) => {
  switch (type) {
    case 'success': return message.success(text)
    case 'error': return message.error(text)
    case 'warning': return message.warning(text)
    default: return message.info(text)
  }
}

export default displayMessage
