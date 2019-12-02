import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import { Page } from './Pagination'

const Pages = props => {
  const {
    currPage,
    lastPage,
    goTo
  } = props

  const lastThree = lastPage - 2

  const iniPages = currPage > 1 ? currPage === 2 ? [] : [1] : [1, 2, 3]
  const lastPg = range(lastThree, lastPage + 1)

  const lastDiff = lastPage - currPage
  const lastPages = lastDiff > 2
    ? lastDiff === 3 ? range(lastThree + 1, lastPage + 1) : lastPg
    : range(lastThree - 1, lastPage + 1)

  const followPages = lastDiff === 0 ? [] : range(currPage - 1, currPage + 2)

  return (
    <>
      {iniPages.map(pg => (
        <Page
          key={pg}
          children={pg}
          isActive={currPage === pg}
          onClick={() => goTo(pg)}
        />
      ))}
      {currPage > 3 && <Page>...</Page>}
      {currPage >= 2 && lastDiff > 2 && followPages.map(pg => {
        return (
          <Page
            key={pg}
            children={pg}
            isActive={currPage === pg}
            onClick={() => goTo(pg)}
          />
        )
      })}
      {lastDiff > 4 && <Page>...</Page>}
      {lastPages.map(pg => (
        <Page
          key={pg}
          children={pg}
          isActive={currPage === pg}
          onClick={() => goTo(pg)}
        />
      ))}
    </>
  )
}
Pages.propTypes = {
  currPage: PropTypes.number,
  lastPage: PropTypes.number,
  goTo: PropTypes.func
}
export default Pages
