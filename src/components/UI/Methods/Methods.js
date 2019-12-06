import React from 'react'
import styled from 'styled-components'

const MethodsBlock = styled.div`
    width: 330px;
    border: 1px solid grey;
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
  return (
    <div>
      <MethodsBlock>
        <MethodFTitleFlex>
          <MethodTitle>Сверхсрочная доставка</MethodTitle>
          <MethodPrise>12000 сум</MethodPrise>
        </MethodFTitleFlex>
        <MethodSubTitle>
            Ну очень быстрая доставка. Доставит сам Флэш.
        </MethodSubTitle>
        <MethodFooterTitle>
            Только если вы не живете на Сергелийском районе.
        </MethodFooterTitle>
      </MethodsBlock>
    </div>
  )
}

export default Methods
