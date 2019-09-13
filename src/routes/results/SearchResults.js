import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import hexToRgb from 'helpers/hexToRgb'
import { crossBrowserify, ROLL_UP_FADE_IN } from 'constants/styles'
import Container from 'components/Container'
import Filter from './Filter'
import {
  CardList,
  VACANCY_BIG,
  APP_BIG,
  COMPANY
} from 'components/Cards'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import OrderingFilter from './OrderingFilter'
import Pagination from 'components/Pagination'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    wrapper: {
      height: '100%'
    },
    container: {

    },
    leftSide: {
      backgroundColor: hexToRgb('#eef1f6', '0.18'),
      '&:after': {
        background: 'inherit',
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '100%',
        width: '135px'
      }
    },
    ...ROLL_UP_FADE_IN,
    results: {
      animationName: 'rollUpFadeIn',
      animationDuration: '1s',
      padding: '60px 50px'
    },
    resultTitle: {
      fontSize: '22px',
      fontWeight: '600',
      lineHeight: 'normal',
      marginBottom: '25px',
      textTransform: 'lowercase',
      '& span': {
        marginRight: '5px'
      }
    },
    query: {
      color: '#a9aeb9',
      textTransform: 'none'
    },
    sorting: {
      marginBottom: '40px',
      marginTop: '17px',
      '& > div': {
        fontSize: '14px',
        marginRight: '50px'
      },
      '& svg': {
        fontSize: '20px',
        color: '#ced3da'
      }
    },
    titleLoader: {
      ...crossBrowserify('animation', 'wave 1.5s infinite'),
      height: '25px',
      width: '400px'
    }
  })
)

const SearchResults = (props) => {
  const {
    type,
    classes,
    initialValues,
    resultList,
    resultCounts,
    regionsList,
    resultFilter,
    professionsList,
    languagesList,
    driverLicenseList,
    onClear,
    onSearch,
    onSaveSearch,
    text,
    onFilterChange,
    isAuth
  } = props

  const types = {
    'vacancy': VACANCY_BIG,
    'resume': APP_BIG
  }

  const resultsText = {
    'vacancy': 'main_vacancy',
    'resume': 'main_specialists',
    'employer': 'main_companies'
  }

  const loading = fp.get('loading', resultList)

  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <Row type={'flex'}>
          <Col xs={7} className={classes.leftSide}>
            <Filter
              isAuth={isAuth}
              type={type}
              onSearch={onSearch}
              onClear={onClear}
              onSaveSearch={onSaveSearch}
              onFilterChange={onFilterChange}
              initialValues={initialValues}
              professionsList={professionsList}
              regionsList={regionsList}
              languagesList={languagesList}
              driverLicenseList={driverLicenseList}
              resultFilter={resultFilter}
              resultCounts={resultCounts}
            />
          </Col>
          <Col xs={17}>
            <div className={classes.results}>
              {loading
                ? <div className={classes.titleLoader}/>
                : <div className={classes.resultTitle}>
                  <span>{resultFilter.getCounts()}</span>
                  <span><T>{resultsText[type]}</T></span>
                  {text && <span className={classes.query}><T>main_search_by_query</T> «{text}»</span>}
                </div>}
              <div className={classes.sorting}>
                <OrderingFilter
                  name={'search_sort_by_date'}
                  value={'date'}
                  filter={resultFilter}
                />
                {type !== 'employer' &&
                <OrderingFilter
                  name={'search_sort_by_salary'}
                  value={'salary'}
                  filter={resultFilter}
                />}
              </div>
              {type === 'employer'
                ? <CardList
                  type={COMPANY}
                  data={resultList}
                  filter={resultFilter}
                  marginBottom={20}
                />
                : <CardList
                  favBtn={true}
                  filter={resultFilter}
                  type={types[type]}
                  data={resultList}
                  msgCount={true}
                />}
              <Pagination smooth={true} filter={resultFilter}/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

SearchResults.propTypes = {
  isAuth: PropTypes.bool,
  classes: PropTypes.object,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  professionsList: PropTypes.object.isRequired,
  regionsList: PropTypes.object.isRequired,
  resultList: PropTypes.object.isRequired,
  resultCounts: PropTypes.object.isRequired,
  languagesList: PropTypes.object.isRequired,
  driverLicenseList: PropTypes.object.isRequired,
  resultFilter: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onMore: PropTypes.func.isRequired,
  onSaveSearch: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default enhance(SearchResults)
