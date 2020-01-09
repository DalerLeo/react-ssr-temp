import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyled = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
    background: #C7F9DD;
    border-radius: 7px;
    height: 50px;
    width: 200px;
    border: none;
    outline: 0;
    cursor: pointer;
    color: #13885F;
    margin-top: 10px;
    float: right;
`

ButtonStyled.propTypes = {
  children: PropTypes.node
}

export default ButtonStyled
