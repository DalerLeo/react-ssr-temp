import React from 'react'
import { useSelector } from 'react-redux'
import hexToRgb from 'utils/hexToRgb'
import styled, { keyframes } from 'styled-components'
import { equals, path } from 'ramda'

const LoadWrap = styled.div`
  animation: 'opacityAnim 1000ms';
  display: block;
  z-index: 2000;
//  background-color: #ffffff5e;
  position: fixed;
  top: 0;
  bottom: 0;
  text-align: center;
  width: 100%;
`

const Linear = styled.div`
  overflow: hidden;
  width: 100%;
  height: 3px;
  background-color: ${props => hexToRgb('#efefef', 0.4)};
`

const animFirst = keyframes`

  from {

    left: -100%;
    width: 100%;
  }

  to {
    left: 100%;
    width: 10%;
  }
`
const animSecond = keyframes`

  from {
    left: -150%;
    width: 100%
  }

  to {
    left: 100%;
    width: 10%
  }
`
const Inter = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  :before {
    animation: ${animFirst} 1.5s infinite ease-out;
    background-color: ${props => hexToRgb('#efefef', 0.63)};
    content: ' ';
    position: absolute;
    height: 100%;
  }
  :after {
    animation: ${animSecond} 1.5s infinite ease-in;
    background-color: ${props => hexToRgb('#efefef', 0.9)};
    content: ' ';
    position: absolute;
    height: 100%;
  }
`

const GlobalLoading = () => {
  const loading = useSelector(path(['asyncLoading', 'loading']), equals)
  if (loading) {
    return (
      <LoadWrap>
        <Linear>
          <Inter />
        </Linear>
      </LoadWrap>
    )
  }

  return null
}

GlobalLoading.propTypes = {
}

export default GlobalLoading
