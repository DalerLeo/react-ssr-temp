import _ from 'lodash'
import fp from 'lodash/fp'
import React from 'react'
import { compose, withState, pure } from 'recompose'
import injectSheet from 'react-jss'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Goto from 'icons/Goto'
import PropTypes from 'prop-types'
import {
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle,
  LIGHT_GREY_BORDER_STYLE,
  MAIN_COLOR,
  WHITE_COLOR,
  ANCHOR_DISABLED,
  ZERO
} from 'constants/styles'
import sprintf from 'sprintf'
import Star from 'icons/Star'
import SearchJob from 'icons/SearchJob'
import { VACANCY_ITEM, SEARCH_RESULTS_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import numberFormat from 'helpers/numberFormat'
import queryToParams from 'helpers/queryToParams'
import { getTranslate } from 'helpers/translate'
import { CardList, APP, VACANCY } from 'components/Cards'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'
import Link from 'components/Link'
import Container from 'components/Container'
import Vacancies from 'components/HomePage/Vacancies'
import NewsFeed from 'components/HomePage/NewsFeed'
import BigSearch from 'components/BigSearch'
import { BigBanner } from 'components/Banners'
import Companies from 'components/HomePage/Companies'

const enhance = compose(
  withState('allPositions', 'setAllPositions', false),
  withState('allRegions', 'setAllRegions', false),
  injectSheet({
    wrapper: {},
    banner: {
      position: 'relative',
      paddingTop: '77px',
      backgroundColor: hexToRgb('#eef1f6', '0.18')
    },
    content: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between')
    },
    headerTitle: {
      fontSize: '35px',
      fontWeight: '600',
      lineHeight: '1.2'
    },
    populars: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      color: '#000',
      '& > a': {
        ...ANCHOR_DISABLED,
        position: 'relative',
        cursor: 'pointer',
        background: hexToRgb('#c6cbd4', '0.1'),
        height: '120px',
        transition: 'margin-top 200ms, height 200ms, color 100ms',
        '& svg': {
          display: 'none'
        },
        '&:hover': {
          marginTop: '-12px',
          height: '132px',
          '& $popContent': {
            color: MAIN_COLOR,
            display: 'flex !important',
            '& > span': {
              width: 'calc(100% - 30px)',
              whiteSpace: 'initial'
            }
          },
          '& svg': {
            fill: MAIN_COLOR,
            display: 'block'
          }
        },
        width: '20%',
        padding: '26px 20px 22px 30px',
        borderRight: '1px solid',
        borderColor: hexToRgb('#c6cbd4', '0.3'),
        '&:last-child': {
          borderRight: 'none'
        },
        '& span': {
          display: 'block'
        }
      }
    },
    popHeader: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#a1a7b3',
      marginBottom: '16px',
      '& svg': {
        color: '#FFB701',
        fontSize: '14px',
        marginRight: '2px',
        marginBottom: '2px'
      }
    },
    popTitle: {
      color: hexToRgb(BLACK_COLOR, '0.4'),
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    popContent: {
      justifyContent: 'space-between',
      whiteSpace: 'nowrap',
      margin: '3px 0 12px',
      fontSize: '14px',
      lineHeight: '1.57',
      overflow: 'hidden',
      maxHeight: '43px',
      textOverflow: 'ellipsis',
      '& > span': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%'
      }
    },
    popMore: {
      color: hexToRgb(BLACK_COLOR, '0.35'),
      fontSize: '13px',
      position: 'absolute',
      bottom: '22px'
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
        width: '1000%'
      }
    },
    headerStats: {
      fontSize: '18px',
      marginTop: '24px',
      marginBottom: '30px',
      textTransform: 'lowercase',
      '& span': {
        lineHeight: '18px',
        borderLeft: '1px #cbd0d8 solid',
        marginRight: '12px',
        paddingLeft: '12px',
        '&:first-child': {
          borderLeft: 'none',
          paddingLeft: '0'
        }
      }
    },
    positionsWrapper: {
      color: hexToRgb(BLACK_COLOR, '0.75'),
      padding: '50px 0 50px',
      marginRight: '40px',
      position: 'relative'
    },
    title: {
      marginBottom: '10px',
      lineHeight: '2.1'
    },
    positions: {
      margin: '0',
      padding: '0',
      listStyle: 'none',
      '& > li': {
        ...crossBrowserify('transition', 'all 300ms ease'),
        cursor: 'pointer',
        lineHeight: 'normal',
        marginBottom: '18px',
        '&:hover': {
          color: hexToRgb(BLACK_COLOR, '0.85')
        }
      }
    },
    viewMore: {
      color: MAIN_COLOR,
      cursor: 'pointer',
      fontWeight: '500'
    },

    regionsWrapper: {
      extend: 'positionsWrapper',
      borderTop: LIGHT_GREY_BORDER_STYLE
    },

    regions: {
      extend: 'positions'
    },

    topOnes: {
      background: WHITE_COLOR,
      color: hexToRgb(BLACK_COLOR, '0.75'),
      padding: '50px 0 60px 50px'
    }
  }),
  pure
)
/* eslint-disable react/prop-types */
const Home = props => {
  const {
    classes,
    professionsList,
    regionsList,
    appList,
    mainTab,
    companyTab,
    employerList,
    vacancyList,
    popVacancyList,
    searchInitial,
    isAuth,
    isEmployer,
    isApplicant,
    onSearch,
    allPositions,
    setAllPositions,
    allRegions,
    setAllRegions,
    articlesList,
    statsList,
    history
  } = props

  const vacancyCount = fp.get(['data', 'vacancyCount'], statsList)
  const resumeCount = fp.get(['data', 'resumeCount'], statsList)
  const employerCount = fp.get(['data', 'employerCount'], statsList)

  const LIST_LIMIT = 8
  const professions = fp.get('data', professionsList)
  const professionsSliced = _.slice(professions, ZERO, LIST_LIMIT)
  const professionsLoading = fp.get('loading', professionsList)

  const regions = fp.get('data', regionsList)
  const regionsSliced = _.slice(regions, ZERO, LIST_LIMIT)
  const regionsLoading = fp.get('loading', regionsList)

  const isVacancy = fp.get('value', mainTab) === 'vacancy'

  const popVacancy = fp.get('data', popVacancyList)

  const searchType = isEmployer
    ? 'resume'
    : isApplicant
      ? 'vacancy' : 'vacancy'

  const onClickProfession = (id) => {
    history.push({
      pathname: SEARCH_RESULTS_URL,
      search: queryToParams({
        industries: id,
        type: searchType
      })
    })
  }
  const onClickRegion = (region) => {
    history.push({
      pathname: SEARCH_RESULTS_URL,
      search: queryToParams({
        region,
        type: searchType
      })
    })
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.banner}>
        <Container>
          <div className={classes.content}>
            <div>
              <div className={classes.headerTitle}><T>search_main_title</T></div>
              <div className={classes.headerStats}>
                <span>{numberFormat(vacancyCount)} <T>main_vacancy</T></span>
                <span>{numberFormat(resumeCount)} <T>main_resume</T></span>
                <span>{numberFormat(employerCount)} <T>main_companies</T></span>
              </div>
              <BigSearch onSearch={onSearch} initialValues={{ type: searchInitial }}/>
            </div>
            <SearchJob/>
          </div>
          <div className={classes.popHeader}>
            <Star/>
            <T>main_popular_vacancy</T>
          </div>
          <div className={classes.populars}>
            {_.map(popVacancy, (item) => {
              const id = fp.get('id', item)
              const popTitle = fp.get('title', item)
              const owner = fp.get('owner.title', item)
              return (
                <Link to={sprintf(VACANCY_ITEM, id)} key={id}>
                  <span className={classes.popTitle}>{owner}</span>
                  <span className={classes.popContent}>
                    <span>{popTitle}</span> <Goto/>
                  </span>
                  {false && <span className={classes.popMore}>
                    <T count={'1'}>main_pop_vacancy_more</T>
                  </span>}
                </Link>
              )
            })}
          </div>
        </Container>
      </div>
      <Container>
        <Row type={'flex'}>
          <Col xs={6} className={classes.leftSide} style={{ background: '#fcfcfd' }}>
            <div className={classes.positionsWrapper}>
              <Title
                isStatic={true}
                fontSize={'20px'}
                text={'main_search_by_area'}
                className={classes.title}
              />
              {professionsLoading
                ? <div>Загрузка...</div>
                : <ul className={classes.positions}>
                  <TW>
                    {(lang) => _.map(allPositions ? professions : professionsSliced, item => {
                      const id = _.get(item, 'id')
                      const name = getTranslate(item, lang)
                      return (
                        <li onClick={() => onClickProfession(id)} key={id}>{name}</li>
                      )
                    })}
                  </TW>
                  <div onClick={() => setAllPositions(!allPositions)} className={classes.viewMore}>
                    {allPositions ? <T>button_hide</T> : <T>button_show_all</T>}
                  </div>
                </ul>}
            </div>
            <div className={classes.regionsWrapper}>
              <Title
                fontSize={'20px'}
                isStatic={true}
                text={'main_search_by_region'}
                className={classes.title}
              />
              {regionsLoading
                ? <div>Загрузка...</div>
                : <ul className={classes.regions}>
                  <TW>
                    {(lang) => _.map(allRegions ? regions : regionsSliced, (item) => {
                      const id = _.get(item, 'id')
                      const name = getTranslate(item, lang)
                      return (
                        <li onClick={() => onClickRegion(id)} key={id}>{name}</li>
                      )
                    })}
                  </TW>
                  <div onClick={() => setAllRegions(!allRegions)} className={classes.viewMore}>
                    {allRegions ? <T>button_hide</T> : <T>button_show_all</T>}
                  </div>
                </ul>}
            </div>
          </Col>
          <Col className={classes.topOnes} xs={18}>
            {!isAuth && (
              <Vacancies
                data={isVacancy ? vacancyList : appList}
                {...mainTab}
              />
            )}
            {isEmployer && (
              <React.Fragment>
                <Title isStatic={true} text={'main_search_by_resume'}/>
                <CardList
                  type={APP}
                  data={appList}
                  span={12}
                  moreText={<T>button_more_specialist</T>}
                  marginBottom={'20px'}
                  link={'/results?type=resume'}
                  gutter={20}/>
              </React.Fragment>
            )}
            {isApplicant && (
              <React.Fragment>
                <Title isStatic={true} text={'main_new_vacancy'}/>
                <CardList
                  type={VACANCY}
                  data={vacancyList}
                  moreText={<T>button_more_vacancy</T>}
                  link={'/results?type=vacancy'}/>
              </React.Fragment>
            )}
            <Companies {...companyTab} data={employerList}/>
            <NewsFeed data={articlesList}/>
            <BigBanner/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object,
  companyTab: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  mainTab: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  professionsList: PropTypes.object,
  appList: PropTypes.object,
  employerList: PropTypes.object,
  vacancyList: PropTypes.object,
  regionsList: PropTypes.object,
  onSearch: PropTypes.func.isRequired
}

export default enhance(Home)
