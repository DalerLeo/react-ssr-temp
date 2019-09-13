import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  WHITE_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import { SEARCH_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import t from 'helpers/translate'
import MdSearch from 'react-icons/lib/md/search'
import { TextField, SearchFieldConfig } from 'components/FormComponents'
import Link from 'components/Link'
import T from 'components/T'
import TW from 'components/TW'

const enhance = compose(
  reduxForm({
    form: 'MainSearchForm'
  }),
  injectSheet({
    search: {
      '& svg': {
        color: '#c6cbd4'
      },
      ...fallbacksStyle('display', 'flex'),
      color: hexToRgb('#585858', '0.75'),
      position: 'relative'
    },

    advancedSearch: {
      fontSize: '14px',
      position: 'absolute',
      marginLeft: '17px',
      left: '0',
      color: '#a1a7b3',
      top: 'calc(100% + 10px)',
      lineHeight: '1',
      '& a': {
        color: 'inherit !important'
      }
    },

    searchField: {
      borderRight: 'none',
      color: hexToRgb(BLACK_COLOR, '0.75'),
      fontSize: '15px',
      paddingLeft: '40px !important',
      background: WHITE_COLOR,
      '&:focus': {
        boxShadow: 'none'
      },
      '&::placeholder': {
        color: '#a1a7b3'
      },
      '&::-ms-input-placeholder': {
        color: 'inherit'
      }
    },

    searchButton: {
      ...crossBrowserify('transition', 'all 400ms ease'),
      ...crossBrowserify('borderRadius', '0 4px 4px 0'),
      border: 'none',
      background: MAIN_COLOR,
      color: WHITE_COLOR,
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      lineHeight: '55px',
      outline: 'none',
      padding: '0 25px',
      height: '55px',
      '&:hover': {
        background: hexToRgb(MAIN_COLOR, '0.8')
      }
    },

    wrapperClass: {
      borderColor: '#c6cbd4',
      borderRight: 'none',
      borderRadius: '4px 0 0 4px',
      '& .ant-input-suffix': {
        right: '8px'
      },
      '& .ant-input': {
        border: 'none !important',
        borderLeft: '1px solid #cbd0d8 !important',
        borderRadius: '0',
        color: MAIN_COLOR,
        fontSize: '15px',
        paddingLeft: '18px !important'
      },
      '& .ant-select-selection__placeholder': {
        margin: '-9px 18px 0 !important'
      }
    },
    medium: {
      height: '45px',
      lineHeight: '45px'
    },
    smallWrapper: {
      borderRight: '1px solid #c6cbd4',
      height: '36px'
    },
    smallSearch: {
      color: '#a1a7b3',
      lineHeight: '36px',
      marginLeft: '15px',
      '& a': {
        color: 'inherit !important'
      }

    }
  })
)

const BigSearch = (props) => {
  const { classes, type, handleSubmit, withExtended, ...rest } = props
  const initialType = fp.get('initialValues.type', rest)

  const isBig = type === 'big'
  const isMedium = type === 'medium'
  const isSmall = type === 'small'

  const [searchType, setSearchType] = useState(initialType)

  const onSearch = handleSubmit(() => props.onSearch())

  const postFix = isBig && (
    <Field
      name={'type'}
      component={SearchFieldConfig}
      onChange={(event, val) => setSearchType(val)}
      placeholder={<T>main_search_by</T>}
      isStatic={true}
      type={'light'}
      width={'160px'}
      height={36}
      items={[
        { id: 'vacancy', name: 'main_search_by_vacancy' },
        { id: 'resume', name: 'main_search_by_resume' },
        { id: 'employer', name: 'main_search_by_companies' }
      ]}
    />
  )

  const width = isBig ? '511px' : isSmall ? '220px' : ''
  return (
    <form onSubmit={onSearch} className={classNames(classes.search)}>
      <div>
        <TW>
          {(lang) => {
            return <Field
              name={'search'}
              width={width}
              big={isBig}
              component={TextField}
              className={classes.searchField}
              wrapperClass={classNames({
                [classes.wrapperClass]: !isSmall,
                [classes.smallWrapper]: isSmall
              })}
              placeholder={t('main_search', lang)}
              overflow={!isBig}
              prefix={<MdSearch/>}
              postfix={postFix}
            />
          }}
        </TW>
      </div>
      {!isSmall && (
        <button
          type={'submit'}
          className={classNames({
            [classes.searchButton]: true,
            [classes.medium]: isMedium
          })}><T>button_find</T></button>
      )}
      {withExtended &&
      <div className={classNames({
        [classes.advancedSearch]: !isSmall,
        [classes.smallSearch]: isSmall
      })}>
        <Link to={{ pathname: SEARCH_URL, search: `type=${searchType}` }}>
          <T>search_advanced_title</T>
        </Link>
      </div>}
    </form>
  )
}

BigSearch.propTypes = {
  handleSubmit: PropTypes.func,
  header: PropTypes.bool,
  classes: PropTypes.object,
  onSearch: PropTypes.func,
  type: PropTypes.string,
  withExtended: PropTypes.bool
}

BigSearch.defaultProps = {
  header: false,
  withExtended: true,
  type: 'big'
}

export default enhance(BigSearch)
