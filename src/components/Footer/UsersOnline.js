import { BLACK_COLOR, ZERO } from 'constants/styles'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { getActiveUsersCount } from 'routes/action-common'
import hexToRgb from 'helpers/hexToRgb'

const mapStateToProps = state => ({})

const enhance = compose(
  connect(mapStateToProps, { getActiveUsersCount }),
  injectSheet({
    usersCount: {
      color: hexToRgb(BLACK_COLOR, '0.5'),
      fontSize: '13px',
      position: 'absolute',
      top: '25px',
      right: '0'
    }
  })
)

const UsersOnline = props => {
  const { classes, ...otherProps } = props

  const [activeUsers, setActiveUsers] = useState(ZERO)

  useEffect(() => {
    otherProps.getActiveUsersCount()
      .then(({ value }) => setActiveUsers(value.userCount))
  }, [otherProps])

  return (
    <div className={classes.usersCount}>Пользователей на сайте: {activeUsers}</div>
  )
}

UsersOnline.propTypes = {
  classes: PropTypes.object
}

export default enhance(UsersOnline)
