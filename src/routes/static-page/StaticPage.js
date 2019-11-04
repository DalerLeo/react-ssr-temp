import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Container from 'components/Container'
import HtmlContent from 'components/HtmlContent'

const withStyles = injectSheet({
  wrapper: {
    margin: '50px 0',
  },
  pageTitle: {},
  content: {
    lineHeight: '25px',
  },
})

const StaticPage = props => {
  const { classes, pageDetail } = props
  const pageData = fp.get('data', pageDetail)
  const pageLoading = fp.get('loading', pageDetail)

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <HtmlContent />
        </div>
      </div>
    </Container>
  )
}

StaticPage.propTypes = {
  classes: PropTypes.object,
  pageDetail: PropTypes.object.isRequired,
}

export default withStyles(StaticPage)
