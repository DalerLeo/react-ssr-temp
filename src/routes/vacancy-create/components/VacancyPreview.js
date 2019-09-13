import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import Container from 'components/Container'
import Dialog from 'components/Dialog'
import VacancyDetail from 'routes/vacancy-details/VacancyDetail'

const enhance = compose(
  injectSheet({
    previewWrap: {
      height: '100%',
      '& .ant-modal-body': {
        background: '#fff'
      }
    },
    iconClose: {
      position: 'fixed',
      top: '40px',
      right: '40px'
    }
  })
)

const VacancyPreview = ({ ...props }) => {
  const {
    classes,
    open,
    handleClose,
    data,
    userData,
    countryList,
    licenceList,
    languageList,
    currencyList,
    industries
  } = props

  const agesArray = [fp.get('from', data), fp.get('to', data)]
  const age = fp.flow(
    fp.filter(item => item),
    fp.join(' - ')
  )(agesArray)

  const bonus = fp.flow(
    fp.get('bonus'),
    fp.join('-')
  )(data)

  const currency = fp.find({
    id: fp.toInteger(fp.get('currency', data))
  }, currencyList)

  const place = fp.find({
    id: fp.toInteger(fp.get('place', data))
  }, countryList)

  const driverLicences = fp.filter(item => {
    return fp.includes(item.id, fp.get('driverLicences', data))
  }, licenceList)

  const languages = fp.get('languageRequirements', data)
  const languageRequirements = fp.flow(
    fp.filter(item => {
      const langId = fp.get('id', item)
      const dataLang = fp.find({ language: langId }, languages)
      return langId === fp.get('language', dataLang)
    }),
    fp.map(item => {
      const langId = fp.get('id', item)
      const langName = fp.get('name', item)
      const langLevel = fp.flow(
        fp.find({ language: langId }),
        fp.get('level')
      )(languages)
      return {
        language: {
          id: langId,
          name: langName
        },
        level: langLevel
      }
    })
  )(languageList)

  const industry = fp.flow(
    fp.first,
    fp.get('parent')
  )(industries)

  const owner = {
    title: fp.get('title', userData),
    logo: fp.get('logo', userData),
    generalStatus: fp.get('generalStatus', userData)
  }

  const excludedData = ['from', 'to', 'sphere', 'specialities']
  const formedData = fp.omit(excludedData, {
    ...data,
    owner,
    age,
    bonus,
    place,
    currency,
    industry,
    driverLicences,
    languageRequirements,
    publicationDate: new Date()
  })

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      className={classes.previewWrap}
      iconClassName={classes.iconClose}
      zIndex={20000}>
      <Container>
        <VacancyDetail
          vacancyDetail={{
            data: formedData
          }}
          userData={userData}
          vacancyList={{}}
          resumeList={{}}
        />
      </Container>
    </Dialog>
  )
}

VacancyPreview.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  currencyList: PropTypes.array.isRequired,
  countryList: PropTypes.array.isRequired,
  licenceList: PropTypes.array.isRequired,
  languageList: PropTypes.array.isRequired,
  industries: PropTypes.array.isRequired
}

export default enhance(VacancyPreview)
