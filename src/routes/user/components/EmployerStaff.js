import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  animationStyle,
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import { USER_STAFF_CREATE_URL } from 'constants/routes'
import DeleteIcon from 'icons/Delete'
import EditIcon from 'icons/Edit'
import T from 'components/T'
import Container from 'components/Container'
import Title from 'components/Title'
import Dropdown from 'components/Dropdown'

const withStyles = injectSheet({
  staffContainer: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('flexWrap', 'wrap')
  },
  staff: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('borderRadius', '4px'),
    ...crossBrowserify('transition', 'all 300ms'),
    background: '#fbfbfd',
    border: '1px solid #dfe1e7',
    padding: '15px 20px',
    position: 'relative',
    marginRight: '20px',
    minHeight: '74px',
    width: 'calc((100% / 3) - 15px)',
    '&:hover': {
      borderColor: '#7848B7'
    },
    '&:nth-child(n + 4)': {
      marginTop: '20px'
    },
    '&:nth-child(3n + 3)': {
      marginRight: '0'
    }
  },
  createStaff: {
    ...crossBrowserify('justifyContent', 'center'),
    borderStyle: 'dashed',
    cursor: 'pointer',
    color: '#8798AD'
  },
  avatar: {
    ...crossBrowserify('borderRadius', '50%'),
    backgroundColor: '#dfe1e7',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginRight: '10px',
    height: '42px',
    width: '42px'
  },
  fullName: {
    fontWeight: '500',
    lineHeight: '22px',
    marginBottom: '3px'
  },
  position: {
    color: '#9197A4',
    lineHeight: '22px'
  },
  dropdown: {
    right: '5px'
  },
  adminBadge: {
    position: 'absolute',
    top: '7px',
    left: '7px',
    zIndex: '2',
    '&:hover $adminBadgeContent': {
      opacity: '1',
      visibility: 'visible'
    }
  },
  adminBadgeIcon: {
    ...crossBrowserify('borderRadius', '50%'),
    background: '#fff',
    border: '3px solid #ffb701',
    position: 'absolute',
    height: '14px',
    width: '14px',
    zIndex: '1'
  },
  adminBadgeContent: {
    ...crossBrowserify('borderRadius', '50px'),
    ...crossBrowserify('transition', 'all 200ms'),
    ...crossBrowserify('boxShadow', '0px 14px 30px rgba(0, 0, 0, 0.14)'),
    background: '#fff',
    fontSize: '13px',
    lineHeight: '18px',
    padding: '2px 10px 2px 24px',
    position: 'absolute',
    left: '-5px',
    top: '-4px',
    opacity: '0',
    visibility: 'hidden',
    whiteSpace: 'nowrap'
  }
})

const CREATE_LIMIT = 4

const EmployerStaff = props => {
  const {
    classes,
    history,
    data,
    userData,
    onDeleteStaff
  } = props

  const list = fp.get('data', data)
  const employerAdmin = fp.get('employerAdmin', data)
  const loading = fp.get('loading', data)

  const actions = (id) => [
    { icon: <EditIcon/>, text: 'main_global_edit', action: () => history.push(USER_STAFF_CREATE_URL, { id }) },
    { icon: <DeleteIcon/>, text: 'button_simple_del', action: () => onDeleteStaff(id) }
  ]

  const photo = fp.get('logo.file', userData)
  const backgroundImage = photo ? `url(${photo})` : 'unset'

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <Title isStatic={true} isProfile={true} text={'menu_emp_staff'}/>
        <div className={classes.staffContainer}>
          <div className={classes.staff}>
            <div className={classes.avatar} style={{ backgroundImage }}/>
            <div>
              <div className={classes.fullName}>{fp.get('contactPerson', employerAdmin)}</div>
              <div className={classes.position}/>
            </div>

            <div className={classes.adminBadge}>
              <div className={classes.adminBadgeIcon}/>
              <div className={classes.adminBadgeContent}><T>emp_staff_is_admin</T></div>
            </div>
          </div>
          {fp.map(item => {
            const id = fp.get('id', item)
            const fullName = fp.get('fullName', item)
            const position = fp.get('position', item)
            return (
              <div key={id} className={classes.staff}>
                <div className={classes.avatar} style={{ backgroundImage }}/>
                <div>
                  <div className={classes.fullName}>{fullName}</div>
                  <div className={classes.position}>{position}</div>
                </div>
                <Dropdown className={classes.dropdown} actions={actions(id)}/>
              </div>
            )
          }, list)}
          {list.length < CREATE_LIMIT &&
          <div
            className={classNames(classes.staff, classes.createStaff)}
            onClick={() => history.push(USER_STAFF_CREATE_URL)}>
            <span><T>emp_add_staff</T> +</span>
          </div>}
        </div>
      </div>
    </Container>
  )
}

EmployerStaff.propTypes = {
  history: PropTypes.object,
  userData: PropTypes.object,
  classes: PropTypes.object,
  filter: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onDeleteStaff: PropTypes.func.isRequired
}

export default withStyles(EmployerStaff)
