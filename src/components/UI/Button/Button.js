import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyled = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
    background: #FFFFFF;
    border: 1px solid #F2C94C;
    box-sizing: border-box;
    border-radius: ${props => props.theme.borderRadius};
    padding: 10px 0;
    width: 100%;
    outline: 0;
    cursor: pointer;
    color: #F2C94C;
`

ButtonStyled.propTypes = {
  children: PropTypes.node
}

export default ButtonStyled
