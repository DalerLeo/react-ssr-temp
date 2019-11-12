import PropTypes from 'prop-types'
import styled from 'styled-components'


const ButtonStyled = styled.button`
    background: #C7F9DD;
    border-radius: 7px;
    height: 46px;
    width: 112px;
    border: none;
    outline: 0;
    cursor: pointer;
    color: #13885F;
`
const ButtonText = styled.div`
    color: #13885F;
`


ButtonStyled.propTypes = {
  children: PropTypes.node
}

export default ButtonStyled
