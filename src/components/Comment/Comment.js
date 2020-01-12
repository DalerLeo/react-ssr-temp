import React, { useState } from 'react'
import styled from 'styled-components'
import { Field, Form } from 'react-final-form'
import TextArea from 'components/UI/FormField/TextArea'
import ProfileImage from 'images/Profile.png'
import { Row, Col } from 'components/Grid'
import { pathOr, path } from 'ramda'
import NoMessage from 'images/leadership.png'
import { dateTimeFormat } from 'utils/dateFormat'
import Link from 'components/Link'

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 164.57%;
  color: #2E384C;
`
const ButtonBlock = styled.div`
    float: right;
    margin-top: 20px;
`
const ProfileImageStyled = styled.img`
  max-width: 64px;
  max-height: 64px;
  margin: 0 10px;
  border-radius: 50%;
`
const CommentFormBlock = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
  margin-bottom: 50px;
`
const CreateComment = styled.button`
  background: #FFFFFF;
  border: 1px solid #2E384C;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px 30px;
  margin-bottom: 30px;
  cursor: pointer;
`
const CommentDate = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 129.96%;
  color: #818591;
  margin-bottom: 7px;
`
const CommentName = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 129.96%;
  color: #2E384C;
`
const RowUI = styled.div`
  display: flex;
  justify-content: space-between;
`
const CancelButton = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  color: #777E86;
  background: transparent;
  border: none;
  outline: 0;
  cursor: pointer;
`
const SendButton = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  color: #2EBB8A;
  background: transparent;
  border: none;
  outline: 0;
  cursor: pointer;
`
const NoImageBlock = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`
const NoMessageImage = styled.img`
  height: 200px;
  width: 20%;
`
const LoginRedirect = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom 30px;
`
const SignInText = styled.span`
  color: #13885F
`
const Comment = (props) => {
  const { onSubmit, commentList, userInfo, token } = props
  const commentPreview = pathOr([], ['results'], commentList)
  const [open, setOpen] = useState(false)
  const image = path(['data', 'photo', 'file'], userInfo)
  const isEmptyMessage = path(['results'], commentList)
  const tokenToCheck = path(['data', 'token'], token)
  const hasToken = typeof tokenToCheck === 'undefined'
  return (
    <div>
      {
        open
          ? hasToken
            ? (
              <LoginRedirect>
                Вы не зарегистрырованы:&nbsp;
                <Link to="/sign-in"> <SignInText> Регистрация</SignInText></Link>
              </LoginRedirect>
            )
            : (
              <CommentFormBlock open={open}>
                <Form
                  onSubmit={onSubmit}
                  render={({ handleSubmit }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Row gutter={24}>
                          <Col span={2}>
                            <ProfileImageStyled src={typeof image === 'undefined' ? ProfileImage : image} />
                          </Col>
                          <Col span={22}>
                            <Field
                              name="comment"
                              component={TextArea}
                            />
                          </Col>
                        </Row>
                        <ButtonBlock>
                          <CancelButton onClick={() => setOpen(!open)}>Отмена</CancelButton>
                          <SendButton type="submit">Отправить</SendButton>
                        </ButtonBlock>
                      </form>
                    )
                  }}
                />
              </CommentFormBlock>)
          : (
            <RowUI>
              <Title>Отзывы</Title>
              <CreateComment onClick={() => setOpen(!open)}>Написать отзыв</CreateComment>
            </RowUI>
          )
      }
      {isEmptyMessage.length === 0
        ? (
          <NoImageBlock>
            <NoMessageImage src={NoMessage} alt="no message" />
          </NoImageBlock>
        )
        : (
          <div>
            {commentPreview.map((commentSingle, key) => {
              const createdDate = path(['createdDate'], commentSingle)
              const name = path(['client', 'fullName'], commentSingle)
              const image1 = path(['client', 'photo', 'file'], commentSingle)

              return (
                <div key={key}>
                  <Row>
                    <Col span={2}>
                      <ProfileImageStyled src={typeof image === 'undefined' ? ProfileImage : image1} />
                    </Col>
                    <Col span={22}>
                      <Row>
                        <CommentDate>
                          {dateTimeFormat(createdDate)}
                        </CommentDate>
                      </Row>
                      <Row>
                        <CommentName>
                          {name}
                        </CommentName>
                      </Row>
                      <br />
                      <Row>
                        {commentSingle.comment}
                      </Row>
                    </Col>
                  </Row>
                  <br />
                </div>
              )
            })}
          </div>
        )}
    </div>
  )
}

export default Comment
