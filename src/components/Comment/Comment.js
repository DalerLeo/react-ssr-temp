import React from 'react'
import styled from 'styled-components'
import { Field, Form } from 'react-final-form'
import { TextArea } from 'components/UI/FormField'

const Button = styled.button`
    float: right;
    margin: 10px 100px;
`
const Comment = (props) => {
  return (
    <div>
      <Form
        onSubmit={() => ''}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="comment"
              component={TextArea}
              cols={170}
            />
            <Field
              name="comment"
              component={TextArea}
              cols={150}
            />
            <Field
              name="comment"
              component={TextArea}
              cols={130}
            />
            <Button type="submit">Добавить</Button>
          </form>
        )}
      />

    </div>
  )
}

export default Comment
