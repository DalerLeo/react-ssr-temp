import fp from 'lodash/fp'
import React from 'react'
import injectSheet from 'react-jss'
import Container from 'components/Container'
import classNames from 'classnames'
import loGet from 'lodash/get'
import loIncludes from 'lodash/includes'
import styles from './styles'
import PropTypes from 'prop-types'
import { ZERO } from 'constants/styles'
import { VACANCY_CREATE_URL } from 'constants/routes'
import TitleTab from 'components/Title/TitleTab'
import Title from 'components/Title'
import { Button } from 'components/Button'
import UserSearchHistory from './UserSearchHistory'
import EmployerInfoCard from './EmployerInfoCard'
import EmployerStaff from './EmployerStaff'
import UserStats from 'routes/my-office/employer/stats'
import EmployerVacancy from 'routes/my-office/employer/vacancies'
import UserVIP from 'routes/my-office/common/vip'
import FavoriteResumes from 'routes/my-office/employer/fav-resumes'
import UserGuests from 'routes/my-office/common/guests'
import Orders from 'routes/my-office/employer/orders'
import EmployerServices from 'routes/my-office/employer/services'

const enhance = injectSheet(styles)

const getTabs = notifications => {
  const appealCount = fp.get('appealCount', notifications)
  const approvedCount = fp.get('approvedCount', notifications)
  const elapsedCount = fp.get('elapsedCount', notifications)
  const orderStatusChangeCount = fp.get('orderStatusChangeCount', notifications)
  return [
    {
      value: 'stats',
      label: 'menu_emp_stat'
    },
    {
      value: 'vacancy',
      label: 'menu_my_vacancy',
      badge: appealCount + approvedCount
    },
    {
      value: 'vip',
      label: 'menu_vip_room',
      badge: appealCount
    },
    {
      value: 'fav',
      label: 'menu_favorites_resume'
    },
    {
      value: 'guest',
      label: 'menu_guests'
    },
    {
      value: 'history',
      label: 'menu_my_search'
    },
    {
      value: 'orders',
      label: 'menu_emp_orders',
      badge: orderStatusChangeCount
    },
    {
      value: 'service',
      label: 'menu_emp_active_services',
      badge: elapsedCount
    },
    {
      value: 'employer-staff',
      label: 'menu_emp_staff'
    }
  ]
}

const Employer = props => {
  const {
    classes,
    params,
    history,
    onTabChange,
    userData,
    notifications,
    onDeleteStaff,
    searchList,
    generalStatsDetail,
    viewsStatsDetail,
    employerStaffFilter,
    employerStaffList
  } = props

  const viewCount = loGet(viewsStatsDetail, 'data.totalCount') || ZERO
  const parent = loGet(params, 'child')
  const hideLeftSide = loIncludes(['stats', 'orders'], parent)

  const employerInfoCard = (
    <EmployerInfoCard
      viewCount={viewCount}
      data={userData}
      history={history}
      stats={generalStatsDetail.data}
    />
  )

  const component = {
    'stats': (
      <UserStats
        generalStatsDetail={generalStatsDetail.data}
        card={employerInfoCard}
        userData={userData}
      />
    ),
    'vacancy': <EmployerVacancy userData={userData}/>,
    'vip': <UserVIP userData={userData}/>,
    'fav': <FavoriteResumes/>,
    'guest': <UserGuests isEmployer={true} userData={userData}/>,
    'history': <UserSearchHistory data={searchList}/>,
    'orders': <Orders/>,
    'service': <EmployerServices/>,
    'employer-staff': (
      <EmployerStaff
        userData={userData}
        history={history}
        filter={employerStaffFilter}
        data={employerStaffList}
        onDeleteStaff={onDeleteStaff}
      />
    )
  }
  return (
    <div className={classes.wrapper}>
      <Container>
        <Title text={'menu_my_office'} isStatic={true} margin={'0 0 20px 0'}/>
        <TitleTab type={'small'} onChange={onTabChange} tabs={getTabs(notifications)} value={parent}/>
      </Container>
      <div className={classNames({
        [classes.contentEmp]: !hideLeftSide,
        [classes.contentStat]: hideLeftSide
      }) }>
        <div style={{ padding: '0 25px 0 30px' }}>
          {parent === 'vacancy' &&
          <Button
            onClick={() => history.push(VACANCY_CREATE_URL)}
            style={{ marginBottom: '20px', height: '36px' }}
            fullWidth={true}
            text={'menu_create_vacancy'}
          />}
          {!hideLeftSide && employerInfoCard}
        </div>
        {component[parent] || <div>Not found</div>}
      </div>
    </div>
  )
}

Employer.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  params: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  notifications: PropTypes.object,
  onTabChange: PropTypes.func.isRequired,
  onDeleteStaff: PropTypes.func.isRequired,
  generalStatsDetail: PropTypes.object.isRequired,
  viewsStatsDetail: PropTypes.object.isRequired,
  searchList: PropTypes.object.isRequired,
  employerStaffList: PropTypes.object.isRequired,
  employerStaffFilter: PropTypes.object.isRequired
}
export default enhance(Employer)
