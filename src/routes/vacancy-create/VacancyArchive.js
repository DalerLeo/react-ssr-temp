import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { COLOR_RED, crossBrowserify } from 'constants/styles'
import toast from 'helpers/toast'
import { getStateLoading, arrayObjToObj } from 'helpers/get'
import hexToRgb from 'helpers/hexToRgb'
import { vacancyDeactivateAction } from 'routes/vacancy-details/actions'
import { vacancyListFetch } from 'routes/user/actions'
import { vacancyFetchItem } from './actions'
import Title from 'components/Title'
import Dialog from 'components/Dialog'
import RadioGroup from 'components/FormComponents/RadioGroup'
import { TextField } from 'components/FormComponents'
import { Button, GREY } from 'components/Button'

const mapStateToProps = state => ({
  ...getStateLoading('vacancy.deactivate', 'deactivate', state)
})

const withStyles = compose(
  reduxForm({
    form: 'VacancyAchive'
  }),
  connect(mapStateToProps, {
    vacancyDeactivateAction,
    vacancyListFetch,
    vacancyFetchItem
  }),
  injectSheet({
    wrapper: {
      padding: '40px 50px 50px'
    },
    title: {
      marginBottom: '42px'
    },
    error: {
      ...crossBrowserify('borderRadius', '4px'),
      background: hexToRgb(COLOR_RED, '0.2'),
      color: COLOR_RED,
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '-15px',
      marginBottom: '15px',
      padding: '7px 20px'
    },
    radioGroup: {
      marginLeft: '-18px'
    },
    otherReason: {
      marginTop: '10px'
    },
    actionButtons: {
      textAlign: 'right',
      marginTop: '40px'
    }
  })
)

const archiveItems = [
  {
    value: '1',
    label: 'Нашли сотрудника здесь'
  },
  {
    value: '2',
    label: 'Нашли сотрудника на другом ресурсе'
  },
  {
    value: '3',
    label: 'Другая причина'
  }
]

const VacancyArchive = props => {
  const {
    vacancy,
    classes,
    open,
    handleClose,
    fetchOnSuccess,
    deactivateLoading,
    withServices,
    ...otherProps
  } = props

  const [reason, setReason] = useState(null)
  const [reasonText, setReasonText] = useState('')

  const reasons = arrayObjToObj(archiveItems)
  const isOtherReason = reason === '3'
  const reasonTextFormatted = isOtherReason ? reasonText : reasons[reason]

  useEffect(() => {
    if (open) {
      setReason(null)
      setReasonText('')
    }
  }, [open])

  const onDeactivate = () => {
    otherProps.vacancyDeactivateAction(vacancy, reasonTextFormatted)
      .then(() => {
        toast({
          title: 'Архивировано',
          message: 'Вакансия перемещена в архив'
        })
        if (fetchOnSuccess === 'list') {
          otherProps.vacancyListFetch({ is_active: true })
        }
        if (fetchOnSuccess === 'item') {
          otherProps.vacancyFetchItem(vacancy)
        }
        return handleClose()
      })
  }

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={'755px'}>
      <div className={classes.wrapper}>
        <Title
          className={classes.title}
          isStatic={true}
          medium={true}
          text={'vacancy_archive_reason'}
        />
        {withServices &&
        <div className={classes.error}>
          Внимание! У этой вакансии есть активные услуги, при архивации они деактивируются!
        </div>}
        <div className={classes.radioGroup}>
          <RadioGroup
            block={true}
            items={archiveItems}
            value={reason}
            onChange={event => setReason(event.target.value)}
          />
          {false && <Field
            name={'archiveReason'}
            component={RadioGroup}
            block={true}
            items={archiveItems}
          />}
        </div>
        {isOtherReason && (
          <div className={classes.otherReason}>
            <TextField
              value={reasonText}
              onChange={event => setReasonText(event.target.value)}
              placeholder={'Опишите пожалуйста причину'}
            />
          </div>
        )}
        <div className={classes.actionButtons}>
          <Button
            onClick={handleClose}
            type={'medium'}
            text={'button_cancel'}
            color={GREY}
            bordered={true}
            style={{ width: '180px', marginRight: '20px' }}
          />
          <Button
            onClick={onDeactivate}
            type={'medium'}
            text={'button_select'}
            style={{ width: '180px' }}
            loading={deactivateLoading}
            disabled={Boolean(!reasonTextFormatted)}
          />
        </div>
      </div>
    </Dialog>
  )
}

VacancyArchive.propTypes = {
  classes: PropTypes.object,
  vacancy: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  withServices: PropTypes.bool,
  deactivateLoading: PropTypes.bool,
  fetchOnSuccess: PropTypes.oneOf([
    'list',
    'item'
  ]).isRequired
}

export default withStyles(VacancyArchive)
