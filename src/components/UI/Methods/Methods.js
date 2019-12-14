import React from 'react'
import styled from 'styled-components'

const MethodsBlock = styled.div`
    width: 350px;
    border: 2px solid green;
    border-radius: 7px;
    cursor: pointer;
    padding: 10px 20px;
    margin-bottom: 20px;
`
const MethodFTitleFlex = styled.div`
    display: flex;
    justify-content: space-between;
`
const MethodTitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    line-height: 1.67;
`
const MethodPrise = styled.div`
    color: #13885F;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.67;
`
const MethodSubTitle = styled.div`
    color: #8492B0;
    margin: 3px 0;
    font-size: 13px;
    line-height: 1.38;
`
const MethodFooterTitle = styled.div`
    color: #13885F;
    font-size: 13px;
    line-height: 1.38;
    font-weight: 500;
`
const Methods = (props) => {
  const { data } = props
  console.warn(data)
  return (
    <div>
      {data.map((item, key) => {
        return (
          <MethodsBlock key={key}>
            <MethodFTitleFlex>
              <MethodTitle>{item.name}</MethodTitle>
              <MethodPrise>{item.price} сум</MethodPrise>
            </MethodFTitleFlex>
            <MethodSubTitle>
              {item.title}
            </MethodSubTitle>
            <MethodFooterTitle>
              {item.address}
            </MethodFooterTitle>
          </MethodsBlock>
        )
      })}

    </div>
  )
}

export default Methods
