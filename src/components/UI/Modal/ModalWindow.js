import React from 'react'
import styled from 'styled-components'
import { FormField } from 'components/UI/FormField'
import { Button } from 'components/UI/Button'

const Hide = styled.div`
    display: none;
`
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0000003a;
    transition: opacity 0.2s ease;
    z-index: 9998;
`

const Modal = styled.div`
    width: 500px;
    position: absolute;
    top: -10%;
    left: 35%;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 7px;
    transform: translateY(100%);
    transition: transform 0.2s ease;
    z-index: 9999;
`
const CloseButton = styled.button`
    position: absolute;
    right: 1.4rem;
    top: 2.5rem;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 1px 1px 1px #0000003a;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.562);
`
const ModalWindow = (props) => {
  const { show, closeModal, children } = props

  return (
    <div>
      {show ? <Overlay onClick={closeModal} /> : <Hide />}
      {show && <Modal>
        <CloseButton onClick={closeModal}>X</CloseButton>
        {children}
      </Modal>}
    </div>
  )
}

export default ModalWindow
