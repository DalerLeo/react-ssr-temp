import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Content = styled.div`

    line-height: ${({ lineHeight }) => lineHeight};
    ul {
      list-style: none;
      padding: 0;
      padding-left: 18px !important;
      li:before {
        border-radius: 50%;
        content: '\\\\2022';
        font-weight: bold;
        display: inline-block;
        margin-left: -14px;
        padding-right: 7px;
        position: absolute;
      },
      & br: {
        display: none
      }
    },
    & ol {
      padding: 0;
      padding-left: 18px !important;
    },
    & ul, & ol {
      &:last-child { margin: 0 }
    },
    & li {
      font-size: 15px;
      & span {
        font-size: inherit !important;
        font-family: inherit !important
      },
      &:last-child {
        margin-bottom: 0
      }
    },
    & p: {
      margin: 0
    },
    & img: {
      max-width: 100%
    }
  
`

const HtmlContent = ({ children, lineHeight }) => {
  return (
    <Content
      lineHeight={lineHeight}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

HtmlContent.propTypes = {
  lineHeight: PropTypes.any,
  children: PropTypes.any
}

HtmlContent.defaultProps = {
  lineHeight: 22
}

export default HtmlContent
