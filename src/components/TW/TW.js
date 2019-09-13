import React from 'react'
import PropTypes from 'prop-types'
import withLanguage from 'helpers/withLanguage'

const TW = ({ children, lang }) => {
  return <React.Fragment>{children(lang)}</React.Fragment>
}

TW.propTypes = {
  lang: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
}

export default withLanguage(TW)
