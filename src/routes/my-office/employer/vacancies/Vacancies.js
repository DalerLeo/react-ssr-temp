import fp from 'lodash/fp'
import curry from 'lodash/curryRight'
import React, { useState } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { CardList, VACANCY_CUSTOM } from 'components/Cards'
import { animationStyle, crossBrowserify, fallbacksStyle } from 'constants/styles'
import { VACANCY_CREATE_URL } from 'constants/routes'
import Pagination from 'components/Pagination'
import withHistory from 'helpers/withHistory'
import t from 'helpers/translate'
import Container from 'components/Container'
import Dialog from 'components/Dialog'
import TW from 'components/TW'
import Link from 'components/Link'
import EmptyState from 'components/EmptyState'
import RenderOrNull from 'components/Utils/RenderOrNull'
import FilterSwitcher from 'routes/user/components/FilterSwitcher'
import SearchField from 'routes/user/components/SearchField'
import VacancyAppeals from 'routes/user/components/VacancyAppeals'
import VacancyStats from 'routes/user/components/VacancyStats'
import VacancyPromote from 'routes/vacancy-create/VacancyPromote'

const enhance = compose(
  withHistory,
  injectSheet({
    wrapper: {
      paddingBottom: '20px',
      '& > div:last-child': {
        marginTop: '24px'
      }
    },
    viewsWrap: {
      padding: '50px 60px',
      margin: '0 auto',
      background: '#F6F7F9'
    },
    searchWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      marginBottom: '18px'
    }
  })
)

const list = [
  { value: 'active', label: 'applicant_public', isStatic: true },
  { value: 'archive', label: 'applicant_archive', isStatic: true },
  { value: 'temp', label: 'applicant_drafts', isStatic: true }
]

const Vacncies = props => {
  const {
    classes,
    vacancyList,
    vacancyFilter,
    userData,
    onVacancyEdit,
    onSearch,
    vacancyData,
    history
  } = props

  const [openPromote, setOpenPromote] = useState(null)
  const [openViews, setOpenViews] = useState(null)
  const [openAppeals, setOpenAppeals] = useState(!fp.isEmpty(vacancyFilter.getParam('appeal')))

  const switcher = vacancyFilter.getParam('switcher') || 'active'

  const onOpenViews = curry((ev, id) => {
    ev.preventDefault()
    return setOpenViews(id)
  })
  const onCloseViews = (ev) => {
    ev.preventDefault()
    setOpenViews(null)
  }

  const onOpenAppeals = curry((ev, id) => {
    ev.preventDefault()
    history.replace(vacancyFilter.createURL({ appeal: id }))
    return setOpenAppeals(true)
  })
  const onCloseAppeals = (ev) => {
    ev.preventDefault()
    history.replace(vacancyFilter.createURL({ appeal: null }))
    setOpenAppeals(false)
  }

  const onOpenPromote = (id) => setOpenPromote(id)
  const onClosePromote = () => setOpenPromote(null)

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <div className={classes.searchWrap}>
          <FilterSwitcher
            list={list}
            filter={vacancyFilter}
            label={'main_vacancy'}
          />
          <TW>
            {lang => (
              <SearchField
                onChange={onSearch}
                type={'vacancy'}
                placeholder={t('emp_vacancy_search', lang)}
              />
            )}
          </TW>
        </div>
        <EmptyState
          data={vacancyList.data}
          loading={vacancyList.loading}>
          {switcher === 'active' &&
          <div>У вас нет активных вакансий. <Link to={VACANCY_CREATE_URL}>
            Перейти к созданию вакансии
          </Link></div>}
        </EmptyState>
        <CardList
          span={24}
          main={switcher === 'active'}
          type={VACANCY_CUSTOM}
          data={vacancyList}
          onOpenPromote={onOpenPromote}
          onOpenViews={onOpenViews}
          onOpenAppeals={onOpenAppeals}
          onVacancyEdit={onVacancyEdit}
        />
        <Pagination filter={vacancyFilter}/>
      </div>

      <VacancyPromote
        open={fp.isNumber(openPromote)}
        handleClose={onClosePromote}
        userData={userData}
        vacancy={openPromote}
      />

      <VacancyStats
        open={fp.isNumber(openViews)}
        handleClose={onCloseViews}
        vacancy={openViews}
      />

      <RenderOrNull value={openAppeals}>
        <Dialog
          open={openAppeals}
          handleClose={onCloseAppeals}
          fullScreen={true}>
          <div className={classes.viewsWrap}>
            <VacancyAppeals
              statusLoading={vacancyData.appealedChangeStatusLoading}
              countData={vacancyData.appealedCountDetail}
              onAppealedStatusChange={vacancyData.onAppealedStatusChange}
              data={vacancyData.appealedResumeList}
            />
          </div>
        </Dialog>
      </RenderOrNull>
    </Container>
  )
}

Vacncies.propTypes = {
  classes: PropTypes.object,
  vacancyList: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  vacancyFilter: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  vacancyData: PropTypes.object.isRequired,
  onVacancyEdit: PropTypes.func.isRequired
}

export default enhance(Vacncies)
