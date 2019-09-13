import loMap from 'lodash/map'
import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import sprintf from 'sprintf'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { PRIMARY_COLOR } from 'constants/styles'
import { SERVICE_ITEM_URL } from 'constants/routes'
import withQuotes from 'helpers/withQuotes'
import hexToRgb from 'helpers/hexToRgb'
import t from 'helpers/translate'
import Link from 'components/Link'
import T from 'components/T'
import TW from 'components/TW'
import Pagination from 'components/Pagination'
import Title from 'components/Title'
import { Table, TableRow } from 'components/Table'

const withStyles = injectSheet({
  vacancyTitle: {
    color: hexToRgb('#000', '0.6'),
    fontStyle: 'italic'
  },
  warn: {
    background: '#F46090',
    borderRadius: '20px',
    color: '#fff',
    fontWeight: '600',
    padding: '1px 6px'
  },
  extendServ: {
    color: PRIMARY_COLOR + '!important',
    fontSize: '13px',
    marginRight: '10px'
  }
})

const today = moment()
const dateFormat = (date) => moment(date).format('DD.MM.YYYY')

/* eslint-disable no-magic-numbers */
const ActiveServices = props => {
  const { data, filter, classes } = props

  const loading = fp.get('loading', data)
  const list = fp.get('data', data)

  const tableList = loMap(list, (item, key) => {
    const name = fp.get(['service', 'name'], item)
    const vacancyName = fp.get(['vacancy', 'title'], item)
    const serviceCode = fp.get(['service', 'code'], item)
    const serviceActiveDays = fp.get(['service', 'activeDays'], item)
    const DAY_WARNING = serviceActiveDays >= 30 ? 7 : 3
    const startDate = fp.get('createdDate', item)
    const endDate = fp.get('elapseDate', item)
    const period = `${dateFormat(startDate)} - ${dateFormat(endDate)}`
    const daysLeft = Math.floor(moment(endDate).diff(today, 'days', true))
    const warning = daysLeft <= DAY_WARNING

    const serviceRedirectUrl = fp.startsWith('ES', serviceCode)
      ? 'vacancy'
      : fp.startsWith('DA', serviceCode)
        ? 'database'
        : 'vip'

    const serviceInfo = (
      <React.Fragment>
        <div className={classes.serviceName}>{name}</div>
        <div className={classes.vacancyTitle}>{withQuotes(vacancyName)}</div>
      </React.Fragment>
    )
    const daysLeftContent = (
      <React.Fragment>
        {warning && (
          <Link
            className={classes.extendServ}
            to={sprintf(SERVICE_ITEM_URL, serviceRedirectUrl)}>
            <T>emp_extend_service</T>
          </Link>
        )}
        <span className={classNames({
          [classes.warn]: warning
        })}>{daysLeft}</span>
      </React.Fragment>
    )

    return (
      <TableRow
        key={key}
        columns={[
          { size: 11, content: serviceInfo },
          { size: 7, content: period, right: true },
          { size: 6, content: daysLeftContent, right: true }
        ]}
      />
    )
  })

  return (
    <section>
      <Title isStatic={true} isProfile={true} text={'emp_active_serv'}/>
      <TW>
        {lang => (
          <Table
            header={[
              { size: 11, title: t('menu_services', lang) },
              { size: 7, title: t('emp_validity', lang), right: true },
              { size: 6, title: t('emp_rest_of_days', lang), right: true }
            ]}
            list={tableList}
            loading={loading}
          />
        )}
      </TW>
      <Pagination filter={filter} smooth={true}/>
    </section>
  )
}

ActiveServices.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
}

export default withStyles(ActiveServices)
