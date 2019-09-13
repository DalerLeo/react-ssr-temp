import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import numberFormat from 'helpers/numberFormat'
import { Radio, RadioGroup } from 'components/FormComponents'
import RenderOrNull from 'components/Utils/RenderOrNull'

const withStyles = injectSheet({})

const vacancyTypesCodes = ['ES5', 'ES7']
const VacancyTypesRadio = props => {
  const { classes, className, services, onChange } = props

  const vacancyTypesServices = fp.filter(item => {
    const code = fp.get('service.code', item)
    return fp.includes(code, vacancyTypesCodes)
  }, fp.get('data', services))

  return (
    <RenderOrNull value={vacancyTypesServices}>
      <div className={classes.vacancyType}>
        <Field
          name={'vacancyType'}
          component={RadioGroup}
          onChange={onChange}
          className={className}>
          {fp.map(item => {
            const id = fp.get('service.id', item)
            const name = fp.get('service.name', item)
            const code = fp.get('service.code', item)
            const count = numberFormat(fp.get('count', item), 'шт.')
            return (
              <Radio
                key={id}
                value={code}
                label={`${name} (${count})`}
                className={classes.radioBtn}
              />
            )
          }, vacancyTypesServices)}
        </Field>
      </div>
    </RenderOrNull>
  )
}

VacancyTypesRadio.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  services: PropTypes.object,
  onChange: PropTypes.func
}

export default withStyles(VacancyTypesRadio)
