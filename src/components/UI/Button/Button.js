import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyled = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
    background: #FFFFFF;
    border: 1px solid #F2C94C;
    box-sizing: border-box;
    border-radius: 5px;
    height: 50px;
    width: 200px;
    outline: 0;
    cursor: pointer;
    color: #F2C94C;
    margin-top: 10px;
    float: right;
`

ButtonStyled.propTypes = {
  children: PropTypes.node
}

export default ButtonStyled
