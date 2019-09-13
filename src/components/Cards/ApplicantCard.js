import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import ProfilePic from 'components/ProfilePic'
import {
  crossBrowserify,
  fallbacksStyle,
  GREY_BORDER_STYLE,
  BLACK_COLOR,
  FADE_IN_ANIMATE, maxLineClamp
} from 'constants/styles'
import { RESUME_ITEM } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import t, { getTranslate } from 'helpers/translate'
import { getExperience, getSalaryCurrency } from 'helpers/get'
import sprintf from 'sprintf'
import RenderOrNull from 'components/Utils/RenderOrNull'
import Link from 'components/Link'
import T from 'components/T'
import TW from 'components/TW'
import CardRating from './CardRating'

const enhance = compose(
  injectSheet({
    resume: {
      ...fallbacksStyle('display', 'flex'),
      animationName: 'fadeIn',
      animationDuration: '2s',
      borderRadius: '4px',
      border: GREY_BORDER_STYLE,
      fontSize: '12px',
      overflow: 'hidden',
      height: '100%',
      width: '100%'
    },
    ...FADE_IN_ANIMATE,
    image: {
      padding: '0 20px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center')
    },

    body: {
      padding: '20px 13px 18px 0',
      position: 'relative',
      width: '100%'
    },

    header: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...maxLineClamp('2'),
      color: BLACK_COLOR,
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '22px',
      marginBottom: '3px'
    },

    desc: {
      overflow: 'hidden',
      lineHeight: '1.62',
      fontSize: '13px',
      color: hexToRgb(BLACK_COLOR, '0.7'),
      marginTop: '1px'
    },
    rating: {
      extend: 'desc',
      marginTop: '6px'
    }
  })
)

const ApplicantCard = ({ data, smooth, ...props }) => {
  const { classes } = props
  const id = _.get(data, 'id')
  const name = _.get(data, 'title')
  const photo = _.get(data, 'owner.photo.file')
  const rating = _.get(data, 'owner.rating')
  const livingPlace = _.get(data, 'owner.livingPlace')
  const wishedSalary = getSalaryCurrency(data)

  const experience = getExperience(_.get(data, 'workExperience'))
  return (
    <Link
      to={sprintf(RESUME_ITEM, id)}
      smooth={smooth}
      className={classNames(classes.resume)}>
      <div className={classes.image}>
        <ProfilePic type={'mini'} image={photo}/>
      </div>
      <div className={classes.body}>
        <div className={classes.header}>{name}</div>
        <div className={classes.desc}><T>main_work_experience</T>: {experience}</div>
        <RenderOrNull value={livingPlace}>
          <div className={classes.desc}>
            <TW>
              {lang => {
                const cityLabel = t('resume_city', lang)
                return `${cityLabel}: ${getTranslate(livingPlace, lang)}`
              }}
            </TW>
          </div>
        </RenderOrNull>
        <RenderOrNull value={wishedSalary}>
          <div className={classes.desc}><T>resume_wish_salary_short</T>: {wishedSalary}</div>
        </RenderOrNull>
        <CardRating rating={rating} style={{ marginTop: 7 }}/>
      </div>
    </Link>
  )
}

ApplicantCard.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object,
  smooth: PropTypes.bool

}

export default enhance(ApplicantCard)
