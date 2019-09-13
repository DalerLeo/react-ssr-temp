import React from 'react'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import injectSheet from 'react-jss'
import { animationStyle, BLACK_COLOR } from 'constants/styles'
import Row from 'antd/lib/row'
import Pagination from 'components/Pagination'
import T from 'components/T'
import Container from 'components/Container'
import EmptyState from 'components/EmptyState'
import FilterSwitcher from 'routes/user/components/FilterSwitcher'
import Guest from './Guest'
import hexToRgb from 'helpers/hexToRgb'

const withStyles = injectSheet({
  filter: {
    marginBottom: '25px'
  },
  title: {
    color: BLACK_COLOR,
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500'
  },
  description: {
    color: hexToRgb(BLACK_COLOR, '0.6'),
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: '23px',
    margin: '20px 0'
  }
})

const Guests = props => {
  const { classes, guestsList, guestsFilter, isEmployer, resumeData } = props
  const resumes = fp.map(item => ({
    value: String(item.id),
    label: item.title
  }), resumeData)

  const values = [
    { isStatic: true, value: '', label: 'applicant_guests_all' },
    ...resumes
  ]

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <div className={classes.filter}>
          {isEmployer
            ? <div className={classes.description}>
              <span className={classes.title}><T>main_my_guests</T></span>
              <T>main_my_guests_desc</T>
            </div>
            : <FilterSwitcher filter={guestsFilter} label={'main_my_guests'} list={values}/>}
        </div>
        <EmptyState
          data={guestsList.data}
          loading={guestsList.loading}
        />
        <Row type={'flex'} gutter={20}>
          {fp.map(item => {
            const id = fp.get('id', item)
            const userType = fp.get('userType', item)
            const fullName = fp.get('fullName', item)
            const count = fp.get('count', item)
            const rating = fp.get('rating', item)
            const lastVisit = fp.get('lastVisit', item) || fp.get('modifiedDate', item)
            const photo = fp.get('photo.file', item)
            const vacancyCount = fp.get('vacancyCount', item)

            return (
              <Guest
                key={id}
                id={id}
                userType={userType}
                fullName={fullName}
                viewCount={count}
                rating={rating}
                photo={photo}
                lastVisit={lastVisit}
                vacancyCount={vacancyCount}
              />
            )
          }, fp.get('data', guestsList))}
        </Row>
        <Pagination filter={guestsFilter}/>
      </div>
    </Container>
  )
}

Guests.propTypes = {
  guestsList: propTypes.object,
  resumeData: propTypes.object,
  guestsFilter: propTypes.object,
  classes: propTypes.object,
  isEmployer: propTypes.bool
}
export default withStyles(Guests)
