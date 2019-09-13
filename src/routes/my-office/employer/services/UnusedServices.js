import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import t from 'helpers/translate'
import TW from 'components/TW'
import Title from 'components/Title'
import { Table, TableRow } from 'components/Table'

const withStyles = injectSheet({
  wrapper: {
    marginBottom: '40px'
  }
})

const UnusedServices = props => {
  const { classes, data } = props

  const list = fp.get('data', data)
  const loading = fp.get('loading', data)

  const tableList = fp.map(item => {
    const id = fp.get('service.id', item)
    const name = fp.get('service.name', item)
    const count = fp.get('count', item)
    return (
      <TableRow
        key={id}
        columns={[
          { size: 18, content: name },
          { size: 6, content: count, right: true }
        ]}
      />
    )
  }, list)

  return (
    <section className={classes.wrapper}>
      <Title isStatic={true} isProfile={true} text={'serv_in_stock'}/>
      <TW>
        {lang => (
          <Table
            header={[
              { size: 18, title: t('menu_services', lang) },
              { size: 6, title: t('serv_discounts_count', lang), right: true }
            ]}
            list={tableList}
            loading={loading}
            emptyStateText={'У вас нет услуг в наличии. Приобретайте услуги для продвижения Ваших вакансий.'}
          />
        )}
      </TW>
    </section>
  )
}

UnusedServices.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
}

export default withStyles(UnusedServices)
