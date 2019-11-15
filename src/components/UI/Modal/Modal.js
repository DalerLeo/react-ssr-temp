import React, { useState } from 'react'
import styled from 'styled-components'
import Plus from 'icons/Plus'
import ModalWindow from './ModalWindow'
const ModalContainer = styled.div`
    
`
const ModalButton = styled.div`
    display: flex;
    background-color: #FFF;
    padding: 50px;
    border-radius: 7px;
    border: 1px solid lightgreen;
    cursor: pointer;

`
const CardText = styled.div`
  margin-left: 10px;
`
const Modal = (props) => {
  const [show, setShow] = useState(false)
  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)

  return (
    <ModalContainer>
      <ModalButton onClick={openModal}><Plus /> <CardText>Show modal</CardText></ModalButton>
      <ModalWindow closeModal={closeModal} show={show} />
    </ModalContainer>
  )
}

export default Modal
