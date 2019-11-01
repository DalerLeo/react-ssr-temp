import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { compose } from 'recompose'
import toastifyStyles from 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import FooterContainer from '../../components/Footer/FooterContainer'
import GlobalLoading from '../../components/Utils/GlobalLoading'
import s from './Layout.css'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position:relative;
  min-height: 100vh;
  background-color: #f9fafb;
`
const Content = styled.div`
   flex-grow: 1
`
const enhance = compose(
  withStyles(s),
  withStyles(toastifyStyles)
)

const Layout = props => {
  const {
    classes,
    children,
    ...otherProps
  } = props

  if (otherProps.isServer) {
    //    OtherProps.store.dispatch(getStaticPagesList())
  }

  return (
    <Wrap>
      <GlobalLoading />

      <ToastContainer
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        pauseOnHover={false}
        position="top-left"
      />

      <Content>
        {children}
      </Content>
      <FooterContainer />
    </Wrap>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  store: PropTypes.object
}

Layout.defaultProps = {
  showCart: true
}

export default enhance(Layout)
