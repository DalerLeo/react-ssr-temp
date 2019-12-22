import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.div`
  line-height: 129.96%;
  display: flex;
  margin-bottom: 14px;
`

const LabelWrap = styled.div`
width: 45%;
  position: relative;
 :before {
     z-index: 1;
    content: " ";
    position: absolute;
    bottom: 0.2em;
    left: 0;
    height: 1px;
    width: 100%;
    border-bottom: 1px dashed;
    border-bottom-color: #818591;

 }
`

const Label = styled.span`
color: #818591;
background: #f9fafb;
position: relative;
padding-right: 4px;
z-index: 2;
`

const Value = styled.span`
  padding-left: 5px;
  white-space: nowrap;
`
const Feature = props => {
  const { children, label } = props

  return (
    <Wrap>
      <LabelWrap><Label>{label}</Label></LabelWrap>
      <Value>{children}</Value>
    </Wrap>
  )
}

Feature.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string
}

export default Feature
