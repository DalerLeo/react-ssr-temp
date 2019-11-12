import React from 'react'
import styled from 'styled-components'
import My404 from '../../icons/404'

const Wrapper = styled.div`
  padding: 200px 0;
  text-align: center;
`

const ErrorCode = styled.div`
  color: #5A308D;
  font-size: 100px;
  font-weight: bold;
   span {
   margin-left: 20px;
   }
`

const ErrorText = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`

const NotFound = props => {
  return (
    <Wrapper>
      <ErrorCode>
        <My404 /><span>404</span>
      </ErrorCode>
      <ErrorText />
    </Wrapper>
  )
}

NotFound.propTypes = {

}

export default NotFound
