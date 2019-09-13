import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import injectSheet from 'react-jss'
import sprintf from 'sprintf'
import { RESUME_ITEM, SEARCH_RESULTS_URL, VACANCY_CREATE_URL } from 'constants/routes'
import { ANCHOR_DISABLED, LABEL_COLOR } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import { getExperience } from 'helpers/get'
import { getTranslate } from 'helpers/translate'
import FavVacancy from 'icons/FavVacancy'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import T from 'components/T'
import TW from 'components/TW'
import Link from 'components/Link'
import ProfilePic from 'components/ProfilePic'
import CardRating from 'components/Cards/CardRating'

const withStyles = injectSheet({
  resumes: {
    boxShadow: '0 5px 12px 2px rgba(0, 0, 0, 0.04)',
    borderRadius: '4px',
    padding: '36px 30px 40px',
    marginBottom: '25px'
  },
  vacancyCard: {
    ...ANCHOR_DISABLED,
    background: hexToRgb('#eef1f6', '0.42'),
    border: 'solid 1px',
    borderColor: hexToRgb('#d7dbe1', '0.42'),
    borderRadius: '4px',
    display: 'block',
    height: '100%',
    padding: '20px',
    paddingBottom: '12px',
    position: 'relative'
  },
  resumeTitle: {
    marginTop: '8px',
    fontWeight: '500'
  },
  resumeLabel: {
    color: LABEL_COLOR,
    fontSize: '13px',
    lineHeight: 'normal',
    margin: '5px 0 8px'
  },
  emptyData: {
    fontSize: '15px',
    '& a': {
      color: '#8798ad',
      fontWeight: '500'
    }
  }
})

const favStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px'
}

const SuitableResumes = props => {
  const { classes, resumeData, titleClassName } = props

  const resumeList = fp.get('data.resumes', resumeData)
  const vacancyIndustries = fp.flow(fp.get('data.industries'), fp.join('-'))(resumeData)
  const resumeLoading = fp.get('loading', resumeData)
  const hasNoVacancies = fp.isEmpty(vacancyIndustries) && !resumeLoading

  return (
    <div className={classes.resumes}>
      <div className={titleClassName}>
        <span><T>emp_selection_of_specialists</T></span>
        {!hasNoVacancies &&
        <Link to={{ pathname: SEARCH_RESULTS_URL, search: `type=resume&industries=${vacancyIndustries}` }}>
          <T>button_all_aplicants</T>
        </Link>}
      </div>
      {hasNoVacancies
        ? <div className={classes.emptyData}>
          <div>У вас нет активных вакансий. Перейти к <Link to={VACANCY_CREATE_URL}>созданию вакансии</Link></div>
        </div>
        : <Row type={'flex'} gutter={20}>
          <TW>
            {lang => fp.map(resume => {
              const id = fp.get('id', resume)
              const title = fp.get('title', resume)
              const photo = fp.get('owner.photo.file', resume)
              const experience = fp.get('workExperience', resume)
              const livingPlace = fp.get('owner.livingPlace', resume)
              return (
                <Col span={6} key={id}>
                  <Link
                    to={sprintf(RESUME_ITEM, resume.id)}
                    className={classes.vacancyCard}>
                    <ProfilePic image={photo} type={'xs'}/>
                    <FavVacancy style={favStyle}/>
                    <CardRating/>
                    <div className={classes.resumeTitle}>{title}</div>
                    <div className={classes.resumeLabel}>
                      <T>main_work_experience</T>: {getExperience(experience, lang)}
                    </div>
                    <div className={classes.resumeLabel}>{getTranslate(livingPlace, lang)}</div>
                  </Link>
                </Col>
              )
            }, resumeList)}
          </TW>
        </Row>}
    </div>
  )
}

SuitableResumes.propTypes = {
  classes: PropTypes.object,
  resumeData: PropTypes.object,
  titleClassName: PropTypes.string
}

export default withStyles(SuitableResumes)
