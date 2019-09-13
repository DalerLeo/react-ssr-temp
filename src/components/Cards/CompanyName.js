import React from 'react'
import PropTypes from 'prop-types'
import sprintf from 'sprintf'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import CheckIcon from 'react-icons/lib/md/check-circle'
import { MAIN_COLOR, maxLineClamp } from 'constants/styles'
import { COMPANIES_ITEM_URL } from 'constants/routes'
import withHistory from 'helpers/withHistory'
import ToolTip from 'components/Tooltip'

const withStyles = compose(
  withHistory,
  injectSheet({
    company: {
      ...maxLineClamp('1'),
      fontSize: '13px',
      color: 'black',
      cursor: 'pointer',
      display: 'block',
      position: 'relative',
      textDecoration: 'none !important',
      '& svg': {
        color: MAIN_COLOR,
        fontSize: '16px',
        display: 'block'
      }
    },
    clickable: {
      '&:hover': {
        color: MAIN_COLOR
      }
    },
    big: {
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: 'normal'
    },
    approved: {
      textIndent: '22px'
    },
    tooltip: {
      position: 'absolute',
      top: '1px',
      left: '0'
    }
  })
)

const CompanyName = props => {
  const { history, id, classes, className, name, big, fontSize, isApproved } = props

  const companyClasses = classNames(classes.company, className, {
    [classes.approved]: isApproved,
    [classes.clickable]: id,
    [classes.big]: big
  })
  const redirect = id ? sprintf(COMPANIES_ITEM_URL, id) : null
  const content = (
    <React.Fragment>
      <span>{name}</span>
      {isApproved && (
        <ToolTip className={classes.tooltip} text={'Компания проверена!'}>
          <CheckIcon color={MAIN_COLOR}/>
        </ToolTip>
      )}
    </React.Fragment>
  )

  if (!name) return null

  return id
    ? (
      <div
        onClick={event => {
          event.stopPropagation()
          history.push(redirect)
        }}
        className={companyClasses}
        style={{ fontSize }}>
        {content}
      </div>
    )
    : <div className={companyClasses} style={{ fontSize }}>{content}</div>
}

CompanyName.propTypes = {
  history: PropTypes.object,
  id: PropTypes.number,
  classes: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  big: PropTypes.bool,
  isApproved: PropTypes.bool
}

CompanyName.defaultProps = {
  isApproved: false
}

export default withStyles(CompanyName)
