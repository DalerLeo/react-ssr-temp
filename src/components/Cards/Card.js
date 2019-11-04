import PropTypes from 'prop-types'
import styled from 'styled-components'

const Card = styled.div`
    background-color: #FFF;
    height: 396px;
    width: 25%;
`

Card.propTypes = {
  children: PropTypes.string
}

export default Card
