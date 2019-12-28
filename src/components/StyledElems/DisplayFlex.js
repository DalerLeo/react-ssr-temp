import PropTypes from 'prop-types'
import styled from 'styled-components'

const DisplayFlex = styled.div`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
`

DisplayFlex.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string
}

export default DisplayFlex
