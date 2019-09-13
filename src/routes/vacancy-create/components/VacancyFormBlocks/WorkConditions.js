import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import * as API from 'constants/api'
import { BONUS_LIST } from 'constants/backend'
import { normalizeNumber } from 'helpers/normalizeNumber'
import t from 'helpers/translate'
import withStyles from './withStyles'
import {
  CustomCheckBoxGroup,
  Label2 as Label,
  SearchFieldConfig,
  TextField
} from 'components/FormComponents'
import TW from 'components/TW'

const WorkConditions = props => {
  const { classes } = props
  return (
    <TW>
      {lang => (
        <React.Fragment>
          <Label label={t('vacancy_salary', lang)}/>
          <div className={classes.salaries}>
            <Field
              width={190}
              name={'salaryFrom'}
              component={TextField}
              prefix={t('main_from', lang)}
              type={'number'}
              formatter={normalizeNumber}
            />
            <Field
              width={190}
              name={'salaryTo'}
              component={TextField}
              prefix={t('main_to', lang)}
              type={'number'}
              formatter={normalizeNumber}
            />
            <Field
              width={'90px'}
              name={'currency'}
              component={SearchFieldConfig}
              api={API.CURRENCY_LIST}
            />
          </div>
          <div className={classes.fields}>
            <Field
              name={'bonus'}
              label={t('vacancy_bonus_pack', lang)}
              grid={{ span: 12 }}
              component={CustomCheckBoxGroup}
              items={BONUS_LIST}
            />
          </div>
        </React.Fragment>
      )}
    </TW>
  )
}

WorkConditions.propTypes = {
  classes: PropTypes.object
}

export default withStyles(WorkConditions)
