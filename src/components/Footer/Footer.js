import React from 'react'
import Container from 'components/StyledElems/Container'
import styled from 'styled-components'

const Wrapper = styled.div`
position: relative;
z-index: 3;
margin-top: 26px;
padding-top: 36px;
  padding-bottom: 40px;
  background-color: ${props => '#efefef'};
`

const Footer = props => {
  return (
    <Wrapper>
      <Container />
    </Wrapper>
  )
}

Footer.propTypes = {
}

export default Footer
