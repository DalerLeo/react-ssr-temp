import React from 'react'
import moment from 'moment'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import {
  crossBrowserify,
  fallbacksStyle,
  LABEL_COLOR,
  FIELD_BORDER_STYLE_OPACITY
} from 'constants/styles'
import { EDUCATION } from 'constants/backend'
import { getWithBR } from 'helpers/get'
import t, { getTranslate } from 'helpers/translate'
import HtmlContent from 'components/HtmlContent'
import T from 'components/T'
import TW from 'components/TW'

const style = {
  title: {
    lineHeight: '22px',
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '20px',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    ...crossBrowserify('alignItems', 'center')
  },
  orgName: {
    lineHeight: '25px',
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '5px'
  },
  educationLevel: {
    lineHeight: '25px'
  },
  orgCity: {
    fontSize: '15px',
    fontWeight: 'normal',
    lineHeight: '25px',
    marginRight: '10px'
  },
  period: {
    extend: 'orgCity',
    color: '#9f9f9f',
    margin: '0'
  },
  jobTitle: {
    fontWeight: '500'
  },
  description: {
    marginTop: '14px',
    lineHeight: '25px'
  },
  wrapper: {
    '&:not(:last-child)': {
      borderBottom: FIELD_BORDER_STYLE_OPACITY,
      paddingBottom: '30px',
      marginBottom: '30px'
    }
  },
  item: {
    '&:not(:last-child)': {
      marginBottom: '25px'
    }
  },
  edit: {
    color: LABEL_COLOR,
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer'
  }
}
const SectionList = props => {
  const { classes, title, list, keys, children, onChange, id, isEducation } = props

  const monthFormat = (date, isPresent, lang) => {
    if (!date) return null
    return isPresent ? t('common_till_now', lang) : moment(date).format('MMMM YYYY')
  }

  return (
    <div id={id} className={classes.wrapper}>
      <div className={classes.title}>
        <T>{title}</T>
        {onChange && <span onClick={onChange} className={classes.edit}><T>main_global_edit</T></span>}
      </div>
      {children ||
      loMap(list, (item, index) => {
        const country = fp.get('country', item)
        const orgName = fp.get(keys.name, item)
        const fromDate = fp.get('fromDate', item)
        const toDate = fp.get('toDate', item)
        const isPresent = toDate === 'present'
        const jobTitle = fp.get(keys.title, item)
        const educationLevel = fp.get(fp.get('educationLevel', item), EDUCATION)
        const descr = getWithBR(fp.get(keys.desc, item))
        return (
          <div className={classes.item} key={index}>
            <div className={classes.orgName}>{orgName}</div>
            {educationLevel && <div className={classes.educationLevel}><T>{educationLevel}</T></div>}
            <div>
              {country && !isEducation &&
              <span className={classes.orgCity}>
                <TW>
                  {lang => getTranslate(country, lang)}
                </TW>
              </span>}
              {fromDate && toDate &&
              <span className={classes.period}>
                <TW>
                  {lang => {
                    return fp.flow(
                      fp.filter(date => date),
                      fp.join(' - ')
                    )([
                      monthFormat(fromDate, false, lang),
                      monthFormat(toDate, isPresent, lang)
                    ])
                  }}
                </TW>
              </span>}
            </div>

            <div className={classes.description}>
              <div className={classes.jobTitle}>{jobTitle}</div>
              <HtmlContent>{descr}</HtmlContent>
            </div>
          </div>
        )
      })}
    </div>
  )
}

SectionList.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string,
  title: PropTypes.string,
  list: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.node,
  keys: PropTypes.object,
  isEducation: PropTypes.bool
}

export default injectSheet(style)(SectionList)
