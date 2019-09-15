import React from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import fp from 'lodash/fp'
import VacancyCard from './VacancyCard'
import ResumeCard from './Resume'
import CompanyCard from './CompanyCard'
import VacancyCustomCard from './VacancyCustomCard'
import ApplicantBigCard from './ApplicantBigCard'
import ApplicantCard from './ApplicantCard'
import MoreButton from 'components/MoreButton'
import {
  COMPANY,
  VACANCY,
  VACANCY_BIG,
  RESUME,
  APP_BIG,
  APP,
  VACANCY_CUSTOM
} from './index'
import CardLoadingList from './CardLoadingList'

const CardList = props => {
  const {
    type,
    data,
    gutter,
    span,
    marginBottom,
    onMore,
    small,
    filter,
    smooth,
    link,
    moreText,
    ...others
  } = props

  const page = filter && filter.getParam('page')
  const hasMore = filter && filter.hasMoreItems()
  const isVacancy = type === VACANCY
  const isCompany = type === COMPANY
  const isApp = type === APP
  const isVacancyBig = type === VACANCY_BIG
  const isVacancyCustom = type === VACANCY_CUSTOM
  const isAppBig = type === APP_BIG
  const isResume = type === RESUME

  return (
    <React.Fragment>
      {((page && onMore) || !data.loading) && (
        <Row type={'flex'} gutter={gutter}>
          {fp.map(item => {
            const id = fp.get('id', item)
            return (
              <Col key={id} xs={span} style={{ marginBottom }}>
                {isVacancy && (
                  <VacancyCard
                    marginBottom={true}
                    data={item}
                  />
                )}
                {isVacancyCustom && (
                  <VacancyCustomCard
                    {...others}
                    marginBottom={true}
                    data={item} />
                )}
                {isCompany && (
                  <CompanyCard
                    small={small}
                    data={item}
                    isFav={others.isFav}
                  />
                )}
                {isAppBig && (
                  <ApplicantBigCard
                    {...others}
                    marginBottom={true}
                    smooth={smooth}
                    small={small}
                    data={item} />
                )}
                {isApp && (
                  <ApplicantCard
                    marginBottom={true}
                    smooth={smooth}
                    small={small}
                    data={item} />
                )}
                {isResume && (
                  <ResumeCard
                    marginBottom={true}
                    smooth={smooth}
                    small={small}
                    bottomBtn={true}
                    main={true}
                    data={item} />
                )}
              </Col>
            )
          }, fp.get('data', data))}
        </Row>
      )}
      <CardLoadingList type={type} items={10} loading={data.loading} />
      {onMore && hasMore && <MoreButton onClick={onMore} text={'button_more'}/>}
      {link && <MoreButton style={{ margin: '10px 0 68px' }} link={link} text={moreText || 'button_more'}/>}
    </React.Fragment>

  )
}

CardList.defaultProps = {
  gutter: 0,
  span: 24,
  smooth: false
}

CardList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  filter: PropTypes.object,
  marginBottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  span: PropTypes.number,
  small: PropTypes.bool,
  page: PropTypes.string,
  link: PropTypes.string,
  moreText: PropTypes.any,
  gutter: PropTypes.number,
  onMore: PropTypes.func,
  smooth: PropTypes.bool
}

export default CardList
