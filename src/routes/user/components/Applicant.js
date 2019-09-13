import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import Container from 'components/Container'
import TitleTab from 'components/Title/TitleTab'
import loGet from 'lodash/get'
import PropTypes from 'prop-types'
import UserFavorites from './UserFavorites'
import UserResumes from './Resume'
import UserSearchHistory from './UserSearchHistory'
import Title from 'components/Title/Title'
import styles from './styles'
import UserInfoCard from './UserInfoCard'
import Feedback from 'routes/my-office/applicant/feedback'
import FeedbackWork from 'routes/my-office/applicant/feedback-work'
import UserVIP from 'routes/my-office/common/vip'
import UserGuests from 'routes/my-office/common/guests'

const enhance = compose(
  injectSheet(styles),
)

const tabs = [
  {
    value: 'resume',
    label: 'menu_my_resume'
  },
  {
    value: 'guest',
    label: 'menu_views'
  },
  {
    value: 'feedback',
    label: 'menu_feedback'
  },
  {
    value: 'feedbackWork',
    label: 'button_work_here'
  },
  {
    value: 'vip',
    label: 'menu_vip_room'
  },
  {
    value: 'fav',
    label: 'menu_my_favorites'
  },
  {
    value: 'history',
    label: 'menu_my_search'
  }
]

const Applicant = props => {
  const {
    onTabChange,
    classes,
    history,
    params,
    userData,
    favVacancyList,
    favEmployerList,
    searchList,
    resumeList,
    resumeData,
    promoteData,
    onResumeActivate,
    onResumeDeactivate,
    onResumeEdit,
    activateLoading,
    deactivateLoading,
    onResumeUpdate,
    updateDateLoading,
    resumeFilter
  } = props

  const parent = loGet(params, 'child')
  const component = {
    resume: (
      <UserResumes
        resumeData={resumeData}
        promoteData={promoteData}
        updateDateLoading={updateDateLoading}
        onResumeUpdate={onResumeUpdate}
        onResumeEdit={onResumeEdit}
        data={resumeList}
        filter={resumeFilter}
        onResumeActivate={onResumeActivate}
        onResumeDeactivate={onResumeDeactivate}
        activateLoading={activateLoading}
        deactivateLoading={deactivateLoading}
        app={true}
      />
    ),
    guest: (
      <UserGuests userData={userData} resumeData={resumeData}/>
    ),
    feedback: (
      <Feedback />
    ),
    feedbackWork: (
      <FeedbackWork/>
    ),
    vip: <UserVIP app={true} userData={userData}/>,
    fav: (
      <UserFavorites
        vacancyData={favVacancyList}
        employerData={favEmployerList}
        app={true}
      />
    ),
    history: (
      <UserSearchHistory
        data={searchList}
      />
    )
  }
  return (
    <div className={classes.proWrapper}>
      <Container>
        <div className={classes.divider}>
          <Title isStatic={true} text={'menu_my_office'} margin={'0 0 20px 0'}/>
          <TitleTab type={'small'} onChange={onTabChange} tabs={tabs} value={parent}/>
        </div>
      </Container>
      <Container className={classes.contentWrapper}>
        <div className={classes.content}>
          {component[parent] || <div>Error</div>}
        </div>
        <UserInfoCard
          data={userData}
          history={history}
        />
      </Container>
    </div>
  )
}

Applicant.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
  history: PropTypes.object,
  params: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  onResumeDeactivate: PropTypes.func.isRequired,
  onResumeActivate: PropTypes.func.isRequired,
  onVIPSearch: PropTypes.func.isRequired,
  employerFilter: PropTypes.object.isRequired,
  employerList: PropTypes.object.isRequired,
  favVacancyList: PropTypes.object.isRequired,
  favEmployerList: PropTypes.object.isRequired,
  resumeList: PropTypes.object.isRequired,
  resumeFilter: PropTypes.object.isRequired,
  searchList: PropTypes.object.isRequired,
  activateLoading: PropTypes.bool.isRequired,
  deactivateLoading: PropTypes.bool.isRequired,
  updateDateLoading: PropTypes.bool.isRequired,
  resumeData: PropTypes.array.isRequired,
  promoteData: PropTypes.object.isRequired,
  onResumeEdit: PropTypes.func.isRequired,
  onResumeUpdate: PropTypes.func.isRequired
}
export default enhance(Applicant)
