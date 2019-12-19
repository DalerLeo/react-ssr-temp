import React, { useState } from 'react'
import styled from 'styled-components'
import { Field, Form } from 'react-final-form'
import TextArea from 'components/UI/FormField/TextArea'
import ProfileImage from 'images/Profile.png'
import { Row, Col } from 'components/Grid'
import { pathOr } from 'ramda'

const ButtonBlock = styled.div`
    float: right;
    margin-top: 20px;
`
const ProfileImageStyled = styled.img`
  max-width: 64px;
  max-height: 64px;
  margin: 10px 10px;
`
const CommentFormBlock = styled.div`
  display: ${props => props.open ? 'block' : 'none'}
`
const Comment = (props) => {
  const { onSubmit, commentList } = props
  const commentPreview = pathOr([], ['results'], commentList)
  const [open, setOpen] = useState(false)
  return (
    <div>
      {
        open ? <CommentFormBlock open={open}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Row gutter={24}>
                  <Col span={2}>
                    <ProfileImageStyled src={ProfileImage} />
                  </Col>
                  <Col span={22}>
                    <Field
                      name="comment"
                      component={TextArea}
                    />
                  </Col>
                </Row>
                <ButtonBlock>
                  <button onClick={() => setOpen(!open)}>Отмена</button>
                  <button type="submit">Добавить</button>
                </ButtonBlock>
              </form>
            )}
          />
        </CommentFormBlock> : <button onClick={() => setOpen(!open)}>Добавить коммент</button>
      }
      {commentPreview.map((commentSingle, key) => {
        return (
          <Row key={key}>
            <Col span={2}>
              <ProfileImageStyled src={ProfileImage} />
            </Col>
            <Col span={22}>
              {commentSingle.comment}
            </Col>
          </Row>
        )
      })}

    </div>
  )
}

export default Comment
