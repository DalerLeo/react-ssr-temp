import React, { useState } from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import fp from 'lodash/fp'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import sprintf from 'sprintf'
import {
  VACANCY_EDIT_VIEW,
  SEARCH_RESULTS_URL
} from 'constants/routes'
import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  MAIN_COLOR,
  ANCHOR_DISABLED
} from 'constants/styles'
import dateFormat from 'helpers/dateFormat'
import InfoIcon from 'icons/Info'
import { Button, WHITE, YELLOW, REGRET } from 'components/Button'
import T from 'components/T'
import Link from 'components/Link'
import Dropdown from 'components/Dropdown'
import RenderOrNull from 'components/Utils/RenderOrNull'
import CompanyAddress from 'components/Cards/CompanyAddress'
import VacancyArchiveDialog from 'routes/vacancy-create/VacancyArchive'
import queryToParams from 'helpers/queryToParams'

const enhance = compose(
  injectSheet({
    wrapper: {
      backgroundColor: '#fff',
      overflow: 'hidden',
      borderRadius: '4px',
      border: 'solid 1px rgba(198, 203, 212, 0.65)',
      marginBottom: '20px',
      boxSizing: 'border-box',
      position: 'relative'
    },
    vacancyItem: {
      ...fallbacksStyle('display', 'flex')
    },
    vacancyContent: {
      padding: '18px 25px 0 30px',
      display: 'block',
      ...ANCHOR_DISABLED
    },
    vacancyTitle: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '1.38',
      marginBottom: '12px',
      position: 'relative'
    },
    mainResume: {
      color: MAIN_COLOR,
      fontSize: '14px'
    },
    stats: {
      marginTop: '12px',
      fontSize: '14px',
      lineHeight: '1.5',
      position: 'relative',
      display: 'inline-block',
      zIndex: '3',
      '& a': {
        borderBottom: 'dashed 1px #A1A7B3',
        color: '#A1A7B3',
        display: 'inline-block',
        '&:not(:last-child)': {
          marginRight: '50px'
        }
      },
      '& span': {
        fontWeight: '500',
        color: MAIN_COLOR,
        padding: '0 5px'
      },
      '& div': {
        display: 'inline-block',
        fontWeight: '500',
        color: BLACK_COLOR,
        padding: '0'
      }
    },
    noBorder: {
      border: 'none'
    },
    bottomButtons: {
      '& > button': {
        marginRight: '10px'
      }
    },
    footer: {
      padding: '0 25px 20px 30px',
      marginTop: '23px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('alignItems', 'center')
    },
    disabled: {
      pointerEvents: 'none'
    },

    servicesWrap: {
      fontSize: '14px',
      fontWeight: 'normal',
      marginLeft: '5px',
      zIndex: '4',
      '& > svg': {
        color: MAIN_COLOR,
        fontSize: '20px',
        '&:hover + $services': {
          opacity: '1',
          visibility: 'visible'
        }
      }
    },
    services: {
      ...crossBrowserify('boxShadow', '0px 5px 12px rgba(0, 0, 0, 0.14)'),
      ...crossBrowserify('transition', 'all 300ms'),
      ...crossBrowserify('borderRadius', '4px'),
      background: 'white',
      padding: '5px 15px',
      position: 'absolute',
      top: 'calc(100% + 10px)',
      opacity: '0',
      visibility: 'hidden'
    },
    service: {
      padding: '5px 0'
    },

    publicationDate: {
      fontSize: '13px'
    }
  })
)

