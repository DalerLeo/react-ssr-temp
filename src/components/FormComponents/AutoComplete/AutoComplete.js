import {
  BLACK_COLOR,
  BORDER_COLOR,
  COLOR_RED,
  FIELD_BORDER_STYLE,
  PRIMARY_COLOR,
  TEXT_COLOR_DEFAULT,
  WHITE_COLOR
} from 'constants/styles'
import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import hexToRgb from 'helpers/hexToRgb'
import t from 'helpers/translate'
import withLanguage from 'helpers/withLanguage'
import classNames from 'classnames'
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import Input from 'antd/lib/input'
import AutoComplete from 'antd/lib/auto-complete'
import T from 'components/T'
import Label from 'components/FormComponents/FieldLabel'
import Label2 from 'components/FormComponents/FieldLabel/FieldLabel2'

const Option = AutoComplete.Option

const INPUT_HEIGHT = 45
const enhance = compose(
  withLanguage,
  injectSheet({
    wrapper: {
      marginBottom: '20px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    disabled: {
      opacity: '0.3',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '1'
      }
    },
    autoComplete: {
      fontFamily: 'inherit',
      width: '100%',
      '& .ant-input-affix-wrapper:hover': {
        '& .ant-input:not(.ant-input-disabled)': {
          borderColor: BORDER_COLOR
        }
      },
      '& .ant-select-selection__rendered': {
        lineHeight: ({ height }) => {
          return height
            ? `${height}px !important`
            : `${INPUT_HEIGHT}px !important`
        }
      },
      '& .ant-select-selection__placeholder': {
        color: '#b4b9c2',
        margin: '-10px 12px 0 !important'
      },
      '& .ant-input': {
        border: FIELD_BORDER_STYLE,
        borderRadius: '4px',
        boxShadow: 'none !important',
        color: TEXT_COLOR_DEFAULT,
        fontFamily: '\'Montserrat\', sans-serif',
        height: ({ height }) => {
          return height
            ? `${height}px !important`
            : `${INPUT_HEIGHT}px !important`
        },
        padding: '0 32px 0 12px !important',
        '&:hover:not(.ant-input-disabled), &:focus:not(.ant-input-disabled)': {
          borderColor: BORDER_COLOR,
          '& + .ant-input-suffix': {
            borderColor: BORDER_COLOR
          }
        }
      },
      '& .ant-input-disabled': {
        borderColor: `${BORDER_COLOR} !important`
      },
      '& .ant-input-suffix': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '1px',
        right: '1px',
        bottom: '1px',
        transition: 'all 300ms',
        transform: 'none',
        width: '32px'
      }
    },
    errorInput: {
      '& .ant-input-affix-wrapper:hover': {
        '& .ant-input:not(.ant-input-disabled)': {
          borderColor: COLOR_RED
        }
      },
      '& .ant-input': {
        borderColor: `${COLOR_RED} !important`,
        fontFamily: '\'Montserrat\', sans-serif',
        boxShadow: 'none !important',
        '&:hover, &:focus': {
          borderColor: `${COLOR_RED} !important`,
          '& + .ant-input-suffix': {
            borderColor: COLOR_RED
          }
        },
        '& + .ant-input-suffix': {
          borderColor: `${COLOR_RED} !important`,
          '& svg': {
            color: `${COLOR_RED} !important`
          }
        }
      }
    },
    darkMode: {
      '& .ant-input-affix-wrapper:hover': {
        '& .ant-input:not(.ant-input-disabled)': {
          borderColor: WHITE_COLOR
        }
      },
      '& .ant-select-selection': {
        background: hexToRgb(BLACK_COLOR, '0.26')
      },
      '& .ant-input': {
        color: WHITE_COLOR,
        borderColor: WHITE_COLOR,
        '&:hover:not(.ant-input-disabled), &:focus:not(.ant-input-disabled)': {
          borderColor: WHITE_COLOR,
          '& + .ant-input-suffix': {
            borderColor: WHITE_COLOR
          }
        }
      },
      '& $suffix': {
        '& > svg': {
          color: WHITE_COLOR
        }
      },
      '& $dropdown': {
        background: hexToRgb(BLACK_COLOR, '0.52'),
        '& .ant-select-dropdown-menu-item': {
          color: hexToRgb(WHITE_COLOR, '0.58')
        },
        '& .ant-select-dropdown-menu-item-active': {
          background: `${hexToRgb(BLACK_COLOR, '0.52')} !important`
        },
        '& .ant-select-dropdown-menu-item-selected': {
          color: WHITE_COLOR,
          background: hexToRgb(BLACK_COLOR, '0.32'),
          fontWeight: '600'
        }
      }
    },
    suffix: {
      '& > svg': {
        color: '#6e6d6d',
        fontSize: '18px'
      }
    },
    dropdown: {
      boxShadow: '0 2px 9px 0 rgba(0, 0, 0, 0.03)',
      borderRadius: 'unset',
      zIndex: '4000',
      '& .ant-select-dropdown-menu-item': {
        fontFamily: 'Montserrat, sans-serif',
        borderRadius: 'unset',
        color: '#002257',
        fontSize: '14px',
        lineHeight: '24px',
        padding: '8px 16px',
        '&$customOption': {
          borderBottom: '1px #e4e8ea solid',
          cursor: 'pointer',
          padding: '0'
        }
      },
      '& .ant-select-dropdown-menu-item-active': {
        background: WHITE_COLOR,
        color: PRIMARY_COLOR
      },
      '& .ant-select-dropdown-menu-item-selected': {
        color: PRIMARY_COLOR,
        fontWeight: '600'
      }
    },
    customOption: {

    },
    option: {
      alignItems: 'center',
      display: 'flex',
      fontWeight: '500',
      padding: '10px 16px 10px 12px',
      transition: 'all 300ms',
      '&:hover': {
        color: PRIMARY_COLOR
      },
      '& > svg': {
        color: 'inherit',
        fontSize: '16px',
        marginRight: '5px'
      }
    }
  })
)

