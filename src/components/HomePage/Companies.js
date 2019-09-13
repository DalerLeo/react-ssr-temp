import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import TitleTab from 'components/Title/TitleTab'
import CompanyCard from 'components/Cards/CompanyCard'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  ANCHOR_DISABLED
} from 'constants/styles'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import CardLoadingList from 'components/Cards/CardLoadingList'
import Link from '../Link'

const enhance = compose(
  withHandlers({
    // HandleOpenServicesDialog: props => () => {
    //     Return hashHistory.push({
    //         Pathname: '/admin',
    //         Search: queryToParams({servicesDialog: true})
    //     })
    // },
    // HandleCloseServicesDialog: props => () => {
    //     Return hashHistory.push({
    //         Pathname: _.get(hashHistory, ['location', 'pathname']),
    //         Search: queryToParams({servicesDialog: false})
    //     })
    // }
  }),
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

    companies: {
      marginTop: '24px',
      marginBottom: '-20px',
      '& > div': {
        marginBottom: '20px'
      }
    },
    howto: {
      ...ANCHOR_DISABLED,
      color: MAIN_COLOR,
      marginTop: '10px',
      textAlign: 'right',
      '&:hover': { color: MAIN_COLOR }
    }
  })
)

const title = [
  {
    'label': 'main_companies_of_the_week',
    'value': 'company-week'
  },
  {
    'label': 'main_popular_companies',
    'value': 'company-popular'
  }
]
const Companies = props => {
  const { classes, data, onChange, value } = props
  // Const query = paramsToQuery(_.get(hashHistory, ['location', 'search']))
  // Const openServicesDialog = toBoolean(_.get(query, 'servicesDialog'))
  const loading = _.get(data, 'loading')
  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.flex, classes.alignBaseline)}>
        <TitleTab value={value} tabs={title} onChange={onChange}/>
      </div>
      <CardLoadingList margin={'24px -10px -20px'} gutter={20} items={8} span={12} loading={loading} />
      {!data.loading && (
        <Row className={classes.companies} type={'flex'} gutter={20}>
          {_.map(data.data, (item, index) => {
            const id = _.get(item, 'id') || index
            return (
              <Col key={id} xs={12}>
                <CompanyCard data={item}/>
              </Col>
            )
          })}
        </Row>
      )}
      {false &&
      <div className={classes.howto}>
        <Link to={''} className={classes.howto}>Как сюда попасть?</Link>
      </div>}
    </div>
  )
}

Companies.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['new', 'top']),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default enhance(Companies)
