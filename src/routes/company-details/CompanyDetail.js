import loGet from 'lodash/get'
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle,
  DATE_COLOR,
  ROLL_UP_FADE_IN,
  BLACK_COLOR,
  FIELD_BORDER_STYLE_OPACITY
} from 'constants/styles'
import dateFormat from 'helpers/dateFormat'
import t, { getTranslate } from 'helpers/translate'
import { isEmployer, isApplicant } from 'helpers/get'
import WebsiteIcon from 'icons/Website'
import T from 'components/T'
import TW from 'components/TW'
import Container from 'components/Container'
import Title from 'components/Title'
import CompanyAddress from 'components/Cards/CompanyAddress'
import Vacancies from 'components/HomePage/Vacancies'
import ProfilePic from 'components/ProfilePic'
import HtmlContent from 'components/HtmlContent'
import RenderOrNull from 'components/Utils/RenderOrNull'
import { Button, TRANSPARENT } from 'components/Button'
import FavButton from 'components/Button/FavButton'
import SectionList from './SectionList'
import AppealDialog from 'routes/vacancy-details/AppealDialog'

const enhance = compose(
  injectSheet({
    ...ROLL_UP_FADE_IN,
    wrapper: {
      padding: '53px 0 75px',
      maxWidth: '860px',
      animationName: 'rollUpFadeIn',
      animationDuration: '1s'
    },
    header: {
      position: 'relative',
      paddingBottom: '25px'
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
      marginBottom: '18px'
    },
    date: {
      color: DATE_COLOR,
      fontSize: '13px',
      whiteSpace: 'nowrap'
    },
    industry: {
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: '16px'
    },
    topButtons: {
      ...fallbacksStyle('display', 'flex'),
      marginTop: '32px'
    },
    companyLogo: {
      textAlign: 'right'
    },
    websiteWrap: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      marginTop: '3px',
      '& > svg': {
        fontSize: '18px',
        marginRight: '5px'
      }
    },
    website: {
      color: BLACK_COLOR + ' !important',
      cursor: 'pointer',
      fontSize: '13px',
      display: 'block',
      textAlign: 'right',
      textDecoration: 'underline !important',
      whiteSpace: 'nowrap'
    },
    content: {
      borderTop: FIELD_BORDER_STYLE_OPACITY,
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      padding: '35px 0 30px',
      marginBottom: '35px'
    },
    section: {

    },
    btnWrap: {

    },
    btn: {
      padding: '0 50px',
      marginRight: '20px'
    },
    btnInfo: {
      display: 'inline-block',
      color: '#9a9a9a',
      lineHeight: '45px',
      marginLeft: '16px'
    }
  })
)

