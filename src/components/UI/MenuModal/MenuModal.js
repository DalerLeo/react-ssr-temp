import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'components/Link'
import { pathOr } from 'ramda'

const ModalStyled = styled.div`
    display: ${props => props.open ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 100%;
    width: auto;
    height: auto;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
    z-index: 9999;
    white-space: nowrap;
`
const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    line-height: 129.96%;
    color: #2E384C;
    margin: 30px 35px;
`
const MenuListItem = styled.div`
    padding: 6px 0;
    font-weight: 500;
    cursor: pointer;
    :hover{
      color: #2EBB8A;
    }
`
const defaultArr = []
const MenuModal = (props) => {
  const { subCategories = defaultArr, open } = props

  const subChilds = pathOr(defaultArr, ['children'], subCategories)
  return (
    <ModalStyled open={open}>
      <MenuList>
        {subChilds.map((subChild, key) => (
          <Link to={`/categories/${subChild.id}`} key={key}>
            <MenuListItem>{subChild.name}</MenuListItem>
          </Link>
        ))}
      </MenuList>
    </ModalStyled>
  )
}

MenuModal.propTypes = {
  subCategories: PropTypes.array,
  open: PropTypes.bool
}
export default MenuModal
