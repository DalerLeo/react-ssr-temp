import React, { useEffect, useState } from 'react'
import { getDuration } from 'utils/get'
import styled from 'styled-components'

const Time = styled.div`
color: #249E74;
`

const ONE = 1
const EVERY_SEC = 1000
const MINUTE = 60

const Timer = (props) => {
  const { time, onStop } = props

  const [count, setCount] = useState(time)

  useEffect(() => {
    let interval
    if (count) {
      interval = setInterval(() => {
        setCount((seconds) => seconds - ONE)
      }, EVERY_SEC)
    } else {
      onStop && onStop()
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [count, onStop])

  return (
    <Time>{getDuration(count)}</Time>
  )
}

export default Timer
