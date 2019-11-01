import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import Container from '../../components/Container'
import styles from './styles'

const enhance = compose(
  injectSheet(styles)
)

const Articles = props => {
  const { classes } = props
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.pageTitle} />
      </Container>
    </div>
  )
}

Articles.propTypes = {
  classes: PropTypes.object,
}

export default enhance(Articles)
