import React from 'react'
import Container from 'components/Container'
import styled from 'styled-components'
import { Col, Row } from 'components/Grid'
import NewLogo from 'icons/NewLogo'

const Wrapper = styled.div`
position: relative;
z-index: 3;
padding-top: 36px;
  padding-bottom: 40px;
  background-color: ${props => '#FFFFFF'};
`
const FooterTitle = styled.div`
  padding: 5px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
`
const FooterSubTitle = styled.div`
  padding: 5px;
  cursor: pointer;
`
const Footer = props => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <FooterTitle><NewLogo /></FooterTitle>
            <FooterSubTitle>© 2020 ООО «Avto» </FooterSubTitle>
            <FooterSubTitle>Все права защищены</FooterSubTitle>
          </Col>
          <Col>
            <FooterTitle>О копании</FooterTitle>
            <FooterSubTitle>Работа в копнании</FooterSubTitle>
            <FooterSubTitle>Контакты</FooterSubTitle>
            <FooterSubTitle>Новости</FooterSubTitle>
          </Col>
          <Col>
            <FooterTitle>Покупателям</FooterTitle>
            <FooterSubTitle>Доставка и оплата</FooterSubTitle>
            <FooterSubTitle>Как вернуть</FooterSubTitle>
            <FooterSubTitle>Как заказать</FooterSubTitle>
            <FooterSubTitle>Вопросы и ответы</FooterSubTitle>
          </Col>
          <Col>
            <FooterTitle>Партнерам</FooterTitle>
            <FooterSubTitle>Как начать сотрудничество</FooterSubTitle>
            <FooterSubTitle>Справка для партнеров</FooterSubTitle>
          </Col>
          <Col>
            <FooterTitle>998 (97) 123 45 67</FooterTitle>
            <FooterSubTitle>Круглосуточная тех. поддержка</FooterSubTitle>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

Footer.propTypes = {
}

export default Footer
