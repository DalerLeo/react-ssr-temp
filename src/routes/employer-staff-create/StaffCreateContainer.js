import {
  compose,
  setDisplayName,
  mapPropsStream,
  createEventHandler,
  pure
} from 'recompose'
import sprintf from 'sprintf'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import fp from 'lodash/fp'
import StaffCreate from './StaffCreate'
import withHistory from 'helpers/withHistory'
import formValidate from 'helpers/formValidate'
import { getItemStateData } from 'helpers/get'
import { EMPLOYER_ITEM_URL } from 'constants/routes'
import {
  employerStaffCreate,
  employerStaffUpdate,
  employerStaffItemFetch
} from './actions'

const mapDispatchToProps = {
  formValidate,
  employerStaffCreate,
  employerStaffUpdate,
  employerStaffItemFetch
}

const mapStateToProps = (state) => {
  return {
    formValues: getFormValues('StaffForm')(state),
    ...getItemStateData('employerStaff.item', 'employerStaff', state)
  }
}

const getStaffIdFromProps = fp.get(['history', 'location', 'state', 'id'])

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    const { handler: onSubmit, stream: onSubmit$ } = createEventHandler()

    onSubmit$
      .withLatestFrom(props$)
      .subscribe(([value, props]) => {
        const values = fp.get('formValues', props)
        const staffId = getStaffIdFromProps(props)
        return (staffId ? props.employerStaffUpdate(staffId, values) : props.employerStaffCreate(values))
          .then(() => {
            props.history.push(sprintf(EMPLOYER_ITEM_URL, 'employer-staff'))
          })
          .catch(errr => {
            return props.formValidate('StaffForm', errr)
          })
      })

    props$
      .distinctUntilChanged(null, getStaffIdFromProps)
      .filter(getStaffIdFromProps)
      .subscribe((props) => {
        const staffId = getStaffIdFromProps(props)
        props.employerStaffItemFetch(staffId)
      })

    return props$.combineLatest(props => {
      const employerStaffDetail = fp.get(['employerStaffDetail', 'data'], props)
      const isUpdate = Boolean(getStaffIdFromProps(props))
      const initialValues = {
        fullName: fp.get('fullName', employerStaffDetail),
        phone: fp.get('phone', employerStaffDetail),
        position: fp.get('position', employerStaffDetail),
        email: fp.get('email', employerStaffDetail)
      }
      return {
        ...props,
        onSubmit,
        isUpdate,
        initialValues
      }
    })
  }),
  setDisplayName('StaffCreateContainer'),
  pure
)(StaffCreate)
