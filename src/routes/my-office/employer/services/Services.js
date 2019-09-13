import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { animationStyle } from 'constants/styles'
import withHistory from 'helpers/withHistory'
import Container from 'components/Container'
import ActiveServices from './ActiveServices'
import UnusedServices from './UnusedServices'

const enhance = compose(
  withHistory,
  injectSheet({

  })
)

const EmployerServices = props => {
  const { servicesList, unusedServicesList, servicesFilter } = props

  return (
    <Container>
      <div style={animationStyle}>
        <UnusedServices data={unusedServicesList}/>
        <ActiveServices data={servicesList} filter={servicesFilter}/>
      </div>
    </Container>
  )
}

EmployerServices.propTypes = {
  classes: PropTypes.object,
  servicesFilter: PropTypes.object.isRequired,
  servicesList: PropTypes.object.isRequired,
  unusedServicesList: PropTypes.object.isRequired
}
export default enhance(EmployerServices)
