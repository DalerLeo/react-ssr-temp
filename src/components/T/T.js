import React from 'react'
import PropTypes from 'prop-types'
import sprintf from 'sprintf'
import t from 'helpers/translate'
import withLanguage from 'helpers/withLanguage'

const T = ({ children, lang, dispatch, ...props }) => {
  return (
    <React.Fragment>
      {sprintf(t(children, lang), props)}
    </React.Fragment>
  )
}

T.propTypes = {
  lang: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])
}

export default withLanguage(T)
