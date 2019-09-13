import React, { useState } from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import {
  animationStyle,
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import t from 'helpers/translate'
import hexToRgb from 'helpers/hexToRgb'
import { Field } from 'redux-form'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'
import { TextField, RadioGroup, Label } from 'components/FormComponents'
import { Button, YELLOW } from 'components/Button'

const styles = {
  descr: {
    color: hexToRgb('#000', '0.6 '),
    lineHeight: '22px'
  },
  field: {
    margin: '40px 0',
    background: 'rgba(255, 211, 103, 0.04)',
    border: '1px solid #FFD257',
    borderRadius: '4px',
    padding: '20px 25px 25px',
    maxWidth: '550px'
  },
  inputWrap: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'flex-start')
  },
  hint: {
    fontStyle: 'italic',
    fontSize: '13px',
    lineHeight: '17px',
    marginTop: '8px',
    color: '#9197A4'
  },
  paymentType: {
    marginBottom: '15px'
  }
}

const paymentTypes = [
  { value: 'payme', name: 'Payme' },
  { value: 'click', name: 'Click' }
]

const DataBase = props => {
  const { classes, onFillBalance, loading } = props
  const [paymentType, setPaymentType] = useState('payme')

  const onSubmit = () => onFillBalance({ paymentType })

  return (
    <div style={animationStyle}>
      <Title isStatic={true} isProfile={true} text={'serv_balance_buy'}/>
      <div className={classes.descr}>
        <T>serv_balance_fill_desc</T>
      </div>
      <div className={classes.field}>
        <TW>
          {lang => <Label label={t('serv_balance_fill', lang)}/>}
        </TW>
        <RadioGroup
          items={paymentTypes}
          className={classes.paymentType}
          value={paymentType}
          onChange={event => setPaymentType(event.target.value)}
        />
        <div className={classes.inputWrap}>
          <Field
            component={TextField}
            placeholder={'100 000'}
            type={'number'}
            width={'270px'}
            name={'amount'}
          />
          <Button
            color={YELLOW}
            text={'applicant_replenish'}
            style={{ width: '200px', marginLeft: '20px' }}
            type={'medium'}
            loading={loading}
            onClick={onSubmit}
          />
        </div>
        <div className={classes.hint}><T>serv_balance_fill_terms</T></div>
      </div>
    </div>
  )
}

DataBase.propTypes = {
  classes: PropTypes.object,
  onFillBalance: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default withStyles(styles)(DataBase)
