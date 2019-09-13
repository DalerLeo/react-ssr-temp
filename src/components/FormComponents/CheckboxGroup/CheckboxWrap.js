import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import {
  crossBrowserify,
  fallbacksStyle, LABEL_COLOR, MAIN_COLOR
} from 'constants/styles'
import classNames from 'classnames'
import { getTranslate } from 'helpers/translate'
import ChevronRight from 'icons/ChevronRight'
import { Checkbox } from 'components/FormComponents'
import CheckboxGr from 'antd/lib/checkbox/Group'
import Collapse from 'antd/lib/collapse/Collapse'
import Panel from 'antd/lib/collapse/CollapsePanel'

const enhance = compose(
  withHandlers({
    onChildChange: props => (v) => {
      const { onChange, item } = props
      if (_.size(v) === _.size(item.children)) {
        onChange(v)
      } else if (_.isEmpty(v)) {
        onChange([])
      } else {
        onChange(v)
      }
    },
    onParentChange: props => (ev) => {
      const children = _.get(props, 'item.children')
      const isTrue = _.get(ev, 'target.checked')
      if (isTrue) {
        const childIds = _.map(children, child => child.id)
        props.onChange(childIds)
      } else {
        props.onChange([])
      }
    }
  }),
  injectSheet({
    wrapper: {
      '& .ant-collapse-item': {
        backgroundColor: '#f6f7f9 !important',
        border: 'none !important'
      },
      '& .ant-collapse-content': {
        backgroundColor: '#f6f7f9 !important',
        color: '#000',
        paddingLeft: '20px',
        marginTop: '16px',
        '& .ant-collapse-content-box': {
          paddingTop: '0 !important',
          paddingBottom: '0 !important'
        }
      }
    },
    blockWrapper: {
      display: 'block',
      '& $checkbox': {
        ...fallbacksStyle('display', 'flex'),
        ...crossBrowserify('alignItems', 'center'),
        marginRight: '0 !important',
        marginLeft: '0 !important'
      },
      '& $checkBoxChild': {
        ...fallbacksStyle('display', 'flex'),
        ...crossBrowserify('alignItems', 'center'),
        marginRight: '0 !important',
        marginLeft: '0 !important',
        marginBottom: '16px'
      }
    },
    checkbox: {

    },
    count: {
      color: LABEL_COLOR,
      marginLeft: '5px',
      '&:before': {
        content: '"("'
      },
      '&:after': {
        content: '")"'
      }
    },
    checkBoxChild: {

    },
    highlighted: {
      position: 'relative',
      zIndex: '0',
      '& > span:not(.ant-checkbox)': {
        color: MAIN_COLOR,
        fontWeight: '500'
      },
      '&:after': {
        background: '#f1f1f2',
        borderRadius: '4px',
        content: '""',
        position: 'absolute',
        top: '-5px',
        bottom: '-5px',
        left: '-10px',
        right: '0',
        zIndex: '-1'
      }
    },
    collapse: {
      color: 'inherit',
      fontFamily: 'Montserrat',
      '& .ant-collapse-header': {
        outline: 'none',
        padding: '0 !important',
        position: 'absolute !important',
        top: '0',
        left: '0'
      },
      '& .ant-collapse-arrow': {
        position: 'absolute',
        left: '0'
      }
    },
    expandIcon: {
      ...crossBrowserify('transition', 'all 200ms'),
      fontSize: '22px'
    },
    expandIconActive: {
      ...crossBrowserify('transform', 'rotate(90deg)')
    }
  })
)

const CheckboxGroup = ({ ...defaultProps }) => {
  const {
    lang,
    onParentChange,
    onChildChange,
    classes,
    item,
    selected,
    search,
    parentsOnly,
    searchFaceted
  } = defaultProps

  const id = _.get(item, 'id')
  const childrenIds = _.map(_.get(item, 'children'), 'id')
  const parentLabelName = getTranslate(item, lang)
  const resumeCount = _.get(searchFaceted, id)

  const selectedParentChilds = _.get(selected, id) || []
  const isParentChecked = parentsOnly ? _.includes(selected, item.id) : !_.isEmpty(selectedParentChilds)
  const isParentIndeterminate =
    _.size(childrenIds) !== _.size(selectedParentChilds) &&
    !_.isEmpty(selectedParentChilds)

  return (
    <React.Fragment>
      <Checkbox
        indeterminate={isParentIndeterminate}
        checked={isParentChecked}
        onChange={onParentChange}
        className={classes.checkbox}>
        <span>
          {parentLabelName}
          {resumeCount && <span className={classes.count}>{resumeCount}</span>}
        </span>
      </Checkbox>
      <CheckboxGr
        className={classNames(classes.wrapper, classes.blockWrapper)}
        onChange={onChildChange}
        value={selectedParentChilds}>
        <Collapse
          expandIcon={(panelProps) => {
            const { isActive } = panelProps
            return (
              <span>
                <ChevronRight className={classNames(classes.expandIcon, {
                  [classes.expandIconActive]: isActive
                })}/>
              </span>
            )
          }}
          className={classes.collapse}
          bordered={false}>
          <Panel
            key={id}
            header={<span> </span>}
            showArrow={!parentsOnly}>
            {_.map(item.children, child => {
              const childValue = _.get(child, 'id')
              const childLabel = getTranslate(child, lang)
              const isChildChecked = _.includes(selectedParentChilds, childValue)
              const matchedSearch = _.includes(_.toLower(childLabel), search) && !_.isEmpty(search)
              const resumeCount = _.get(searchFaceted, childValue)
              return (
                <Checkbox
                  key={childValue}
                  value={childValue}
                  label={childLabel}
                  className={classNames(classes.checkBoxChild, {
                    [classes.highlighted]: matchedSearch
                  })}
                  checked={isChildChecked}
                />
              )
            })}
          </Panel>
        </Collapse>
      </CheckboxGr>
    </React.Fragment>
  )
}

CheckboxGroup.propTypes = {
  item: PropTypes.object.isRequired,
  search: PropTypes.string,
  lang: PropTypes.string.isRequired,
  parentsOnly: PropTypes.bool,
  searchFaceted: PropTypes.object
}

export default enhance(CheckboxGroup)
