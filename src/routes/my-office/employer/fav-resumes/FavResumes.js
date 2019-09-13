import React, { useState } from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fallbacksStyle,
  crossBrowserify,
  BLACK_COLOR,
  FIELD_BORDER_COLOR,
  FIELD_BORDER_STYLE,
  animationStyle
} from 'constants/styles'
import { SEARCH_RESULTS_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import t from 'helpers/translate'
import toast from 'helpers/toast'
import { sendInviteAction } from 'routes/resume-details/actions'
import { resumeFavListFetch } from 'routes/resume/actions'
import Container from 'components/Container'
import Title from 'components/Title'
import TW from 'components/TW'
import { CardList, APP_BIG } from 'components/Cards'
import Link from 'components/Link'
import EmptyState from 'components/EmptyState'
import Paginator from 'components/Pagination'
import SearchField from 'routes/user/components/SearchField'
import InviteDialog from 'routes/resume-details/InviteDialog'

const mapStateToProps = state => ({})

const enhance = compose(
  reduxForm({ form: 'VIPForm' }),
  connect(mapStateToProps, {
    sendInviteAction,
    resumeFavListFetch
  }),
  injectSheet({
    wrapper: {
      paddingBottom: '20px'
    },
    text: {
      color: hexToRgb(BLACK_COLOR, '0.6'),
      fontWeight: '300',
      fontStyle: 'italic',
      lineHeight: '1.64',
      position: 'relative',
      paddingBottom: '30px',
      marginBottom: '20px',
      borderBottom: FIELD_BORDER_STYLE,
      borderColor: hexToRgb(FIELD_BORDER_COLOR, '0.3')
    },
    title: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between')
    },

    fields: {
      ...fallbacksStyle('display', 'flex'),
      margin: '40px 0',
      '& > div': {
        marginRight: '20px'
      }
    }
  })
)

const FavResumes = props => {
  const { classes, resumeFilter, resumeList, onSearch, ...restProps } = props

  const [openInviteDialog, setOpenInviteDialog] = useState(false)
  const [inviteResume, setInviteResume] = useState(null)

  const onOpenInterviewDialog = id => {
    setOpenInviteDialog(true)
    setInviteResume(id)
  }

  const onCloseInviteDialog = () => {
    setOpenInviteDialog(false)
    setInviteResume(null)
  }

  const onSendInvite = message => {
    restProps.sendInviteAction(inviteResume, message)
      .then(() => toast({
        title: 'Отправлено',
        message: 'Ваше приглашение отправлено соискателю'
      }))
      .then(() => restProps.resumeFavListFetch())
      .then(() => onCloseInviteDialog())
  }

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <div className={classes.title}>
          <Title isStatic={true} isProfile={true} text={'menu_favorites_resume'}/>
          <TW>
            {lang => (
              <SearchField
                placeholder={t('main_search', lang)}
                type={'resume'}
                onChange={onSearch}
                style={{ margin: '0 0 16px' }}
              />
            )}
          </TW>
        </div>
        <TW>
          {lang => (
            <EmptyState
              data={resumeList.data}
              loading={resumeList.loading}>
              <div>На данный момент у вас нет сохраненных соискателей. <Link to={{
                pathname: SEARCH_RESULTS_URL,
                search: 'type=resume'
              }}>Начать поиск</Link></div>
            </EmptyState>
          )}
        </TW>
        <div>
          <CardList
            small={true}
            span={24}
            msgCount={true}
            favBtn={true}
            interviewBtn={true}
            data={resumeList}
            type={APP_BIG}
            onOpenInterview={onOpenInterviewDialog}
          />
        </div>
        <Paginator filter={resumeFilter}/>
      </div>

      <InviteDialog
        open={openInviteDialog}
        onClose={onCloseInviteDialog}
        onSubmit={onSendInvite}
      />
    </Container>
  )
}

FavResumes.propTypes = {
  classes: PropTypes.object,
  resumeFilter: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  resumeList: PropTypes.object.isRequired
}

export default enhance(FavResumes)
