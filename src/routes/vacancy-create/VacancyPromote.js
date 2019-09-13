import fp from 'lodash/fp'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { reduxForm, Field, getFormValues, reset } from 'redux-form'
import {
  crossBrowserify,
  fallbacksStyle,
  LIGHT_GREY_BORDER_STYLE,
  MAIN_COLOR,
  ONE
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import toast from 'helpers/toast'
import { getStateData } from 'helpers/get'
import { activeServicesFetch } from './actions'
import {
  getEmployerServicesList,
  activateServicesAction
} from '../services/actions'
import Title from 'components/Title'
import Dialog from 'components/Dialog'
import ServicesGroup from './components/ServicesGroup'
import ServiceCheckBoxGroup from 'components/FormComponents/CheckboxGroup/ServiceCheckBoxGroup'
import T from 'components/T'
import Button from 'components/Button/Button'

const mapStateToProps = state => ({
  formValues: getFormValues('VacancyPromote')(state),
  ...getStateData('userServices.unused', 'services', state, false),
  ...getStateData('service.employer', 'allServices', state, false)
})

const withStyles = compose(
  reduxForm({ form: 'VacancyPromote' }),
  connect(mapStateToProps, {
    activeServicesFetch,
    getEmployerServicesList,
    activateServicesAction,
    reset
  }),
  withHandlers({
    onPromoteVacancy: props => () => {
      const { vacancy, handleClose, formValues } = props
      const services = fp.get('services', formValues)
      const servicesCount = services.length
      return props.activateServicesAction(services, { vacancy })
        .then(() => {
          toast({
            title: 'Применено',
            message: 'Услуги были применены к вакансии'
          })
          props.activeServicesFetch()
          return handleClose()
        })
        .catch(() => {
          const message = servicesCount === ONE
            ? 'Выбранная услуга уже применена к вакансии'
            : 'Выбранные услуги уже применены к вакансии'
          toast({
            title: 'Ошибка',
            message,
            type: 'error'
          })
        })
    }
  }),
  injectSheet({
    promo: {
      padding: '40px 0'
    },
    mainServices: {
      borderBottom: '1px solid #EFF1F2',
      marginBottom: '30px',
      paddingBottom: '30px'
    },
    title: {
      margin: '0 60px'
    },
    topTitle: {
      marginBottom: '12px'
    },
    services: {

    },
    noServices: {
      borderRadius: '4px',
      border: LIGHT_GREY_BORDER_STYLE,
      margin: '25px 60px 0',
      padding: '20px',
      textAlign: 'center'
    },
    service: {
      padding: '14px 60px 14px 80px',
      '&:nth-child(even)': {
        background: hexToRgb('#fff', '0.6')
      }
    },
    actionButton: {
      marginTop: '30px',
      padding: '0 60px',
      textAlign: 'right'
    },

    buyServices: {

    },
    toggleServices: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      margin: '0 60px 12px'
    },
    toggle: {
      color: MAIN_COLOR,
      cursor: 'pointer',
      fontWeight: '500'
    },
    serviceItem: {
      margin: '0 !important',
      padding: '14px 50px 14px 70px',
      '&:nth-child(even)': {
        background: hexToRgb('#fff', '0.6')
      }
    }
  })
)

const VacancyPromote = props => {
  const {
    classes,
    open,
    handleClose,
    servicesList,
    allServicesList,
    userData,
    ...otherProps
  } = props

  const userEmail = fp.get('username', userData)
  const unusedServices = fp.get('data', servicesList)

  const [showServices, setShowServices] = useState(fp.isEmpty(unusedServices))

  useEffect(() => {
    otherProps.activeServicesFetch()
    otherProps.getEmployerServicesList()

    if (open) otherProps.reset('VacancyPromote')
  }, [open])

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={'755px'}>
      <div className={classes.promo}>
        <div className={classes.mainServices}>
          <Title
            isStatic={true}
            className={classNames(classes.title, classes.topTitle)}
            medium={true}
            text={'button_vacancy_promotion'}
          />
          {fp.isEmpty(unusedServices)
            ? (
              <div className={classes.noServices}>
                <T>emp_no_active_services</T>
              </div>
            )
            : (
              <React.Fragment>
                <Field
                  name={'services'}
                  component={ServicesGroup}
                  items={unusedServices}
                  itemClassName={classes.service}
                />
                <div className={classes.actionButton}>
                  <Button
                    text={'button_apply'}
                    type={'medium'}
                    style={{ width: '200px' }}
                    onClick={otherProps.onPromoteVacancy}
                  />
                </div>
              </React.Fragment>
            )}
        </div>
        <div className={classes.buyServices}>
          <div className={classes.toggleServices}>
            <Title
              isStatic={true}
              medium={true}
              text={'main_mj_serv_all'}
              margin={'0'}
            />
            <div className={classes.toggle} onClick={() => setShowServices(!showServices)}>
              <T>{showServices ? 'button_hide_serv' : 'button_buy_serv'}</T>
            </div>
          </div>
          <div style={{ display: showServices ? 'block' : 'none' }}>
            <Field
              name={'allServices'}
              component={ServiceCheckBoxGroup}
              items={fp.get('data', allServicesList)}
              itemClassName={classes.serviceItem}
              totalPadding={'60px'}
              userEmail={userEmail}
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

VacancyPromote.propTypes = {
  classes: PropTypes.object,
  userData: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  servicesList: PropTypes.object,
  allServicesList: PropTypes.object,
  vacancy: PropTypes.number
}

export default withStyles(VacancyPromote)
