import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import * as sprintf from 'sprintf'
import {
  ANCHOR_DISABLED,
  FIELD_BORDER_STYLE_OPACITY,
  MAIN_COLOR
} from 'constants/styles'
import { VACANCY_EDIT_VIEW, SEARCH_RESULTS_URL } from 'constants/routes'
import { Button, COLD, YELLOW, REGRET_BORDERED } from 'components/Button'
import Link from 'components/Link'
import T from 'components/T'
import Dialog from 'components/Dialog'
import VacancyAppeals from 'routes/user/components/VacancyAppeals'
import VacancyStats from 'routes/user/components/VacancyStats'
import ActivateDialog from './ActivateDialog'
import DeleteDialog from './DeleteDialog'

const enhance = injectSheet({
  actionWrap: {
    paddingLeft: '28px',
    width: '241px',
    marginTop: '80px'
  },
  editAll: {
    display: 'block',
    ...ANCHOR_DISABLED,
    color: MAIN_COLOR,
    marginBottom: '20px',
    fontWeight: '500',
    '&:hover': {
      color: MAIN_COLOR
    }
  },
  label: {
    marginTop: '10px',
    color: '#9A9A9A',
    fontSize: '13px'
  },
  line: {
    marginTop: '25px',
    paddingTop: '18px',
    borderTop: '1px solid #EEEFF2'
  },
  stats: {
    borderTop: FIELD_BORDER_STYLE_OPACITY,
    borderBottom: FIELD_BORDER_STYLE_OPACITY,
    margin: '25px 0',
    padding: '25px 0'
  },
  stat: {
    cursor: 'pointer',
    fontWeight: '500',
    lineHeight: '22px',
    marginBottom: '25px',
    '& > div': {
      borderBottom: '1px dashed #A1A7B3',
      display: 'inline-block'
    },
    '&:last-child': {
      marginBottom: '0'
    }
  },
  statLabel: {
    color: '#9A9A9A'
  },
  statCount: {
    marginLeft: '5px',
    color: MAIN_COLOR
  },
  statNewCount: {
    marginLeft: '5px'
  },
  archiveComment: {
    fontSize: '13px'
  },

  dialogWrap: {
    padding: '50px 60px',
    margin: '0 auto',
    background: '#F6F7F9'
  }
})

const VacancyActions = props => {
  const {
    classes,
    history,
    details,
    onOpenPromo,
    onOpenArchive,
    vacacncyAppealData,
    onActivate,
    onDelete,
    servicesList
  } = props

  const [openViews, setOpenViews] = useState(false)
  const [openActivateDialog, setOpenActivateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const onOpenViews = () => setOpenViews(true)
  const onCloseViews = () => setOpenViews(false)

  const onOpenActivate = () => setOpenActivateDialog(true)
  const onCloseActivate = () => setOpenActivateDialog(false)

  const onOpenDelete = () => setOpenDeleteDialog(true)
  const onCloseDelete = () => setOpenDeleteDialog(false)

  const id = fp.get('id', details)
  if (!id) return null

  const isActive = fp.get('isActive', details)
  const isTemp = fp.get('isTemp', details)
  const archiveComment = fp.get('archiveComment', details)
  const totalViews = fp.get('totalViews', details)
  const totalAppeals = fp.get('totalAppeals', details)
  const newAppealCount = fp.get('newAppealCount', details)
  const viewedAppeals = fp.get('viewedAppeals', details)
  const suitableResumesCount = fp.get('suitableResumesCount', details)
  const industry = fp.get('industry.id', details)

  const onSearchSuitableResumes = () => {
    history.push({
      pathname: SEARCH_RESULTS_URL,
      search: `type=resume&industries=${industry}`
    })
  }

  return (
    <div className={classes.actionWrap}>
      <Link
        to={sprintf(VACANCY_EDIT_VIEW, Number(id), 'edit')}
        className={classes.editAll}><T>button_edit_all</T></Link>
      {isActive
        ? <React.Fragment>
          <Button
            text={'vacancy_promotion'}
            type={'small'}
            color={YELLOW}
            fullWidth={true}
            onClick={onOpenPromo}
          />
          <div className={classes.label}><T>vacancy_promotion_desc</T></div>
        </React.Fragment>
        : <React.Fragment>
          <Button
            fullWidth={true}
            type={'small'}
            text={isTemp ? 'button_publish' : 'vacancy_republish'}
            style={{ border: 'none', marginBottom: '10px' }}
            color={COLD}
            onClick={onOpenActivate}
          />
          <Button
            fullWidth={true}
            type={'small'}
            text={'vacancy_delete'}
            color={REGRET_BORDERED}
            onClick={onOpenDelete}
          />
        </React.Fragment>}
      {!isTemp &&
      <div className={classes.stats}>
        <div className={classes.stat} onClick={onOpenViews}>
          <div>
            <span className={classes.statLabel}><T>menu_views</T>:</span>
            <span className={classes.statCount}>{totalViews}</span>
          </div>
        </div>
        <div className={classes.stat} onClick={vacacncyAppealData.onOpenAppeals}>
          <div>
            <span className={classes.statLabel}><T>menu_feedback</T>:</span>
            <span className={classes.statCount}>{totalAppeals}</span>
            {Boolean(newAppealCount) && <span className={classes.statNewCount}>+{newAppealCount}</span>}
          </div>
        </div>
        <div className={classes.stat} onClick={vacacncyAppealData.onOpenAppeals}>
          <div>
            <span className={classes.statLabel}><T>vacancy_resume_work</T>:</span>
            <span className={classes.statCount}>{viewedAppeals}</span>
          </div>
        </div>
        <div className={classes.stat} onClick={onSearchSuitableResumes}>
          <div>
            <span className={classes.statLabel}><T>vacancy_resume_need</T>:</span>
            <span className={classes.statCount}>{suitableResumesCount}</span>
          </div>
        </div>
      </div>}
      {isActive &&
      <React.Fragment>
        <Button
          text={'button_archive_move'}
          type={'small'}
          color={COLD}
          style={{ border: 'none' }}
          fullWidth={true}
          onClick={onOpenArchive}
        />
        <div className={classes.label}>
          <T>vacancy_archive_move_desc</T>
        </div>
      </React.Fragment>}

      <ActivateDialog
        open={openActivateDialog}
        handleClose={onCloseActivate}
        handleSubmit={onActivate}
        servicesList={servicesList}
      />

      <Dialog
        open={vacacncyAppealData.openAppeals}
        handleClose={vacacncyAppealData.onCloseAppeals}
        width={1000}>
        <div className={classes.dialogWrap}>
          <VacancyAppeals
            data={vacacncyAppealData.appealedResumeList}
            statusLoading={vacacncyAppealData.appealedChangeStatusLoading}
            countData={vacacncyAppealData.appealedCountDetail}
            onAppealedStatusChange={vacacncyAppealData.onAppealedStatusChange}
          />
        </div>
      </Dialog>

      <VacancyStats
        open={openViews}
        handleClose={onCloseViews}
        vacancy={id}
      />

      {(!isActive && !isTemp) && (
        <div className={classes.archiveComment}>
          <T>vacancy_archive_comment</T>: {archiveComment}
        </div>
      )}

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={onCloseDelete}
        handleSubmit={onDelete}
      />
    </div>
  )
}

VacancyActions.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  details: PropTypes.object,
  onOpenPromo: PropTypes.func.isRequired,
  onOpenArchive: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  servicesList: PropTypes.object.isRequired,
  vacacncyAppealData: PropTypes.object.isRequired

}

export default enhance(VacancyActions)