const Component = enhance((props) => {
  const {
    lang,
    isStatic,
    dataSource,
    input,
    label,
    label2,
    required,
    onlySelect,
    meta,
    classes,
    disabled,
    type,
    width,
    marginZero,
    margin,
    className,
    ...restProps
  } = props

  const filteredProps = _.omit(props, ['disabled'])

  const options = _.map(dataSource, (item) => {
    const key = _.get(item, 'value')
    const text = _.get(item, 'text')
    const translated = t(text, lang)
    const withTranslate = (isStatic && translated) ? translated : text
    return (
      <Option
        key={key}
        label={withTranslate}
        title={withTranslate}
      >
        {withTranslate}
      </Option>
    )
  })

  const touched = _.get(meta, 'touched')
  const errorText = _.get(meta, 'error')
  const error = Boolean(touched && errorText)

  const itemsKeys = _.map(props.items, 'id')
  return (
    <div
      style={{ width, marginBottom: marginZero && '0', margin }}
      className={classNames({
        [className]: true,
        [classes.wrapper]: true,
        [classes.disabled]: disabled
      })}
    >
      <Label label={label} required={required} error={error} />
      <Label2 label={label2} required={required} error={error} />
      <AutoComplete
        {...filteredProps}
        showSearch={!onlySelect}
        defaultActiveFirstOption={false}
        onChange={(key) => {
          if (onlySelect && !_.includes(itemsKeys, key)) return null
          if (key === 'custom_option') {
            return input.onChange(null)
          }
          restProps.onChange(key)
          return input.onChange(key)
        }}
        dataSource={options}
        className={classNames(classes.autoComplete, {
          [classes.darkMode]: type === 'dark',
          [classes.errorInput]: error
        })}
        getPopupContainer={(triggerNode) => triggerNode}
        dropdownClassName={classes.dropdown}
      >
        <Input
          {...{}} suffix={(
            <div className={classes.suffix}>
              <MdKeyboardArrowDown />
            </div>
          )}
        />
      </AutoComplete>
    </div>
  )
})

Component.propTypes = {
  isStatic: PropTypes.bool,
  onlySelect: PropTypes.bool
}

Component.defaultProps = {
  placeholder: <T>main_select_from_list</T>
}

export default Component
