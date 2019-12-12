import React from 'react'
import styled from 'styled-components'
import { Field, Form } from 'react-final-form'
import { TextArea } from 'components/UI/FormField'
import ProfileImage from 'images/Profile.png'
import { Row, Col } from 'components/Grid'

const Button = styled.button`
    float: right;
    margin-top: 20px;
`
const ProfileImageStyled = styled.img`
  max-width: 64px;
  max-height: 64px;
  margin: 10px 10px;
`
const Comment = (props) => {
  return (
    <div>
      <Form
        onSubmit={() => ''}
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
            <Button type="submit">Добавить</Button>
          </form>
        )}
      />

    </div>
  )
}

export default Comment
