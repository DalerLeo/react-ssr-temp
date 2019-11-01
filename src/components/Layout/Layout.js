import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import loGet from 'lodash/get'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { compose } from 'recompose'
import { getStaticPagesList } from 'routes/static-page/actions'
import toastifyStyles from 'react-toastify/dist/ReactToastify.css'
import HeaderSimple from 'components/Header/HeaderSimple'
import FooterContainer from 'components/Footer/FooterContainer'
import GlobalLoading from 'components/Utils/GlobalLoading'
import s from './Layout.css'
import DataLayout from './DataLayout'

const enhance = compose(
  DataLayout,
  withStyles(s),
  withStyles(toastifyStyles),
  injectSheet({
    wrapper: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('flexDirection', 'column'),
      ...crossBrowserify('justifyContent', 'space-between'),
      position: 'relative',
      minHeight: '100vh',
      background: '#f9fafb'
    },
    content: {
      ...crossBrowserify('flexGrow', '1')
    },
    simpleWrapper: {
      paddingTop: '68px',
      position: 'relative'
    },

    toastContainer: {},
    toast: {
      fontFamily: 'inherit !important',
      padding: '0 !important'
    }
  })
)

const Layout = props => {
  const {
    classes,
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
    <div className={classNames({
      [classes.wrapper]: !simple,
      [classes.simpleWrapper]: simple
    })}
    >

      <GlobalLoading />

      <ToastContainer
        autoClose={5000}
        className={classes.toastContainer}
        closeButton={false}
        hideProgressBar={true}
        pauseOnHover={false}
        position="top-left"
        toastClassName={classes.toast}
      />

      {simple
        ? <HeaderSimple
          query={query}
        />
        : <div />}
      <div className={classes.content}>
        {React.cloneElement(children, {
          pathname,
          query,
          userData,
          isEmployer,
          isApplicant,
          isAuth,
          actionSuccess
        })}
      </div>
      <FooterContainer
        isAuth={isAuth}
        isEmployer={isEmployer}
        isApplicant={isApplicant}
      />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
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
