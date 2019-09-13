import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import T from 'components/T'

const style = {
  title: {
    lineHeight: '22px',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '20px'
  },
  wrapper: {
    '& ul': {
      listStyle: 'none',
      padding: '0'
    },
    '& li': {
      lineHeight: '25px',
      fontSize: '15px'
    }
  }
}
const SectionList = props => {
  const { classes, title, list, children } = props

  const ulList = (
    <ul>
      {loMap(list, (item, index) => {
        return (
          <li key={index}>
            {item}
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}><T>{title}</T></div>
      {children || ulList}
    </div>
  )
}

SectionList.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  list: PropTypes.array,
  children: PropTypes.node
}

export default injectSheet(style)(SectionList)
