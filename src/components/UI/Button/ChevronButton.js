import React, { useState } from 'react'
import ChevDownIcon from 'icons/ChevDown'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useRoute from 'hooks/useRoute'
import { includes } from 'ramda'

const ChevronStyled = styled.div`
    cursor: pointer;
`
const ChevIconStyled = styled(ChevDownIcon)`
    transform: rotate(${props => props.isFiltered ? '180' : '0'}deg);
    transition: 0.3s;
`

const DASH = '-'
const ChevronButton = (props) => {
  const { label, value } = props
  const { getParam, setParam } = useRoute()

  const param = getParam('ordering') || ''
  const growing = !includes(DASH, param)
  const nill = param === ''
  const [isFiltered, setIsFiltered] = useState(true)
  const onToggle = () => setIsFiltered(!isFiltered)
  const onChange = () => {
    if (nill) {
      setParam({ ordering: value })
    }
    if (!nill && growing) {
      setParam({ ordering: `${DASH}${value}` })
      onToggle()
    }

    if (!nill && !growing) {
      setParam({ ordering: '' })
      onToggle()
    }
  }
  return (
    <ChevronStyled onClick={onChange}>
      {label} {!nill && <ChevIconStyled isFiltered={isFiltered} />}
    </ChevronStyled>
  )
}

ChevronButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
export default ChevronButton
