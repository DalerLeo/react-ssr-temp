import loGet from 'lodash/get'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import sprintf from 'sprintf'
import {
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_COLOR, LABEL_COLOR,
  LIGHT_GREY_BORDER_STYLE,
  MAIN_COLOR,
  ROLL_UP_FADE_IN
} from 'constants/styles'
import { getEmpTypeValue, LANG_LEVEL } from 'constants/backend'
import { SERVICE_ITEM_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import { getExperience } from 'helpers/get'
import t, { getTranslate } from 'helpers/translate'
import Diamond from 'icons/Diamond'
import RenderOrNull from 'components/Utils/RenderOrNull'
import T from 'components/T'
import TW from 'components/TW'
import HtmlContent from 'components/HtmlContent'
import Container from 'components/Container'
import Title from 'components/Title'
import { CardList, APP } from 'components/Cards'
import { SideBanner } from 'components/Banners'
import { Button, YELLOW } from 'components/Button'
import SectionList from './SectionList'
import DetailHeader from './DetailHeader'
import NotesComponent from './NotesComponent'
import PrintActions from './PrintActions'
import InviteDialog from './InviteDialog'

const enhance = compose(
  withState('openDialog', 'setOpenDialog', false),
  injectSheet({
    ...ROLL_UP_FADE_IN,
    container: {
      ...fallbacksStyle('display', 'flex'),
      paddingBottom: '75px',
      marginTop: '50px'
    },
    wrapper: {
      ...crossBrowserify('flexGrow', '1'),
      marginRight: '44px',
      animationName: 'rollUpFadeIn',
      animationDuration: '1s'
    },
    right: {
      width: '240px'
    },
    header: {
      position: 'relative',
      marginBottom: '24px',
      paddingBottom: '25px',
      '&::after': {
        position: 'absolute',
        content: '""',
        bottom: '0',
        left: '0',
        display: 'inline-block',
        width: '100%',
        height: '1px',
        backgroundColor: hexToRgb(FIELD_BORDER_COLOR, '0.3')
      }
    },
    salary: {
      lineHeight: '1.38',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '18px'
    },
    address: {
      marginBottom: '32px'
    },
    flex: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between')

    },
    flexStart: {
      extend: 'flex',
      ...crossBrowserify('alignItems', 'unset')
    },
    titleWrap: {
      marginBottom: '12px'
    },
    title: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center')
    },
    status: {
      border: '1px solid',
      borderRadius: '6px',
      color: LABEL_COLOR,
      fontSize: '13px',
      marginLeft: '10px',
      padding: '2px 10px'
    },
    workStatus: {
      ...crossBrowserify('borderRadius', '4px'),
      border: '1px solid',
      color: MAIN_COLOR,
      fontSize: '13px',
      fontWeight: '500',
      lineHeight: '20px',
      padding: '0 8px'
    },
    date: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      color: '#818181',
      fontSize: '13px',
      marginBottom: '10px',
      '& > svg': {
        fontSize: '16px',
        marginRight: '3px'
      }
    },
    shortInfo: {
      ...fallbacksStyle('display', 'flex')
    },
    shortItem: {
      borderRight: LIGHT_GREY_BORDER_STYLE,
      paddingRight: '40px',
      marginRight: '40px',
      '&:last-child': { borderRight: 'none' }
    },
    shortDesc: {
      fontSize: '15px',
      lineHeight: '1.47'
    },
    shortLabel: {
      extend: 'shortDesc',
      color: '#9f9f9f',
      marginBottom: '6px'
    },
    contacts: {
      background: '#F6F6F7',
      padding: '30px',
      marginBottom: '35px'
    },
    contactsTitle: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '25px'
    },
    contactsName: {
      fontSize: '15px',
      fontWeight: '500',
      marginBottom: '10px'
    },
    contactsEmail: {
      color: MAIN_COLOR,
      fontWeight: '500',
      '& span': {
        marginRight: '15px'
      }
    },
    contactsService: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      background: 'rgba(255, 211, 103, 0.04)',
      border: '1px solid #FFD257',
      borderRadius: '4px',
      padding: '16px 25px',
      marginBottom: '36px'
    },
    diamond: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      ...crossBrowserify('borderRadius', '50%'),
      background: '#f9fafb',
      height: '64px',
      width: '64px'
    },
    serviceTitle: {
      fontSize: '15px',
      lineHeight: '19px',
      marginBottom: '8px'
    },
    section: {
      padding: '5px 0 40px',
      '& > div': {
        marginTop: '18px'
      }
    },
    addInfo: {
      fontSize: '15px',
      lineHeight: '1.67'
    },
    important: {
      extend: 'addInfo',
      fontWeight: '500'

    },
    btnWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      '&:not(:last-child)': {
        borderBottom: '1px solid',
        borderBottomColor: hexToRgb(FIELD_BORDER_COLOR, '0.3'),
        paddingBottom: '40px',
        marginBottom: '30px'
      }
    },
    btnFav: {
      padding: '0 33px',
      '& svg': {
        marginRight: '5px'
      }
    },
    btn: {
      padding: '0 50px',
      marginRight: '16px'
    },
    btnInfo: {
      color: '#9a9a9a',
      lineHeight: '22px',
      width: '300px'
    },
    skillTitle: {
      fontWeight: '500',
      marginBottom: '7px'
    },
    skillContent: {
      lineHeight: '1.67',
      fontSize: '15px',
      marginBottom: '25px'
    },
    computerSKills: {
      marginBottom: '-10px'
    },
    skillChip: {
      borderRadius: '20px',
      background: '#eef1f6',
      display: 'inline-block',
      padding: '2px 15px',
      margin: '0 10px 10px 0'
    },
    skillLicense: {
      extend: 'skillContent',
      marginBottom: '0'
    },
    photoWrapper: {
      textAlign: 'right'
    },
    topButtons: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center')
    },
    iconBtn: {
      marginLeft: '10px'
    }
  })
)

