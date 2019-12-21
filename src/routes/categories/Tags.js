import React from 'react'
import styled from 'styled-components'
import DeleteIcon from 'icons/TagDelete'

const TagField = styled.div`
    display: flex;
    align-items: center;
    padding: 0 9px;
    height: 31px;
    background: #EAEBED;
    border-radius: 16px;
    margin-bottom: 10px;
    margin-right: 10px;
`

const TagText = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 129.96%;
    color: #2E384C;
    flex: none;
    order: 0;
    margin-right: 6px;
`
const TagDelete = styled.div`
    cursor: pointer;
`

const TagCancel = styled.button`
    background: #EAEBED;
    border-radius: 4px;
    border: 0;
    width: 100%;
`
const Tags = (props) => {
  const { label } = props
  return (
    <div>
      <TagField>
        <TagText>
          {label}
        </TagText>
        <TagDelete>
          <DeleteIcon />
        </TagDelete>
      </TagField>
    </div>
  )
}

export default Tags
