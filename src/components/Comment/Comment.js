import React, { useState } from 'react'
import styled from 'styled-components'
import { Field, Form } from 'react-final-form'
import TextArea from 'components/UI/FormField/TextArea'
import ProfileImage from 'images/Profile.png'
import person1 from 'images/person-1.png'
import { Row, Col } from 'components/Grid'
import { pathOr, path } from 'ramda'

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
const Comment = (props) => {
  const { onSubmit, commentList, userInfo } = props
  const commentPreview = pathOr([], ['results'], commentList)
  const [open, setOpen] = useState(false)
  const data = path(['data'], userInfo)
  const name = path(['fullName'], data)
  const image = path(['photo', 'file'], data)
  console.warn(userInfo)
  return (
    <div>
      {
        open
          ? (
            <CommentFormBlock open={open}>
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Row gutter={24}>
                        <Col span={2}>
                          <ProfileImageStyled src={image} />
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
            </CommentFormBlock>
          ) : (
            <RowUI>
              <Title>Отзывы</Title>
              <CreateComment onClick={() => setOpen(!open)}>Написать отзыв</CreateComment>
            </RowUI>
          )
      }
      {commentPreview.map((commentSingle, key) => {
        return (
          <div key={key}>
            <Row>
              <Col span={2}>
                <ProfileImageStyled src={image} />
              </Col>
              <Col span={22}>
                <Row>
                  <CommentDate>
                    24 May 2018
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
  )
}

export default Comment
