import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Container from 'components/Container'
const enhance = compose(
)

const Header = props => {
  const {
    classes
  } = props

  return (
    <Container className={classes.container}>
      Header
    </Container>
  )
}

Header.propTypes = {
  classes: PropTypes.object
}
export default enhance(Header)
