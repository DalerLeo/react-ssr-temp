import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import classNames from 'classnames'
import fp from 'lodash/fp'
import Favorite from 'icons/Favorite'
import headerWrapper from './headerWrapper'
import Container from 'components/Container'
import RenderOrNull from 'components/Utils/RenderOrNull'
import Navigation from 'components/Navigation'
import TW from 'components/TW'
import DropdownList from './DropdownList'
import BigSearch from 'components/BigSearch'
import LoginDialog from 'components/HomePage/Dialogs/LoginDialog'
import RegisterDialog from 'components/HomePage/Dialogs/RegisterDialog/RegisterDialog'
import RegisterSuccessDialog from 'components/HomePage/Dialogs/RegisterSuccessDialog'
import LogoTitle from 'components/Title/LogoTitle'

const headRef = React.createRef()

const enhance = compose(
  headerWrapper(headRef)
)

const languages = [
  { key: 'ru', name: 'Рус' },
  { key: 'uz', name: 'O\'zb' },
  { key: 'en', name: 'Eng' }
]

const Header = props => {
  const {
    history,
    classes,
    isAuth,
    search,
    home,
    loginOpen,
    onLogin,
    authLoading,
    onLoginOpen,
    onLoginClose,
    regOpen,
    setRegOpen,
    onRegister,
    setSuccessOpen,
    successOpen,
    pathname,
    userData,
    onReset,
    onSearch,
    ...otherProps
  } = props
  // Const query = paramsToQuery(_.get(hashHistory, ['location', 'search']))
  // Const openLoginDialog = toBoolean(_.get(query, 'loginDialog'))
  // Const openCartDialog = toBoolean(_.get(query, 'cartDialog'))
  const iconStyle = {
    color: '#cbd0d8',
    style: { width: 20, height: 20, marginRight: '5px' }
  }
  const showSearch = search || !home

  const openLoginDialog = fp.get(['location', 'state', 'openLoginDialog'], history) || loginOpen

  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <div className={classes.searchWrapper}>
          <LogoTitle/>
          <div
            ref={headRef}
            className={classNames({
              [classes.search]: true,
              [classes.showSearch]: showSearch
            })}>
            <BigSearch
              type={'small'}
              onSearch={onSearch}
              header={true}
              initialValues={{
                type: 'vacancy'
              }}
            />
          </div>
        </div>
        <div className={classes.rightSide}>
          {false && (
            <div className={classNames(classes.item, classes.icons)}>
              <div className={classes.favorite}>
                <Favorite {...iconStyle} /> Избранное
              </div>
            </div>
          )}
          <div className={classNames(classes.item, classes.languages)}>
            <TW>
              {(lang) => fp.map(item => {
                const key = fp.get('key', item)
                return (
                  <a
                    key={key}
                    className={classNames(classes.lang, {
                      [classes.activeLang]: key === lang
                    })}
                    onClick={() => otherProps.setAppLanguageAction(key)}>{item.name}</a>
                )
              }, languages)}
            </TW>
          </div>
          <div className={classNames(classes.item, classes.auth)}>
            {isAuth &&
            <DropdownList
              user={userData}
              setChatDialog={otherProps.setChatDialog}
              logout={props.logoutAction}
            />}
            {!isAuth && <a onClick={onLoginOpen}>Войти</a>}
            {!isAuth && <a onClick={() => setRegOpen(true)}>Регистрация</a>}
          </div>
        </div>
      </div>
      <Navigation
        history={history}
        setRegOpen={setRegOpen}
        userData={userData}
        pathname={pathname}
      />
      <RenderOrNull value={openLoginDialog}>
        <LoginDialog
          open={openLoginDialog}
          onReset={onReset}
          onLogin={onLogin}
          onRegisterOpen={() => {
            setRegOpen(true)
            onLoginClose()
          }}
          loading={authLoading}
          handleClose={onLoginClose}
        />
      </RenderOrNull>
      <RenderOrNull value={regOpen}>
        <RegisterDialog
          initialValues={{ phone: '+' }}
          open={regOpen}
          onLoginOpen={onLoginOpen}
          loading={authLoading}
          onSubmit={onRegister}
          handleClose={() => setRegOpen(false)}
        />
      </RenderOrNull>
      <RegisterSuccessDialog
        open={successOpen}
        handleClose={() => setSuccessOpen(false)}
      />
    </Container>
  )
}

Header.propTypes = {
  userData: PropTypes.object,
  history: PropTypes.object,
  classes: PropTypes.object,
  isAuth: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
  search: PropTypes.any,
  home: PropTypes.any,
  loginOpen: PropTypes.any,
  onLogin: PropTypes.any,
  authLoading: PropTypes.any,
  onLoginOpen: PropTypes.any,
  onLoginClose: PropTypes.any,
  regOpen: PropTypes.any,
  setRegOpen: PropTypes.any,
  onRegister: PropTypes.any,
  setSuccessOpen: PropTypes.any,
  successOpen: PropTypes.any,
  onReset: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  pathname: PropTypes.any
}
export default enhance(Header)
