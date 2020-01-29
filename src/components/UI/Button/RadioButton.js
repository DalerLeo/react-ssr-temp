import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Ul = styled.ul`
    list-style: none;
    background: #FDFDFD;
    border: 1px solid #EAEAEC;
    border-radius: 5px;
    padding: 5px 5px 5px 0;
    margin-top: -10px;
`
const Li = styled.li`
    display: inline-block;
`
const Lbb = styled.label`
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 164.57%;
    color: #818591;
    margin-left: -6px;
`
const Inn = styled.input`
    visibility:hidden;
    transition: 2s;
    :checked + ${Lbb}{
        background: #2EBB8A;
        border-radius: 5px;
        padding: 4px 11px;
        color: #FFFFFF;
    }
`
const RadioButtonStyled = (props) => {
  const { newsLang, list } = props

  return (
    <Ul>
      {list.map(lang => (
        <Li key={lang}>
          <Inn type="radio" value="lang" name="radio" id="radio1" {...props} checked={newsLang === lang} />
          <Lbb for="radio1">{lang}</Lbb>
        </Li>
      ))}

    </Ul>
  )
}

RadioButtonStyled.propTypes = {
  newsLang: PropTypes.string,
  list: PropTypes.array
}
export default RadioButtonStyled
