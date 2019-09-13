import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { CardList, COMPANY } from 'components/Cards'
import { reduxForm } from 'redux-form'
import Paginator from 'components/Pagination'
import {
  BLACK_COLOR,
  FIELD_BORDER_COLOR,
  animationStyle
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import DualField from 'components/FormComponents/DualField'
import Container from 'components/Container'
import T from 'components/T'
import Chat from './Chat'

const enhance = compose(
  reduxForm({
    form: 'VIPForm'
  }),
  injectSheet({
    wrapper: {
      paddingBottom: '20px'
    },
    text: {
      borderBottom: `1px solid ${hexToRgb(FIELD_BORDER_COLOR, '0.3')}`,
      color: hexToRgb(BLACK_COLOR, '0.6'),
      fontWeight: '300',
      fontStyle: 'italic',
      lineHeight: '23px',
      position: 'relative',
      paddingBottom: '30px',
      marginBottom: '20px'
    },
    textChat: {
      marginBottom: '40px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '500',
      fontStyle: 'normal',
      color: '#000'
    }
  })
)

const UserVIP = props => {
  const {
    classes,
    userData,
    app,
    employerList,
    employerFilter,
    chatList,
    onVIPSearch
  } = props

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        {app
          ? <div className={classes.text}>
            <span className={classes.title}><T>menu_vip_room</T> </span> — <T>applicant_vip_room_intro</T>
          </div>
          : <div className={classNames(classes.text, classes.textChat)}>
            <span className={classes.title}><T>menu_vip_room</T> </span> — <T>emp_vip_room_intro</T>
          </div>}
        {app
          ? (
            <React.Fragment>
              <DualField onSubmit={onVIPSearch}/>
              <CardList
                small={true}
                span={12}
                gutter={20}
                data={employerList}
                marginBottom={'24px'}
                type={COMPANY}
              />
              <Paginator filter={employerFilter} smooth={true}/>
            </React.Fragment>
          )
          : <Chat
            chatList={chatList}
            userData={userData}
          />}
      </div>
    </Container>
  )
}

UserVIP.propTypes = {
  classes: PropTypes.object,
  userData: PropTypes.object,
  employerList: PropTypes.object.isRequired,
  onVIPSearch: PropTypes.func,
  employerFilter: PropTypes.object.isRequired,
  chatList: PropTypes.object,
  app: PropTypes.bool
}

export default enhance(UserVIP)
