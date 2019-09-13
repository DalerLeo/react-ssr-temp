import React from 'react'
import fp from 'lodash/fp'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import loMap from 'lodash/map'
import loGet from 'lodash/get'
import loReplace from 'lodash/replace'
import { parse } from 'query-string'
import PropTypes from 'prop-types'
import withHistory from 'helpers/withHistory'
import dateFormat from 'helpers/dateFormat'
import {
  crossBrowserify,
  fallbacksStyle,
  ANCHOR_DISABLED,
  animationStyle, BLACK_COLOR
} from 'constants/styles'
import { SEARCH_RESULTS_URL } from 'constants/routes'
import Title from 'components/Title'
import Link from 'components/Link'
import { CardLoadingList, SEARCH } from 'components/Cards'
import Container from 'components/Container'
import EmptyState from 'components/EmptyState'
import T from 'components/T'
import hexToRgb from 'helpers/hexToRgb'

const enhance = compose(
  withHistory,
  injectSheet({
    wrapper: {},
    description: {
      color: hexToRgb(BLACK_COLOR, '0.6'),
      fontStyle: 'italic',
      fontWeight: '300',
      lineHeight: '23px',
      margin: '20px 0'
    },
    title: {
      color: BLACK_COLOR,
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '500'
    },
    list: {
      ...ANCHOR_DISABLED,
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      border: '1px solid rgba(198, 203, 212, 0.65)',
      borderRadius: '4px',
      lineHeight: '22px',
      padding: '18px 28px 18px 22px',
      '&:not(:last-child)': {
        marginBottom: '20px'
      },
      '& > div:last-child': {
        textAlign: 'right',
        color: '#a1a7b3',
        fontSize: '13px',
        width: '200px'
      }
    },
    name: {
      width: 'calc(100% - 250px)',
      fontWeight: '500'
    }
  })
)

const UserSearchHistory = ({ classes, data }) => {
  const loading = fp.get('loading', data)
  const list = fp.get('data', data)

  const searchTypes = {
    vacancy: 'main_vacancy',
    resume: 'main_resume',
    employer: 'main_companies'
  }

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <div className={classes.description}>
          <span className={classes.title}>
            <T>menu_my_search</T>
          </span>
          <T>menu_my_search_desc</T>
        </div>
        <div>
          <CardLoadingList items={10} loading={loading} type={SEARCH}/>
          <EmptyState
            data={list}
            loading={loading}
          />
          {!loading && loMap(list, (item, index) => {
            const query = loGet(item, 'getQuery')
            const queryParam = parse(query)
            const queryFormatted = loReplace(query, '?', '')
            const searchType = fp.get(fp.get('type', queryParam), searchTypes)
            const searchText = queryParam.text || <T>main_search_result_text</T>
            const createdDate = dateFormat(loGet(item, 'createdDate'), true)
            return (
              <Link to={{ pathname: SEARCH_RESULTS_URL, search: queryFormatted }} key={index} className={classes.list}>
                <div className={classes.name}>{searchText} <span>(<T>{searchType}</T>)</span></div>
                <div>{createdDate}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

UserSearchHistory.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
}
export default enhance(UserSearchHistory)
