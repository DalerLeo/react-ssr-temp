import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import { MAIN_COLOR } from 'constants/styles'

const style = {
  title: {
    lineHeight: '2.63',
    fontSize: '16px',
    fontWeight: '500'
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
  }
}
const SectionList = props => {
  const { classes, title, list, children } = props
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{title}</div>
      {
        children || (
          <ul>
            {loMap(list, (item, index) => {
              return (
                <li key={index}>
                  {item}
                </li>
              )
            })}

          </ul>
        )}
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
