import React from 'react'
import map from 'lodash/map'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import Resume from 'components/Cards/Resume'
import { CardLoadingList, VACANCY_BIG } from 'components/Cards'
import Container from 'components/Container'
import EmptyState from 'components/EmptyState'
import { animationStyle } from 'constants/styles'
import FilterSwitcher from '../FilterSwitcher'
import PromoteDialog from './PromoteDialog'

const UserResumes = props => {
  const {
    app,
    data,
    filter,
    resumeData,
    promoteData,
    ...defaultProps
  } = props

  const loading = fp.get('loading', data)

  const switchList = [
    { isStatic: true, value: 'active', label: 'applicant_public' },
    { isStatic: true, value: 'archive', label: 'applicant_archive' },
    { isStatic: true, value: 'temp', label: 'applicant_drafts' }
  ]
  return (
    <Container>
      <div style={animationStyle}>
        <div style={{ marginBottom: '25px' }}>
          <FilterSwitcher filter={filter} list={switchList} label={'main_resume'}/>
        </div>
        <CardLoadingList type={VACANCY_BIG} items={5} loading={loading} />
        <div>
          {map(resumeData, item => (
            <Resume
              editView={true}
              key={fp.get('id', item)}
              data={item}
              bottomBtn={app}
              deleteBtn={!app}
              promoteData={promoteData}
              {...defaultProps}
            />
          ))}
        </div>
        <EmptyState
          data={resumeData}
          loading={loading}
        />
      </div>

      <PromoteDialog
        open={promoteData.open}
        handleClose={promoteData.onClosePromote}
        handleSubmit={promoteData.onPromoteResume}
      />
    </Container>
  )
}
UserResumes.propTypes = {
  app: PropTypes.bool,
  data: PropTypes.object.isRequired,
  resumeData: PropTypes.array.isRequired,
  promoteData: PropTypes.object.isRequired,
  filter: PropTypes.object,
  activateLoading: PropTypes.bool,
  deactivateLoading: PropTypes.bool,
  onResumeDeactivate: PropTypes.func,
  onResumeActivate: PropTypes.func
}
export default UserResumes
