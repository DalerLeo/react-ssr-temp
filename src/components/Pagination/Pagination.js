import React from 'react'
import styled, { css } from 'styled-components'
import useHistory from 'hooks/useHistory'
import { addParamsRoute } from 'utils/route'
import { last } from 'ramda'
import PropTypes from 'prop-types'
import { getPageList, getCurrentPage } from './utils'
import Pages from './Pages'

const Wrap = styled.div`
  display: inline-block;
  padding: 4px;
  background: #fff;
  border-radius: 10px;
`

export const Page = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid;
  border-color: ${props => props.theme.colors.secondary.default};
  background-color: transparent;
  cursor: pointer;
  color: ${props => props.theme.colors.secondary.default};
  position: relative;
  margin-right: 8px;

  ${props => props.isActive && css`
    background-color: ${() => props.theme.colors.primary.default};
//    border-color: ${() => props.theme.colors.primary.default};

    font-weight: 600;
  `}
  :last-child {
    margin-right: 0;
    :after {
    display: none;
    }
  }
  :after {
//    content: ' ';
    position: absolute;
    top: 50%;
    right: -1px;
    height: 24px;
    width: 1px;
    background-color: ${props => props.isActive ? 'transparent' : props.theme.colors.secondary.default};
    transform: translateY(-50%);
  }

`

const Container = styled.div`
  margin-top: 30px;
  text-align: center;
`

const Pagination = props => {
  const { count, pageSize } = props

  const history = useHistory()
  const pageList = getPageList(count, pageSize)
  const pageCount = pageList.length
  const lastPage = last(pageList)
  const currPage = getCurrentPage('page', history)
  const goTo = to => addParamsRoute({ page: to }, history)
  const pager = pageCount > 15
    ? (
      <Pages
        currPage={currPage}
        goTo={goTo}
        lastPage={lastPage}
      />
    )
    : pageList.map(page => (
      <Page
        key={page}
        isActive={page === currPage}
        onClick={() => goTo(page)}
      >
        {page}
      </Page>
    ))
  return (
    <Container>
      <Wrap>
        {pager}
      </Wrap>
    </Container>
  )
}

Pagination.propTypes = {
  count: PropTypes.number
}
export default Pagination
