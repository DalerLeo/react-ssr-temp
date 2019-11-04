import {
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle, MAIN_COLOR
} from 'constants/styles'
import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Checkbox } from 'components/FormComponents'
import Label from 'components/FormComponents/FieldLabel/FieldLabel2'
import CheckboxGr from 'antd/lib/checkbox/Group'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

const enhance = compose(
  injectSheet({
    wrapper: {
      '& .ant-row': {

      }
    },
    blockWrapper: {
      '& $checkbox': {
        ...fallbacksStyle('display', 'flex'),
        ...crossBrowserify('alignItems', 'center'),
        marginRight: '0 !important',
        marginLeft: '0 !important',
        marginBottom: '16px',
        '&:last-child': {
          marginBottom: '0'
        }
      }
    },
    checkbox: {
      transition: 'all 500ms',
      fontWeight: '400',
      color: BLACK_COLOR
    },
    checkGridItem: {
      extend: 'checkbox',
      '&:last-child': {
        marginBottom: '16px'
      }
    },
    checkboxActive: {
      color: MAIN_COLOR,
      fontWeight: '500'
    },
    inline: {
      ...fallbacksStyle('display', 'flex'),
      '& $checkbox': {
        marginBottom: '0',
        marginLeft: '18px'
      }
    },
    labeledMargin: {
      marginLeft: '18px'
    }
  })
)

const CheckboxGroup = props => {
  const { input, classes, items, grid, label, type, meta, ...defaultProps } = props
  if (!_.isEmpty(grid)) {
    return (
      <>'       '{label && <Label label={label} />}'       '<CheckboxGr
        className={classNames({
          [classes.wrapper]: true
        })}
        value={input.value}
        onChange={input.onChange}
        {...defaultProps}
      >
        <Row>
          {_.map(items, item => {
            const value = _.get(item, 'id')
            const name = _.get(item, 'name') || _.get(item, 'title')
            return (
              <Col key={value} span={grid.span}>
                <Checkbox
                  key={value}
                  value={value}
                  label={name}
                  className={
                    classNames(classes.checkGridItem, label && classes.labeledMargin)
                  }
                />
              </Col>
            )
          })}
        </Row>
                                                            </CheckboxGr>'     '
      </>
    )
  }

  return (
    <>'     '{label && <Label label={label} />}'     '<CheckboxGr
      className={classNames({
        [classes.wrapper]: true,
        [classes.blockWrapper]: type === 'block',
        [classes.inline]: type === 'inline'
      })}
      value={input.value || []}
      onChange={input.onChange}
      {...defaultProps}
    >
      {_.map(items, item => {
        const value = _.get(item, 'id')
        const name = _.get(item, 'name') || _.get(item, 'title')
        const checked = _.includes(input.value, value)
        return (
          <Checkbox
            key={value}
            value={value}
            label={name}
            className={classNames(
              classes.checkbox,
              { [classes.checkboxActive]: checked }
            )}
          />
        )
      })}
                                                      </CheckboxGr>'   '
    </>
  )
}

CheckboxGroup.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['inline', 'block'])
}

CheckboxGroup.defaultProps = {
  type: 'block'
}

export default enhance(CheckboxGroup)
