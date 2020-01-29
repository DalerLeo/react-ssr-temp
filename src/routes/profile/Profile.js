import React from 'react'
import styled from 'styled-components'
import Container from 'components/Container'
import { Row, Col } from 'components/Grid'
import ProfileUI from './ProfileUI'
import Sms from './Sms'

const RowUI = styled(Row)`
  margin-bottom: 60px;
`
const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 119.46%;
  color: #2E384C;
  mix-blend-mode: normal;
  margin-top: 35px;
`
const SubTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  color: #2E384C;
  margin-top: 35px;
  margin-bottom: 20px;
`
const Profile = (props) => {
  const {
    userData,
    listAddress,
    onDelete,
    onFullnameUpdate,
    onPicUpdate,
    onLangUpdate,
    onSubscriptionChange,
    languageList
  } = props
  return (
    <Container>
      <RowUI>
        <Col span={12}>
          <Title>Настройки</Title>
          <SubTitle>Личные данные</SubTitle>
          <ProfileUI
            onPicUpdate={onPicUpdate}
            {...userData}
            listAddress={listAddress}
            onDelete={onDelete}
            onFullnameUpdate={onFullnameUpdate}
          />
          <SubTitle>SMS рассылка</SubTitle>
          <Sms
            {...userData}
            onLangUpdate={onLangUpdate}
            languageList={languageList}
            onSubscriptionChange={onSubscriptionChange}
          />
        </Col>
        <Col span={12} />
      </RowUI>
    </Container>
  )
}

export default Profile
