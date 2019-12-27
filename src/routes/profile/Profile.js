import React from 'react'
import styled from 'styled-components'
import Container from 'components/Container'
import { Row, Col } from 'components/Grid'
import ProfileUI from './ProfileUI'
import Sms from './Sms'

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
  const { userData } = props
  return (
    <Container>
      <Row>
        <Col span={12}>
          <Title>Настройки</Title>
          <SubTitle>Личные данные</SubTitle>
          <ProfileUI {...userData} />
          <SubTitle>SMS рассылка</SubTitle>
          <Sms />
        </Col>
        <Col span={12} />
      </Row>
    </Container>
  )
}

export default Profile
