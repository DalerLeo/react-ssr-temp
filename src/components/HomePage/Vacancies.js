import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import MoreButton from 'components/MoreButton'
import VacancyCard from 'components/Cards/VacancyCard'
import CardLoadingList from 'components/Cards/CardLoadingList'
import ApplicantCard from 'components/Cards/ApplicantCard'
import {
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import { SEARCH_RESULTS_URL } from 'constants/routes'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import TitleTab from 'components/Title/TitleTab'
import Title from 'components/Title'

const enhance = compose(
  injectSheet({
    flex: fallbacksStyle('display', 'flex'),
    alignCenter: crossBrowserify('alignItems', 'center'),
    alignBaseline: crossBrowserify('alignItems', 'baseline'),
    justifyCenter: crossBrowserify('justifyContent', 'center'),
    justifyBetween: crossBrowserify('justifyContent', 'space-between'),

    wrapper: {
      marginBottom: '60px',
      '&:last-child': {
        marginBottom: '0'
      }
    },

    vacancies: {
      marginTop: '24px',
      marginBottom: '-20px',
      '& > div': {
        marginBottom: '20px'
      }
    }
  })
)

const tabs = [
  {
    'label': 'main_new_vacancy',
    'value': 'vacancy'
  },
  {
    'label': 'main_specialist',
    'value': 'specialist'
  }
]

const Vacancies = (props) => {
  const {
    classes,
    onChange,
    value,
    data,
    title,
    smooth,
    showMoreButton,
    isStaticTitle
  } = props

  const buttonTitle = value === 'vacancy' ? 'button_more_vacancy' : 'button_more_specialist'
  const type = value === 'vacancy' ? 'type=vacancy' : 'type=resume'
  return (
    <div className={classes.wrapper}>
      {!title && <TitleTab value={value} tabs={tabs} onChange={onChange}/>}
      {title && <Title isStatic={isStaticTitle} text={title}/>}

      <CardLoadingList margin={'24px 0'} items={4} loading={data.loading} />

      {!data.loading && <Row className={classes.vacancies} type={'flex'} gutter={20}>

        {_.map(_.get(data, 'data'), (item, index) => {
          const id = _.get(item, 'id') || index
          if (value === 'vacancy') {
            return (
              <Col key={id} xs={24}>
                <VacancyCard smooth={smooth} data={item}/>
              </Col>
            )
          }
          return (
            <Col key={id} xs={12}>
              <ApplicantCard data={item}/>
            </Col>
          )
        })}
      </Row>}
      {showMoreButton &&
      <MoreButton
        text={buttonTitle}
        link={{ pathname: SEARCH_RESULTS_URL, search: type }}
        onClick={() => null}
      />}
    </div>
  )
}

Vacancies.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
  smooth: PropTypes.bool,
  showMoreButton: PropTypes.bool,
  isStaticTitle: PropTypes.bool
}

Vacancies.defaultProps = {
  isStaticTitle: true,
  showMoreButton: true
}

export default enhance(Vacancies)
