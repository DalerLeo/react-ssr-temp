import fp from 'lodash/fp'
import loMap from 'lodash/map'
import moment from 'moment'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import filterHelper from 'helpers/filterHelper'
import withHistory from 'helpers/withHistory'
import { getItemStateData, getStateData } from 'helpers/get'
import {
  employerVacancyStatViewsFetch,
  vacancyItemViewHistory
} from 'routes/user/actions'
import Row from 'antd/lib/row'
import TW from 'components/TW'
import Dialog from 'components/Dialog'
import RenderOrNull from 'components/Utils/RenderOrNull'
import VacancyChart from 'components/Chart'
import Guest from 'routes/my-office/common/guests/Guest'

const mapStateToProps = state => {
  const pathname = fp.get(['router', 'pathname'], state)
  const queries = fp.get(['router', 'queries'], state)
  return {
    ...getItemStateData('employer.statVacancyViews', 'stats', state),
    ...getStateData('vacancy.viewHistory', 'guests', state),
    filter: filterHelper([], pathname, queries)
  }
}

const withStyles = compose(
  withHistory,
  connect(mapStateToProps, {
    employerVacancyStatViewsFetch,
    vacancyItemViewHistory
  }),
  injectSheet({
    viewsWrap: {
      padding: '50px 60px'
    },
    guestsWrap: {
      marginTop: '30px'
    }
  })
)

const VacancyStats = props => {
  const {
    classes,
    history,
    open,
    vacancy,
    handleClose,
    statsDetail,
    guestsList,
    filter,
    ...restProps
  } = props

  const guests = fp.get('data', guestsList)
  const guestsLoading = fp.get('loading', guestsList)

  const filterRequest = filter.filterRequest()
  const today = moment().format('YYYY-MM-DD')
  const defaultFromDate = filter.getParam('from') || moment().subtract('7', 'days').format('YYYY-MM-DD')
  const defaultToDate = filter.getParam('to') || moment().format('YYYY-MM-DD')

  const clearDateQueries = () => {
    history.replace(filter.createURL({
      from: null,
      to: null
    }))
  }

  useEffect(() => {
    if (vacancy && open) {
      restProps.employerVacancyStatViewsFetch({
        vacancy,
        fromDate: defaultFromDate,
        toDate: defaultToDate
      })
      restProps.vacancyItemViewHistory(vacancy)
    } else clearDateQueries()
  }, [vacancy, filterRequest, open])

  const onPeriodChange = fromDate => {
    const dateQueries = {
      from: fromDate,
      to: today
    }
    history.replace(filter.createURL(dateQueries))
  }

  return (
    <Dialog
      handleClose={handleClose}
      width={1000}
      open={open}>
      <div className={classes.viewsWrap}>
        <TW>
          {lang => (
            <VacancyChart
              lang={lang}
              filter={filter}
              data={statsDetail}
              onChartPeriodChange={onPeriodChange}
            />
          )}
        </TW>
        <RenderOrNull value={guests}>
          <div className={classes.guestsWrap}>
            <Row type={'flex'} gutter={20}>
              {loMap(guests, (item, index) => {
                const viewCount = fp.get('count', item)
                const id = fp.get('user.id', item)
                const fullName = fp.get('user.fullName', item)
                const userType = fp.get('user.userType', item)
                const rating = fp.get('user.rating', item)
                const lastVisit = fp.get('user.lastVisit', item)
                const photo = fp.get('user.photo.file', item)
                return (
                  <Guest
                    key={index}
                    id={id}
                    fullName={fullName}
                    viewCount={viewCount}
                    userType={userType}
                    photo={photo}
                    rating={rating}
                    lastVisit={lastVisit}
                  />
                )
              })}
            </Row>
          </div>
        </RenderOrNull>
      </div>
    </Dialog>
  )
}

VacancyStats.propTypes = {
  classes: PropTypes.object,
  vacancy: PropTypes.number,
  history: PropTypes.object,
  statsDetail: PropTypes.object,
  guestsList: PropTypes.object,
  filter: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default withStyles(VacancyStats)
