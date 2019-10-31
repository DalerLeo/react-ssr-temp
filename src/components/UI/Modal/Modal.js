import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { path } from 'ramda'

const ModalStyled = styled.div`
    position: absolute;
    top: 0;
    left: 100%;
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
    z-index: 9999;
`
const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    line-height: 129.96%;
    color: #2E384C;
    margin: 30px 35px;
`
const MenuListItems = styled.div`
  padding: 6px 0;
`
const Modal = (props) => {
  const { subCategories } = props

  const subChilds = path(['children'], subCategories)
  return (
    <ModalStyled>
      <MenuList>
        <b>{subChilds[1].parent.name}</b>
        {subChilds.map((subChild, id) => (
          <MenuListItems>{subChild.name}</MenuListItems>
        ))}
      </MenuList>
    </ModalStyled>
  )
}

Modal.propTypes = {
  subCategories: PropTypes.obj
}
export default Modal
