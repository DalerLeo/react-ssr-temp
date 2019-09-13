import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import { crossBrowserify, fallbacksStyle, LABEL_COLOR, MAIN_COLOR } from 'constants/styles'
import dateFormat from 'helpers/dateFormat'
import hexToRgb from 'helpers/hexToRgb'
import { getWithBR } from 'helpers/get'

const style = {
  title: {
    lineHeight: '2.33',
    fontSize: '18px',
    fontWeight: '500',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    ...crossBrowserify('alignItems', 'center')
  },
  orgName: {
    lineHeight: '1.67',
    fontSize: '15px',
    fontWeight: '500',
    marginTop: '5px'
  },
  orgCity: {
    color: '#9f9f9f',
    fontWeight: 'normal',
    lineHeight: '1.67'
  },
  jobTitle: {
    fontWeight: '500'
  },
  description: {
    marginTop: '7px',
    lineHeight: '1.67',
    marginBottom: '13px',
    paddingBottom: '20px',
    borderBottom: 'solid 1px',
    borderBottomColor: hexToRgb('c6cbd4', '0.3')
  },
  wrapper: {
    '& ul': {
      listStyle: 'none',
      padding: '0',
      paddingLeft: '18px'
    },
    '& li': {
      lineHeight: '1.67',
      fontSize: '15px',
      marginBottom: '14px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    '& li:before': {
      content: '"\\2022"',
      color: MAIN_COLOR,
      fontWeight: 'bold',
      display: 'inline-block',
      marginLeft: '-14px',
      paddingRight: '7px',
      borderRadius: '50%'
    }
  },
  edit: {
    color: LABEL_COLOR,
    fontWeight: '500',
    textDecoration: 'underline',
    fontSize: '14px',
    cursor: 'pointer'
  }
}
const SectionList = props => {
  const { classes, title, list, keys, children, onChange, countryList, institutionList } = props

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        {title}
        {onChange && <span onClick={onChange} className={classes.edit}>Редактировать</span>}
      </div>
      {children ||
      loMap(list, (item, index) => {
        const country = fp.flow(fp.find({ id: fp.get('country', item) }), fp.get('name'))(countryList) || 'test'
        const orgName = fp.get(keys.name, item) || fp.flow(fp.find({ id: fp.get('institution', item) }), fp.get('name'))(institutionList)
        const toDate = fp.get('toDate', item) || 'Test'
        const fromDate = fp.get('fromDate', item) || 'Test'
        const jobTitle = fp.get(keys.title, item) || 'Test'
        const descr = getWithBR(fp.get(keys.desc, item)) || 'Test'
        const period = dateFormat(fromDate) + ' - ' + dateFormat(toDate)
        return (
          <React.Fragment key={index}>
            <div className={classes.orgName}>{orgName} <span className={classes.orgCity}>&nbsp; {country}</span></div>
            <div className={classes.orgCity}>{period}</div>

            <div className={classes.description}>
              <div className={classes.jobTitle}>{jobTitle}</div>
              <div dangerouslySetInnerHTML={{ __html: descr }}/>
            </div>
          </React.Fragment>
        )
      })}

    </div>
  )
}

SectionList.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  list: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.node,
  keys: PropTypes.object
}

export default injectSheet(style)(SectionList)
