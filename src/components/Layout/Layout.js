import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/withStyles'
import toastifyStyles from 'react-toastify/dist/ReactToastify.css'
import slickCss from 'slick-carousel/slick/slick.css'
import slickTheme from 'slick-carousel/slick/slick-theme.css'
import FooterContainer from 'components/Footer/FooterContainer'
import GlobalLoading from 'components/Utils/GlobalLoading'
import styled from 'styled-components'
import Header from 'components/UI/Header'
import { pipe } from 'ramda'
//import dropdownCss from 'react-dropdown/style.css'
import GlobalStyles from '../GlobalStyles'
import s from './Layout.css'

import DataLayout from './DataLayout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-height: 100vh;
  background: #f9fafb;
  padding-top: 158px;
`

const Content = styled.div`
  flex-grow: 1;
`
const enhance = pipe(
//  DataLayout,
  withStyles(s),
//  withStyles(dropdownCss),
  withStyles(toastifyStyles),
  withStyles(slickCss),
  withStyles(slickTheme)
)

const Layout = props => {
  const {
    children,
    pathname,
    query,
    simple,
    userData,
    isEmployer,
    isApplicant,
    isAuth,
    actionSuccess,
    ...otherProps
  } = props

  if (otherProps.isServer) {
    //    OtherProps.store.dispatch(getStaticPagesList())
  }

  return (
    <Wrapper>
      <GlobalStyles />
      <GlobalLoading />
      <ToastContainer
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        pauseOnHover={false}
        position="top-left"
      />

      <Header isAuth={isAuth} />
      <Content>
        {React.cloneElement(children, {
          pathname,
          query,
          userData,
          isAuth,
          actionSuccess
        })}
      </Content>
      <FooterContainer
        isAuth={isAuth}
      />
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.bool,
  home: PropTypes.bool,
  simple: PropTypes.bool,
  store: PropTypes.object,
  actionSuccess: PropTypes.func,
  pathname: PropTypes.node.isRequired,
  query: PropTypes.object.isRequired,
  lang: PropTypes.string,
  userData: PropTypes.object,
  isEmployer: PropTypes.bool,
  isApplicant: PropTypes.bool,
  isAuth: PropTypes.bool,
  showCart: PropTypes.bool
}

Layout.defaultProps = {
  showCart: true
}

export default enhance(Layout)
