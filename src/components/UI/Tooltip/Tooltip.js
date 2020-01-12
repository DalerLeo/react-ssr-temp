import React from 'react'
import styled from 'styled-components'
import FavoriteIcon from 'icons/Favorite'
import Link from 'components/Link'

const TooltipContent = styled.div`
    display: none;
    position: absolute;
    left: -110px;
    top: -42px;
    background-color: #fff;
    color: black;
    border-radius: 7px;
    min-width: 250px;
    width: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
`
const TooltipStyled = styled.div`
    position: relative;
    display: inline-block;
    opasity: 0;
    height: 74px;
    &:hover ${TooltipContent} {
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.11);
        display: block;
        opasity: 1;
        transition: opasity 2s;
    }
`

const Tooltip = (children) => {
  return (
    <TooltipStyled>
      <FavoriteIcon />
      <TooltipContent>
        <Link to="/sign-in"> Сначало Зарегистрируйтесь</Link>
      </TooltipContent>
    </TooltipStyled>
  )
}

export default Tooltip
