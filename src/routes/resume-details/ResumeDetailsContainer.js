import {
  pure,
  compose,
  mapPropsStream,
  withState,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import fp from 'lodash/fp'
import sprintf from 'sprintf'
import { RESUME_DOWNLOAD } from 'constants/api'
import {
  getItemStateData,
  getStateData,
  getStateLoading
} from 'helpers/get'
import setGlobalLoader from 'helpers/setGlobalLoader'
import withHistory from 'helpers/withHistory'
import { setPageTitle } from 'helpers/dom'
import paramsToQuery from 'helpers/paramsToQuery'
import toBoolean from 'helpers/toBoolean'
import toast from 'helpers/toast'
import {
  resumeFetchItem,
  resumeActiveList,
  resumeCommentCreate,
  resumeCommentList,
  resumeFavCreate,
  resumeFavDelete,
  rateApplicantAction,
  sendInviteAction,
  downloadResumeAction
} from './actions'
import ResumeDetails from './ResumeDetails'
import { getCookieToken } from 'helpers/getCookieToken'
import getDocument from 'helpers/getDocument'

const isTemp = fp.flow(
  fp.get('history.location.search'),
  paramsToQuery,
  fp.get('isTemp'),
  toBoolean
)
const mapStateToProps = (state) => {
  return {
    ...getItemStateData('resume.item', 'resume', state),
    ...getStateData('resume.list', 'resume', state),
    ...getStateData('comment.list', 'comment', state),
    ...getStateLoading('resume.favCreate', 'fav', state),
    ...getStateLoading('comment.create', 'comment', state)
  }
}

const mapDispatchToProps = {
  resumeFetchItem,
  resumeActiveList,
  setGlobalLoader,
  resumeCommentCreate,
  resumeCommentList,
  resumeFavCreate,
  resumeFavDelete,
  rateApplicantAction,
  sendInviteAction,
  downloadResumeAction
}

export default compose(
  withHistory,
  withState('openInvite', 'setOpenInvite', false),
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(fp.get('id'))
      .distinctUntilChanged(null, fp.get('id'))
      .subscribe(props => {
        props.isEmployer && props.resumeCommentList({ resume: props.id })
        props.setGlobalLoader(true)
        return props.resumeFetchItem(props.id, isTemp(props))
          .then(({ value }) => {
            const resumeTitle = fp.get('title', value)
            setPageTitle(resumeTitle, props.isServer)
            props.setGlobalLoader(false)
            const specialities = fp.flow(
              fp.get('wishedIndustries'),
              fp.map(fp.get('id')),
              fp.join('-')
            )(value)
            specialities && props.resumeActiveList({
              pageSize: 8,
              specialities,
              exclude: value.id
            })
          })
      })

    const { handler: onComment, stream: onComment$ } = createEventHandler()
    const { handler: onAllComment, stream: onAllComment$ } = createEventHandler()
    const { handler: onFav, stream: onFav$ } = createEventHandler()
    const { handler: onRate, stream: onRate$ } = createEventHandler()
    const { handler: onInvite, stream: onInvite$ } = createEventHandler()
    const { handler: onDownload, stream: onDownload$ } = createEventHandler()

    onComment$.withLatestFrom(props$)
      .subscribe(([value, props]) => {
        props.resumeCommentCreate(value, props.id)
          .then(() => props.resumeCommentList({ resume: props.id }))
        return true
      })

    onAllComment$.withLatestFrom(props$)
      .subscribe(([value, props]) => {
        return props.resumeCommentList({ resume: props.id, pageSize: '1000' })
      })

    onFav$.withLatestFrom(props$)
      .subscribe(([, { id, resumeDetail, ...props }]) => {
        const isFav = fp.get('data.isFavorite', resumeDetail)
        if (isFav) {
          return props.resumeFavDelete(id)
            .then(() => props.resumeFetchItem(id))
            .then(() => props.actionSuccess())
        }

        return props.resumeFavCreate(id)
          .then(() => props.resumeFetchItem(id))
          .then(() => props.actionSuccess())
      })

    onRate$.withLatestFrom(props$)
      .subscribe(([value, props]) => {
        const resumeId = fp.toInteger(props.id)
        const { applicant, rate } = value
        props.rateApplicantAction(applicant, rate)
          .then(() => props.resumeFetchItem(resumeId))
      })

    onInvite$.withLatestFrom(props$)
      .subscribe(([message, { id, setOpenInvite, ...props }]) => {
        const resume = fp.toInteger(id)
        props.sendInviteAction(resume, message)
          .then(() => {
            toast({
              title: 'Отправлено',
              message: 'Ваше приглашение отправлено соискателю'
            })
            setOpenInvite(false)
            props.resumeFetchItem(resume)
          })
      })

    onDownload$.withLatestFrom(props$)
      .subscribe(([format, props]) => {
        const resume = fp.toInteger(props.id)
        getDocument(sprintf(RESUME_DOWNLOAD, resume, format))
        // Props.downloadResumeAction(resume, format, token)
      })

    return props$.combineLatest(({ openInvite, setOpenInvite, ...props }) => {
      const inviteData = {
        open: openInvite,
        onOpen: () => setOpenInvite(true),
        onClose: () => setOpenInvite(false),
        onSubmit: onInvite
      }

      return {
        ...props,
        onComment,
        onAllComment,
        onFav,
        onRate,
        inviteData,
        onDownload
      }
    })
  }),
  pure
)(ResumeDetails)