const checkWebsiteProtocol = (website) => {
  if (!website) return ''
  const protocol = 'http://'
  const hasProtocol = website.match(/^[a-zA-Z]+:\/\//)
  return hasProtocol ? website : protocol + website
}

const CompanyDetail = props => {
  const {
    classes,
    history,
    employerDetail,
    vacancyList,
    userData,
    openAppeal,
    setOpenAppeal,
    onAppeal,
    onToggleFavorite
  } = props
  // .const loading = loGet(vacancyDetail, 'loading')

  const onOpenAppeal = () => setOpenAppeal(true)
  const onCloseAppeal = () => setOpenAppeal(false)

  const canSeeButtons = !isEmployer(userData)
  const canInteractButtons = isApplicant(userData)

  const onOpenLoginDialog = () => {
    history.replace(history.location.pathname, {
      openLoginDialog: true
    })
  }

  const data = loGet(employerDetail, 'data')
  const title = loGet(data, 'title')
  const phone = loGet(data, 'phone')
  const extraPhone = loGet(data, 'extraPhone')
  const logo = loGet(data, 'logo.file')
  const siteUrl = loGet(data, 'siteUrl')
  const industry = loGet(data, 'industry')
  const desc = loGet(data, 'description')
  const trademark = loGet(data, 'trademark')
  const createdDate = dateFormat(loGet(data, 'createdDate'))
  const foundDate = loGet(data, 'foundationDate')
  const foundationDate = moment(foundDate).format('YYYY')
  const address = loGet(data, 'address')
  const staffSize = loGet(data, 'staffSize')
  const isFavorite = loGet(data, 'isFavorite')
  const vacancyCount = loGet(data, 'vacancyCount')

  const onClickFavorite = () => {
    onToggleFavorite(!isFavorite)
  }

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classNames(classes.flex, classes.titleWrap)}>
            <Title margin={'0'} text={title}/>
            <div className={classes.date}><T>emp_company_profile_created</T> {createdDate}</div>
          </div>

          <div className={classes.flexStart}>
            <div>
              <div className={classes.industry}>
                <TW>{lang => getTranslate(industry, lang)}</TW>
              </div>
              <CompanyAddress name={address}/>
              {canSeeButtons &&
              <div className={classes.topButtons}>
                <Button
                  type={'small'}
                  text={'button_work_here'}
                  onClick={canInteractButtons ? onOpenAppeal : onOpenLoginDialog}
                />
                <FavButton
                  isFav={isFavorite}
                  onClick={canInteractButtons ? onClickFavorite : onOpenLoginDialog}
                />
              </div>}
            </div>
            <div className={classes.companyLogo}>
              <ProfilePic image={logo} type={'mini'}/>
              {siteUrl && (
                <div className={classes.websiteWrap}>
                  <WebsiteIcon />
                  <a
                    href={checkWebsiteProtocol(siteUrl)}
                    target={'_blank'}
                    className={classes.website}>
                    {siteUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={classes.content}>
          <div className={classes.section}>
            <Title isStatic={true} medium={true} text={'company_info'}/>
            <RenderOrNull value={trademark}>
              <SectionList title={'company_trademark'}>
                {trademark}
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={foundDate}>
              <SectionList title={'company_est_year'}>
                {foundationDate}
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={staffSize}>
              <SectionList title={'company_staff_count'}>
                {staffSize}
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={phone || extraPhone}>
              <SectionList title={'company_phone'}>
                {phone && <div>{phone}</div>}
                {extraPhone && <div>{extraPhone}</div>}
              </SectionList>
            </RenderOrNull>
            <RenderOrNull value={desc}>
              <SectionList title={'company_about'}>
                <HtmlContent>{desc}</HtmlContent>
              </SectionList>
            </RenderOrNull>
          </div>
          {canInteractButtons &&
          <div className={classes.btnWrap}>
            <Button
              className={classes.btn}
              text={isFavorite ? 'button_remove_favorite' : 'button_add_favorite'}
              type={'medium'}
              bordered={true}
              color={TRANSPARENT}
              onClick={canInteractButtons ? onClickFavorite : onOpenLoginDialog}
            />
            <Button
              className={classes.btn}
              onClick={canInteractButtons ? onOpenAppeal : onOpenLoginDialog}
              text={'button_work_here'}
              type={'medium'}
            />
          </div>}
        </div>
        <RenderOrNull value={vacancyList.data}>
          <TW>
            {lang => (
              <Vacancies
                smooth={true}
                value={'vacancy'}
                data={vacancyList}
                title={t('company_vacancies', lang) + ` (${vacancyCount})`}
                showMoreButton={false}
                isStaticTitle={false}
              />
            )}
          </TW>
        </RenderOrNull>
      </div>

      <RenderOrNull value={openAppeal}>
        <AppealDialog
          open={openAppeal}
          onAppeal={onAppeal}
          onClose={onCloseAppeal}
          wantToWork={true}
        />
      </RenderOrNull>
    </Container>
  )
}

CompanyDetail.propTypes = {
  id: PropTypes.number,
  classes: PropTypes.object,
  history: PropTypes.object,
  userData: PropTypes.object,
  vacancyList: PropTypes.object.isRequired,
  employerDetail: PropTypes.object.isRequired,
  openAppeal: PropTypes.bool,
  setOpenAppeal: PropTypes.func,
  onAppeal: PropTypes.func,
  onToggleFavorite: PropTypes.func
}

export default enhance(CompanyDetail)
