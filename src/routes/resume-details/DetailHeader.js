import React from 'react'
import fp from 'lodash/fp'
import loGet from 'lodash/get'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import sprintf from 'sprintf'
import { APPLICANT_STATUSES } from 'constants/backend'
import { RESUME_EDIT_VIEW } from 'constants/routes'
import dateFormat from 'helpers/dateFormat'
import t from 'helpers/translate'
import { getAgeFromDate, getSalaryCurrency } from 'helpers/get'
import Download from 'react-icons/lib/md/file-download'
import Print from 'react-icons/lib/md/print'
import TimeIcon from 'icons/Time'
import ProfilePic from 'components/ProfilePic'
import Tooltip from 'components/Tooltip'
import FavButton from 'components/Button/FavButton'
import IconButton from 'components/Button/IconButton'
import T from 'components/T'
import TW from 'components/TW'
import Title from 'components/Title'
import { Button } from 'components/Button'
import Rating from './Rating'

const appealStatuses = {
  'requested': 'applicant_vacancy_appeal_requested',
  'viewed': 'applicant_vacancy_appeal_viewed',
  'accepted': 'applicant_vacancy_appeal_accepted',
  'rejected': 'applicant_vacancy_appeal_rejected'
}

const DetailHeader = props => {
  const {
    classes,
    history,
    isEmployer,
    isApplicant,
    data,
    loading,
    userId,
    isFav,
    favLoading,
    onAddToFavorite,
    onOpenInvite,
    onRate,
    isInvited,
    onDownload
  } = props

  const id = loGet(data, 'id')
  const title = loGet(data, 'title')
  const appealStatus = loGet(appealStatuses, loGet(data, 'appealStatus'))
  const address = loGet(data, 'owner.livingPlace.name')
  const photo = loGet(data, 'owner.photo.file')
  const applicant = loGet(data, 'owner.id')
  const rating = loGet(data, 'owner.rating')
  const searchWorkStatus = loGet(data, 'owner.searchWorkStatus.id')
  const workStatus = fp.flow(
    fp.find({ id: fp.toString(searchWorkStatus) }),
    fp.get('name')
  )(APPLICANT_STATUSES)
  const travel = loGet(data, 'isReadyMove') && <T>resume_is_ready_move</T>
  const move = loGet(data, 'isReadyTravel') && <T>resume_is_ready_travel</T>
  const ownerId = loGet(data, 'owner.id')
  const modifDate = dateFormat(loGet(data, 'modifiedDate'))
  const salary = getSalaryCurrency(data)
  const applicantBirthdate = loGet(data, 'owner.birthdate')
  const isOwnResume = userId === ownerId && isApplicant

  const onEditResume = () => history.push(
    sprintf(RESUME_EDIT_VIEW, id, 'view')
  )

  return (
    <div className={classes.header}>
      <div className={classes.date}>
        <TimeIcon/>
        <T>main_update_date</T> {modifDate}
      </div>
      <div className={classNames(classes.flex, classes.titleWrap)}>
        <div className={classes.title}>
          <Title margin={'0'} text={title}/>
          {appealStatus && <span className={classes.status}><T>{appealStatus}</T></span>}
        </div>
        {workStatus && <span className={classes.workStatus}><T>{workStatus}</T></span>}
      </div>
      <div className={classes.flexStart}>
        <div>
          <div className={classes.salary}>{salary || <T>common_not_specified_a</T>}</div>
          <div className={classes.address}>
            <TW>{lang => getAgeFromDate(applicantBirthdate, lang)}</TW>, {address}, {travel} {move}
          </div>

          {isEmployer &&
          <div className={classes.topButtons}>
            <Button
              type={'small'}
              text={isInvited ? 'button_is_invited' : 'button_to_invite'}
              onClick={onOpenInvite}
              disabled={isInvited}
            />
            <FavButton
              onClick={onAddToFavorite}
              loading={favLoading}
              isFav={isFav}
            />
          </div>}
          {isOwnResume &&
          <div className={classes.topButtons}>
            <Button
              type={'small'}
              text={'main_global_edit'}
              onClick={onEditResume}
            />
            <TW>
              {lang => (
                <Tooltip text={t('button_resume_download', lang) + ' (PDF)'}>
                  <IconButton
                    className={classes.iconBtn}
                    icon={<Download/>}
                    onClick={() => onDownload('pdf')}
                  />
                </Tooltip>
              )}
            </TW>
            <TW>
              {lang => (
                <Tooltip text={t('button_resume_download', lang) + ' (DOC)'}>
                  <IconButton
                    className={classes.iconBtn}
                    icon={<Download/>}
                    onClick={() => onDownload('docx')}
                  />
                </Tooltip>
              )}
            </TW>
            <IconButton className={classes.iconBtn} icon={<Print/>}/>
          </div>}
        </div>
        <div className={classes.photoWrapper}>
          <ProfilePic image={photo} type={'mini'}/>
          <Rating
            loading={loading}
            canRate={isEmployer}
            applicant={applicant}
            rating={rating}
            onRate={onRate}
          />
        </div>
      </div>
    </div>
  )
}

DetailHeader.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isEmployer: PropTypes.bool,
  isApplicant: PropTypes.bool,
  data: PropTypes.object,
  loading: PropTypes.bool,
  userId: PropTypes.number,
  isFav: PropTypes.bool,
  favLoading: PropTypes.bool,
  onAddToFavorite: PropTypes.func,
  onOpenInvite: PropTypes.func,
  onRate: PropTypes.func,
  isInvited: PropTypes.bool
}

export default DetailHeader
