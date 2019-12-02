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
  background: #F3F3F3;
  border-radius: 10px;
`

export const Page = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  ${props => props.isActive && css`
    background-color: #C8916D;
    color: #fff;
    font-weight: 600;
  `}
  :last-child {
    :after {
    display: none;
    }
  }
  :after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 0;
    height: 24px;
    width: 1px;
    background-color: ${props => props.isActive ? '#C8916D' : '#D8D8D8'};
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
