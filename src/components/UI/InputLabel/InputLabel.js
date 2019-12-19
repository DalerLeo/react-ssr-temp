import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputLabel = styled.div`
  color: black;
  display: ${props => (props.children ? 'block' : 'none')};
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 14px;
  text-transform: uppercase;
`

InputLabel.propTypes = {
  children: PropTypes.string
}

export default InputLabel