const Resume = props => {
  const {
    classes,
    noBorder,
    data,
    onOpenViews,
    onOpenAppeals,
    onOpenPromote,
    onVacancyEdit
  } = props

  const id = fp.get('id', data)
  const title = fp.get('title', data)
  const isActive = fp.get('isActive', data)
  const generalStatus = fp.get('generalStatus', data)
  const activeServices = fp.get('activeServices', data)
  const industry = fp.get('industry.id', data)
  const isNotModerated = generalStatus !== 'moderated' && isActive
  const place = fp.get('place.nameRu', data)
  const publicationDate = fp.get('publicationDate', data)
  const totalViews = fp.get('totalViews', data) || '0'
  const suitableResumesCount = fp.get('suitableResumesCount', data) || '0'
  const newAppealCount = fp.get('newAppealCount', data)
  const viewedAppeals = fp.get('viewedAppeals', data) || '0'
  const totalAppeals = fp.get('totalAppeals', data) || '0'

  const suitableResumesPath = {
    pathname: SEARCH_RESULTS_URL,
    search: queryToParams({ type: 'resume', industries: industry })
  }

  const [vacancyId, setVacancyId] = useState(null)
  const [openArchiveDialog, setOpenArchiveDialog] = useState(false)

  const onOpenArchive = () => {
    setVacancyId(id)
    setOpenArchiveDialog(true)
  }

  const onCloseArchive = () => {
    setVacancyId(null)
    setOpenArchiveDialog(false)
  }

  const dropdownActions = [
    { text: 'button_archive_move', action: onOpenArchive }
  ]

  return (
    <div className={classNames({
      [classes.wrapper]: true,
      [classes.noBorder]: noBorder
    })}>
      <Link absolute={true} to={sprintf(VACANCY_EDIT_VIEW, id, 'view')}/>
      <div className={classes.vacancyContent}>
        <div className={classes.vacancyTitle}>
          {title}
          {!fp.isEmpty(activeServices) &&
          <div className={classes.servicesWrap}>
            <InfoIcon/>
            <div className={classes.services}>
              {fp.map(item => {
                const serviceId = fp.get('id', item)
                const serviceName = fp.get('name', item)
                return (
                  <div key={serviceId} className={classes.service}>{serviceName}</div>
                )
              }, activeServices)}
            </div>
          </div>}
          {isActive && <Dropdown actions={dropdownActions}/>}
        </div>
        <CompanyAddress name={place}/>
        {isActive
          ? <div className={classes.stats}>
            <Link to={'/'} onClick={onOpenViews(id)}>
              <T>menu_views</T>:<span>{totalViews}</span>
            </Link>
            <Link onClick={onOpenAppeals(id)} to={'/'}>
              <T>menu_feedback</T>:<span>{totalAppeals}</span>
            </Link>
            <Link onClick={onOpenAppeals(id)} to={'/'}>
              <T>vacancy_resume_work</T>: {(!newAppealCount && viewedAppeals !== 0) && <span>{viewedAppeals}</span>}
              {Boolean(newAppealCount) && <div>+{newAppealCount}</div>}
            </Link>
            <Link to={suitableResumesPath}>
              <T>vacancy_resume_need</T>:<span>{suitableResumesCount}</span>
            </Link>
          </div>
          : <div className={classes.stats}>Вы еще не опубликовали вакансию</div>}
      </div>
      <div className={classes.footer}>
        <div className={classes.bottomButtons}>
          {isActive && <Button
            text={'vacancy_promotion'}
            type={'small'}
            color={YELLOW}
            onClick={() => onOpenPromote(id)}
          />}
          <Button
            text={isActive ? 'main_global_edit' : 'button_continue_edit'}
            onClick={() => onVacancyEdit(id)}
            type={'small'}
            color={WHITE}
            bordered={true}
          />
        </div>
        {isNotModerated
          ? (
            <span className={classes.disabled}>
              <Button
                text={'emp_vacancy_waiting_moderation'}
                type={'small'}
                color={REGRET}
              />
            </span>
          )
          : isActive && (
            <div className={classes.publicationDate}>
              <T>main_published_date</T>: {dateFormat(publicationDate)}
            </div>
          )}
      </div>

      <RenderOrNull value={openArchiveDialog}>
        <VacancyArchiveDialog
          open={openArchiveDialog}
          handleClose={onCloseArchive}
          fetchOnSuccess={'list'}
          vacancy={vacancyId}
          withServices={!fp.isEmpty(activeServices)}
        />
      </RenderOrNull>
    </div>
  )
}
Resume.propTypes = {
  classes: PropTypes.object,
  noBorder: PropTypes.bool,
  onVacancyEdit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onOpenViews: PropTypes.func.isRequired,
  onOpenAppeals: PropTypes.func.isRequired,
  onOpenPromote: PropTypes.func.isRequired
}
export default enhance(Resume)
