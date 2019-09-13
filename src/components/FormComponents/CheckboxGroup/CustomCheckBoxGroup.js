import _ from 'lodash'
import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import AntCheckBox from 'antd/lib/checkbox'
import {
  fallbacksStyle,
  BLACK_COLOR,
  LABEL_COLOR,
  MAIN_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import Label from '../FieldLabel/FieldLabel2'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import T from 'components/T'

const style = {
  displayBlock: {
    display: 'block',
    marginBottom: '15px',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  displayInline: {
    display: 'inline-block',
    marginRight: '15px',
    '&:last-child': {
      marginRight: '0'
    }
  },
  checkbox: {
    marginLeft: '0 !important',
    color: BLACK_COLOR,
    position: 'relative',
    fontFamily: '\'Montserrat\', sans-serif',
    minHeight: '22px',
    paddingLeft: '23px',
    '& span': {
      paddingLeft: '0 !important'
    },
    '& .ant-checkbox': {
      position: 'absolute',
      fontFamily: 'inherit',
      top: '2px',
      left: '0'
    },
    '& .ant-checkbox-inner': {
      background: WHITE_COLOR,
      border: '1px #b4bfc9 solid'
    },
    // Focus
    '& .ant-checkbox-input:focus': {
      '& + .ant-checkbox-inner': {
        borderColor: MAIN_COLOR
      }
    },
    // Hover
    '&:hover': {
      '& .ant-checkbox-inner': {
        borderColor: MAIN_COLOR
      }
    },
    // CHECKED or INDETERMINATE
    '& .ant-checkbox-checked, & .ant-checkbox-indeterminate': {
      '& .ant-checkbox-inner': {
        borderColor: MAIN_COLOR,
        '&:after': {
          borderColor: MAIN_COLOR
        }
      },
      '&:after': {
        border: `1px ${MAIN_COLOR} solid`
      }
    }
  },
  checkboxSpan: {
    '&:nth-child(n + 3)': {
      marginTop: '15px'
    }
  },

  withCounts: {
    ...fallbacksStyle('display', 'flex'),
    paddingRight: '50px',
    position: 'relative'
  },
  checkboxContent: {

  },
  checkboxContentChecked: {

  },
  count: {
    color: LABEL_COLOR,
    position: 'absolute',
    top: '0',
    right: '0'
  }
}

const enhace = compose(
  withHandlers({
    onChange: props => (checked, id) => {
      const { input: { value, onChange } } = props
      if (checked) {
        return onChange(_.union(value, [id]))
      }
      return onChange(_.filter(value, v => v !== id))
    }
  }),
  injectSheet(style)
)

/* eslint-disable react/prop-types */
const CustomCheckbox = props => {
  const {
    isStatic,
    classes,
    items,
    input,
    className,
    onChange,
    itemName,
    maxSelected,
    label,
    type,
    grid,
    withCounts,
    counts
  } = props

  const disabled = _.size(_.get(input, 'value')) >= maxSelected

  if (!_.isEmpty(grid)) {
    return (
      <React.Fragment>
        {label && <Label label={label}/>}
        <Row style={{ marginLeft: '18px' }}>
          {_.map(items, item => {
            const value = _.get(item, 'id')
            const name = _.get(item, 'name') || _.get(item, 'title')
            const checked = _.includes(input.value, item.id)
            return (
              <Col key={value} span={grid.span} className={classes.checkboxSpan}>
                <AntCheckBox
                  key={item.id}
                  disabled={!checked && disabled}
                  className={classNames(classes.checkbox, className)}
                  checked={checked}
                  onChange={(ev) => onChange(ev.target.checked, item.id)}>
                  <span style={{ color: checked ? MAIN_COLOR : 'inherit' }}>
                    {isStatic ? <T>{name}</T> : name}
                  </span>
                </AntCheckBox>
              </Col>
            )
          })}
        </Row>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {label && <Label label={label}/>}
      {_.map(items, item => {
        const id = _.get(item, 'id')
        const itemLabel = _.get(item, itemName)
        const checked = _.includes(input.value, id)
        const count = fp.get(id, counts)
        return (
          <AntCheckBox
            key={item.id}
            disabled={!checked && disabled}
            checked={checked}
            onChange={(ev) => onChange(ev.target.checked, id)}
            className={classNames(classes.checkbox, className, {
              [classes.withCounts]: withCounts && count,
              [classes.displayBlock]: type === 'block',
              [classes.displayInline]: type === 'inline'
            })}>
            {withCounts && count
              ? <div className={classNames(classes.checkboxContent, {
                [classes.checkboxContentChecked]: checked
              })}>
                {itemLabel}
                <span className={classes.count}>{count}</span>
              </div>
              : <span style={{ color: checked ? MAIN_COLOR : 'inherit' }}>
                {itemLabel}
              </span>}
          </AntCheckBox>
        )
      })}
    </React.Fragment>
  )
}

CustomCheckbox.propTypes = {
  isStatic: PropTypes.bool,
  withCounts: PropTypes.bool,
  counts: PropTypes.object,
  type: PropTypes.oneOf(['inline', 'block'])
}

CustomCheckbox.defaultProps = {
  type: 'block',
  itemName: 'name'
}

export default enhace(CustomCheckbox)
