import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyled = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
    background: #FFDD2D;
    border: 1px solid #FFDD2D;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border-radius: ${props => props.theme.borderRadius};
    padding: 10px 0;
    width: 187px;
    height: 55px;
    outline: 0;
    cursor: pointer;
    color: #333333;
`

ButtonStyled.propTypes = {
  children: PropTypes.node
}

export default ButtonStyled
