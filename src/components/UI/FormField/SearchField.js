import * as API from 'constants/api'
import * as ROUTES from 'constants/routes'
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Container from 'components/Container'
import fetch from 'node-fetch'
import { pipe, prop } from 'ramda'
import Link from 'components/Link'
import { sprintf } from 'sprintf-js'
import AbortController from 'abort-controller'

const SearchBlock = styled.div`
  position: relative;
  width: calc(100% - 685px);
  padding-left: 30px;
  display: flex;
  transition: width 200ms, margin-left 200ms;

  ${props => props.onSearch && css`
    width: calc(100% - 685px + 200px);
    margin-left: -200px;
`}
`

const SearchFieldInput = styled.input`
  height: 50px;
  width: 100%;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: 0;
  padding-left: 20px;
`
const SearchButton = styled.button`
  border: none;
  height: 50px;
  width: 80px;
  background-color: #29D398;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: 0;
  cursor: pointer;
`

const SearchResults = styled.div`
  position: fixed;
  top: 102px;
  background: #FAFAFA;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
  width: 100%;
  left: 0;
  right: 0;

`

const ResultContainer = styled(Container)`
  padding: 15px 0;
  padding-left: 214px;

`

const Product = styled(Link)`
  display: block;
  padding: 5px 17px;
  font-size: 16px;
  line-height: 164.57%;
/* or 26px */
  color: #818591;
  border-radius: 2px;
  margin-left: -17px;
  max-width: calc(100% - 685px + 400px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  :hover {
    background: #EFEFF0;
  }
`
const SearchField = (props) => {
  const [onSearch, setOnSearch] = useState(false)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [prevController, setAbort] = useState(null)
  useEffect(() => {
    if (onSearch) {
      const controller = new AbortController()

      if (!prevController) {
        setAbort(controller)
      } else {
        prevController.abort()
        setAbort(controller)
      }

      fetch(API.API_URL + API.PRODUCT_LIST + '?search=' + search, { signal: controller.signal })
        .then(response => response.json())
        .then(
          pipe(prop('results'), setProducts),
          errr => {
            if (errr.name === 'AbortError') {
            }
          },
        )
    }
  }, [onSearch, search])

  const onBlur = () => setTimeout(() => setOnSearch(false), 200)
  const onFocus = () => setOnSearch(true)
  return (
    <SearchBlock onSearch={onSearch}>
      <SearchFieldInput
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={ev => setSearch(ev.target.value)}
        placeholder="Я хочу найти..."
      />
      <SearchButton>
            Найти
      </SearchButton>
      {onSearch && (
        <SearchResults>
          <ResultContainer>
            {products.map(product => (
              <Product to={sprintf(ROUTES.PRODUCT_ITEM_URL, product.id)} key={product.id}>{product.name}</Product>
            ))}
          </ResultContainer>
        </SearchResults>
      )}
    </SearchBlock>
  )
}

export default SearchField
