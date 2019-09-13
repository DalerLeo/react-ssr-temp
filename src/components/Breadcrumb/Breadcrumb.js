import React from 'react'
import Link from 'components/Link'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import Breadcrumb from 'antd/lib/breadcrumb'
import Icon from 'antd/lib/icon'
import { PRIMARY_COLOR } from 'constants/styles'
import { MAIN_COLOR } from '../../constants/styles'
const ONE = 1
const withStyles = {
  wrapper: {
    '& .ant-breadcrumb': {
      fontFamily: 'inherit',
      lineHeight: 'normal',
      '& span:last-child': {
        color: MAIN_COLOR,
        fontWeight: '500',
        '& a': {
          color: MAIN_COLOR
        }
      },
      '& a:hover': { color: PRIMARY_COLOR }
    }
  }
}

const enhance = compose(
  injectSheet(withStyles)
)

const BreadcrumbWrapper = enhance(({ classes, items, product }) => {
  return (
    <div className={classes.wrapper}>
      <Breadcrumb separator={'>'}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
        <Breadcrumb.Item>Search</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
})

export default BreadcrumbWrapper