const EXP_KEYS = { desc: 'duties', name: 'organization', 'title': 'speciality.name' }
const EDU_KEYS = { desc: 'faculty', name: 'institution.name', 'title': 'speciality' }

const ResumeDetails = props => {
  const {
    history,
    classes,
    resumeDetail,
    resumeList,
    onComment,
    commentList,
    onAllComment,
    userData,
    isAuth,
    isEmployer,
    isApplicant,
    favLoading,
    commentLoading,
    onFav,
    onRate,
    inviteData,
    onDownload
  } = props

  const data = loGet(resumeDetail, 'data')
  const loading = loGet(resumeDetail, 'loading')

  const experiences = loGet(data, 'experiences')
  const educations = loGet(data, 'educations')
  const languageSkills = loGet(data, 'languageSkills')
  const computerKnowledge = fp.flow(
    fp.get('computerKnowledge'),
    fp.split(', '),
    fp.filter(item => item)
  )(data)
  const driverLicences = fp.flow(fp.get('driverLicences'), fp.map(fp.get('title')), fp.join(', '))(data)
  const hobbies = loGet(data, 'hobbies')
  const isFav = loGet(data, 'isFavorite')
  const isInvited = loGet(data, 'isInvited')
  const additionalInfo = loGet(data, 'additionalInfo')
  const exp = loGet(data, 'workExperience')
  const skills = !fp.isEmpty(languageSkills) || !fp.isEmpty(computerKnowledge) || !fp.isEmpty(driverLicences)
  const wishedSphere = loGet(data, 'wishedIndustriesParent')

  const applicantFullName = loGet(data, 'owner.fullName')
  const applicantEmail = loGet(data, 'owner.email')
  const applicantPhone = loGet(data, 'owner.phone')

  const canSeeButtons = isAuth && isEmployer
  const hasAccessToDatabase = Boolean(applicantFullName) && canSeeButtons

  const onOpenLoginDialog = () => {
    history.replace(history.location.pathname, {
      openLoginDialog: true
    })
  }

  const onOpenInvite = () => {
    if (isEmployer) return inviteData.onOpen()
    return onOpenLoginDialog()
  }

  const onAddToFavorite = () => {
    if (isEmployer) return onFav()
    return onOpenLoginDialog()
  }

  return (
    <Container className={classes.container}>
      <div className={classes.wrapper}>
        <DetailHeader
          history={history}
          data={data}
          loading={loading}
          classes={classes}
          userId={loGet(userData, 'id')}
          isEmployer={isEmployer}
          isApplicant={isApplicant}
          isFav={isFav}
          favLoading={favLoading}
          onAddToFavorite={onAddToFavorite}
          onOpenInvite={onOpenInvite}
          onRate={onRate}
          isInvited={isInvited}
          onDownload={onDownload}
        />
        {hasAccessToDatabase
          ? <div className={classes.contacts}>
            <div className={classes.contactsTitle}><T>resume_contact_info</T></div>
            <div className={classes.contactsName}>{applicantFullName}</div>
            <div className={classes.contactsEmail}>
              <span>{applicantEmail}</span>
              <span>{applicantPhone}</span>
            </div>
          </div>
          : <div className={classes.contactsService}>
            <div className={classes.diamond}>
              <Diamond/>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '16px', maxWidth: '300px' }}>
              <div className={classes.serviceTitle}><T>main_serv_db_title</T></div>
              <div style={{ fontSize: '13px', lineHeight: '21px' }}>
                <T>main_serv_db_desc</T>
              </div>
            </div>
            <Button
              color={YELLOW}
              style={{ padding: '0 56px', marginLeft: '106px' }}
              text={'button_show_contact'}
              type={'small'}
              onClick={() => {
                window.open(sprintf(SERVICE_ITEM_URL, 'database'), '_blank')
              }}
            />
          </div>}
        <div className={classes.shortInfo}>
          <div className={classes.shortItem}>
            <div className={classes.shortLabel}><T>main_work_experience</T></div>
            <div className={classes.shortDesc}>
              <TW>{lang => getExperience(exp, lang)}</TW>
            </div>
          </div>
          <div className={classes.shortItem}>
            <div className={classes.shortLabel}><T>main_schedule</T></div>
            <div className={classes.shortDesc}>
              <TW>
                {lang => fp.flow(
                  fp.map(getEmpTypeValue),
                  fp.map(item => t(item, lang)),
                  fp.join('; ')
                )(loGet(data, 'employmentType'))}
              </TW>
            </div>
          </div>
        </div>

        <div className={classes.content}>
          <div className={classes.section}>
            <RenderOrNull value={wishedSphere}>
              <SectionList title={'main_wishes'}>
                <TW>
                  {lang => (
                    <React.Fragment>
                      <div className={classes.skillTitle}>{getTranslate(wishedSphere, lang)}</div>
                      <div>
                        {fp.flow(
                          fp.get('wishedIndustries'),
                          fp.map(item => getTranslate(item, lang)),
                          fp.join(', ')
                        )(data)}
                      </div>
                    </React.Fragment>
                  )}
                </TW>
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={experiences}>
              <SectionList
                list={experiences}
                keys={EXP_KEYS}
                title={'main_work_experience'}
              />
            </RenderOrNull>
            <RenderOrNull value={educations}>
              <SectionList
                list={educations}
                keys={EDU_KEYS}
                title={'main_education'}
                isEducation={true}
              />
            </RenderOrNull>

            <RenderOrNull value={skills}>
              <SectionList title={'main_skills'}>
                <RenderOrNull value={languageSkills}>
                  <div className={classes.skillContent}>
                    <div className={classes.skillTitle}><T>main_language_knowledge</T>:</div>
                    <TW>
                      {lang => fp.map(item => {
                        const langName = fp.get('language.name', item)
                        const langLevel = fp.get(fp.get('level', item), LANG_LEVEL)
                        return (
                          <div key={langName}>{langName} ({t(langLevel, lang)})</div>
                        )
                      }, languageSkills)}
                    </TW>
                  </div>
                </RenderOrNull>
                <RenderOrNull value={computerKnowledge}>
                  <div className={classes.skillContent}>
                    <div className={classes.skillTitle}><T>main_programm_knowledge</T>:</div>
                    <div className={classes.computerSKills}>
                      {loMap(computerKnowledge, (item, index) => {
                        return <div key={index} className={classes.skillChip}>{item}</div>
                      })}
                    </div>
                  </div>
                </RenderOrNull>
                <RenderOrNull value={driverLicences}>
                  <div className={classes.skillLicense}>
                    <div className={classes.skillTitle}><T>main_driver_license</T>:</div>
                    {driverLicences}
                  </div>
                </RenderOrNull>
              </SectionList>
            </RenderOrNull>

            <RenderOrNull value={hobbies}>
              <SectionList title={'main_hobby'}>
                <div className={classes.skillContent}>
                  <HtmlContent>{hobbies}</HtmlContent>
                </div>
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={additionalInfo}>
              <SectionList title={'main_additional_info'}>
                <div className={classes.skillContent}>
                  <HtmlContent>{additionalInfo}</HtmlContent>
                </div>
              </SectionList>
            </RenderOrNull>
          </div>

          {canSeeButtons && !isInvited &&
          <div className={classes.btnWrap}>
            <Button
              onClick={onOpenInvite}
              className={classes.btn}
              text={'button_to_invite'}
              type={'medium'}
            />
            <div className={classes.btnInfo}>
              <T>main_to_invite_desc</T>
            </div>
          </div>}

          <RenderOrNull value={resumeList.data}>
            <Title isStatic={true} medium={true} text={'resume_similar_list'}/>
            <CardList
              smooth={true}
              type={APP}
              data={resumeList}
              span={12}
              gutter={20}
              marginBottom={'20px'}
            />
          </RenderOrNull>
        </div>
      </div>
      <div className={classes.right}>
        {isEmployer && <NotesComponent
          loading={commentLoading}
          commentList={commentList}
          onAllComment={onAllComment}
          onComment={onComment}
        />}
        {false && <PrintActions/>}
        <SideBanner/>
      </div>

      <RenderOrNull value={isEmployer}>
        <InviteDialog
          open={inviteData.open}
          onClose={inviteData.onClose}
          onSubmit={inviteData.onSubmit}
        />
      </RenderOrNull>
    </Container>
  )
}

ResumeDetails.propTypes = {
  id: PropTypes.number,
  history: PropTypes.object,
  classes: PropTypes.object,
  userData: PropTypes.object,
  isEmployer: PropTypes.bool,
  isApplicant: PropTypes.bool,
  isAuth: PropTypes.bool,
  resumeList: PropTypes.object,
  onComment: PropTypes.func.isRequired,
  onFav: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onAllComment: PropTypes.func.isRequired,
  resumeDetail: PropTypes.object.isRequired,
  commentList: PropTypes.object.isRequired,
  favLoading: PropTypes.bool,
  commentLoading: PropTypes.bool,
  inviteData: PropTypes.object
}

export default enhance(ResumeDetails)
