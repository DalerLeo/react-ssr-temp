import fpGet from 'lodash/fp/get'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  connect(state => {
    return {
      lang: fpGet('lang.data', state)
    }
  }),
  pure
)
