import React from 'react'
import PropTypes from 'prop-types'
import loGet from 'lodash/get'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Image from 'images/myjob.png'
import {
  fallbacksStyle,
  GREY_BORDER_STYLE
} from 'constants/styles'
import CompanyName from './CompanyName'
import { getVacancySalary } from 'helpers/get'

const enhance = compose(
  injectSheet({
    vacancySmall: {
      ...fallbacksStyle('display', 'flex'),
      overflow: 'hidden',
      width: '100%',
      border: GREY_BORDER_STYLE,
      borderRadius: '4px'
    },
    image: {
      height: '112px',
      width: '105px',
      minWidth: '105px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block'
    },
    body: {
      overflow: 'hidden',
      padding: '19px 30px 19px 25px',
      position: 'relative',
      width: '100%'
    },

    header: {
      marginBottom: '6px',
      fontWeight: '500',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxHeight: '1.57em'
    },
    salary: {
      fontSize: '13px',
      marginTop: '10px'
    },
    invited: {
      borderColor: '#2bc48c'
    }
  })
)

const VacancySmallCard = props => {
  const { classes, data, invited } = props
  const title = loGet(data, 'title')
  const name = loGet(data, 'owner.title')
  const image = loGet(data, 'owner.logo.file') || Image
  const currency = loGet(data, 'currency.name')
  const from = loGet(data, 'salaryFrom')
  const to = loGet(data, 'salaryTo')
  const companyIsApproved = loGet(data, ['owner', 'generalStatus']) === 'moderated'
  const salary = getVacancySalary(from, to, currency, 'main_resume_salary_no')
  return (
    <div className={classNames(classes.vacancySmall,
      { [classes.invited]: invited }
    )}>
      <div className={classes.image} style={{ backgroundImage: 'url(' + image + ')' }}/>
      <div className={classes.body}>
        <div className={classes.header}>{title}</div>
        <CompanyName isApproved={companyIsApproved} name={name}/>
        <div className={classes.salary}>{salary}</div>
      </div>
    </div>
  )
}

VacancySmallCard.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object,
  invited: PropTypes.bool
}

export default enhance(VacancySmallCard)
