import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { reduxForm, Field } from 'redux-form'
import { SearchFieldConfig } from 'components/FormComponents'
import Container from 'components/Container'
import PageTitle from 'components/PageTitle'
import Rate from 'antd/lib/rate'
import Icon from 'antd/lib/icon'
import Filter from './Filter'
import {
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import { SORT_LIST_BY } from 'constants/backend'
import ResumeImage from 'images/resume.jpg'

const enhance = compose(
  withState('openFilter', 'setOpenFilter', false),
  reduxForm({
    form: 'SearchResultsConfigForm'
  }),

  injectSheet({
    wrapper: {},
    container: {
      ...fallbacksStyle('display', 'flex')
    },
    header: {
      ...crossBrowserify('alignItems', 'center'),
      height: '100px'
    },
    leftSide: {
      width: '450px'
    },
    rightSide: {
      width: 'calc(100% - 450px)'
    },
    resultsCount: {
      color: '#787878',
      fontSize: '15px',
      fontStyle: 'italic',
      marginLeft: '70px',
      '& > span': {
        color: '#232121',
        fontStyle: 'normal',
        fontWeight: '600'
      }
    },
    sortResults: {
      background: '#f1efef',
      padding: '24px 62px',
      position: 'relative',
      '&:after': {
        background: 'inherit',
        content: '""',
        position: 'absolute',
        top: '0',
        left: '100%',
        bottom: '0',
        width: '100%'
      }
    },
    field: {
      width: '165px'
    },

    results: {
      padding: '56px 62px '
    },
    resumeItem: {
      display: 'flex',
      position: 'relative',
      border: 'solid 0.5px rgba(112, 112, 112, 0.3)',
      marginBottom: '25px',
      padding: '14px 23.9px 14px 15px',
      width: '586px',
      height: '207px',
      boxSizing: 'border-box'
    },
    resumeImage: {
      width: '142.2px',
      height: '153px',
      marginRight: '21.8px',
      backdropFilter: 'blur(30px)',
      webkitBackdropFilter: 'blur(30px)'
    },
    resumeContent: {
      width: '339px',
      padding: '0 !important'
    },
    resumeTitle: {
      fontStyle: 'bold',
      fontSize: '17px',
      lineHeight: '15px',
      color: '#5d3997',
      marginBottom: '7px'
    },
    resumeSalary: {
      fontSize: '15px',
      lineHeight: '15px',
      color: '#232323',
      marginBottom: '20px'
    },
    resumeProfession: {
      fontSize: '15px',
      lineHeight: '15px',
      color: '#5D3997',
      marginBottom: '5px'
    },
    resumeCity: {
      fontSize: '11px',
      lineHeight: '15px',
      color: '#232323',
      marginBottom: '20px'
    },
    resumeDescription: {
      fontSize: '11px',
      lineHeight: '15px',
      fontStyle: 'italic',
      color: '#5D3997'
    },
    resumeRightContent: {
      display: 'block',
      width: '65px',
      textAlign: '-webkit-right'
    },
    resumeDate: {
      position: 'absolute',
      right: '24px',
      bottom: '17px',
      fontSize: '15px',
      lineHeight: '20px',
      color: '#232323',
      fontStyle: 'italic'
    },
    rateStyle: {
      display: 'grid',
      marginRight: '0',
      color: '#66218f',
      height: '76.6px',
      fontSize: '13px',
      '& li': {
        width: '13.1px',
        height: '12.2px',
        marginBottom: '3.9px'
      }
    }
  })
)

const SearchResults = (props) => {
  const {
    classes,
    openFilter,
    setOpenFilter,
    professionsList,
    regionsList
  } = props

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classNames(classes.header, classes.container)}>
          <div className={classes.leftSide}>
            <PageTitle text={'Результаты поиска'}/>
          </div>
          <div className={classes.rightSide}>
            <div className={classes.resultsCount}>
              по запросу <span>"графический дизайнер"</span> найдено <span>55</span>
            </div>
          </div>
        </div>
        <div className={classNames(classes.body, classes.container)}>
          <div className={classes.leftSide}>
            <Filter
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              professionsList={professionsList}
              regionsList={regionsList}
            />
          </div>
          <div className={classes.rightSide}>
            <div className={classes.sortResults}>
              <div className={classes.field}>
                <Field
                  name={'sortBy'}
                  component={SearchFieldConfig}
                  placeholder={'Сортировать по'}
                  items={SORT_LIST_BY}
                  isStatic={true}
                />
              </div>
            </div>

            <div className={classes.results}>
              <div className={classes.resumeItem}>
                <img src={ResumeImage} className={classes.resumeImage}/>
                <div className={classes.resumeContent}>
                  <div className={classes.resumeTitle}><b>Графический дизайнер</b></div>
                  <div className={classes.resumeSalary}>2 500 000 - 4 000 000</div>
                  <div className={classes.resumeProfession}><i>ООО Grandford Development</i></div>
                  <div className={classes.resumeCity}>Tashkent</div>
                  <div className={classes.resumeDescription}>Создание, ведение и развитие сообществ и групп в социальных сетях. Формирование контент-плана и индивидуальной стратегии продвижения (создание информационного, продающего...</div>
                </div>
                <div className={classes.resumeRightContent}>
                  <Rate defaultValue={3} className={classes.rateStyle} character={<Icon type='star' style={{ color: '#66218f' }}/>}></Rate>
                </div>
                <div className={classes.resumeDate}>23-мая</div>
              </div>
              <div className={classes.resumeItem}>
                <img src={ResumeImage} className={classes.resumeImage}/>
                <div className={classes.resumeContent}>
                  <div className={classes.resumeTitle}><b>Графический дизайнер</b></div>
                  <div className={classes.resumeSalary}>2 500 000 - 4 000 000</div>
                  <div className={classes.resumeProfession}><i>ООО Grandford Development</i></div>
                  <div className={classes.resumeCity}>Tashkent</div>
                  <div className={classes.resumeDescription}>Создание, ведение и развитие сообществ и групп в социальных сетях. Формирование контент-плана и индивидуальной стратегии продвижения (создание информационного, продающего...</div>
                </div>
                <div className={classes.resumeRightContent}>
                  <Rate defaultValue={3} className={classes.rateStyle} character={<Icon type='star' style={{ color: '#66218f' }}/>}></Rate>
                </div>
                <div className={classes.resumeDate}>23-мая</div>
              </div>
              <div className={classes.resumeItem}>
                <img src={ResumeImage} className={classes.resumeImage}/>
                <div className={classes.resumeContent}>
                  <div className={classes.resumeTitle}><b>Графический дизайнер</b></div>
                  <div className={classes.resumeSalary}>2 500 000 - 4 000 000</div>
                  <div className={classes.resumeProfession}><i>ООО Grandford Development</i></div>
                  <div className={classes.resumeCity}>Tashkent</div>
                  <div className={classes.resumeDescription}>Создание, ведение и развитие сообществ и групп в социальных сетях. Формирование контент-плана и индивидуальной стратегии продвижения (создание информационного, продающего...</div>
                </div>
                <div className={classes.resumeRightContent}>
                  <Rate defaultValue={3} className={classes.rateStyle} character={<Icon type='star' style={{ color: '#66218f' }}/>}></Rate>
                </div>
                <div className={classes.resumeDate}>23-мая</div>
              </div>
              <div className={classes.resumeItem}>
                <img src={ResumeImage} className={classes.resumeImage}/>
                <div className={classes.resumeContent}>
                  <div className={classes.resumeTitle}><b>Графический дизайнер</b></div>
                  <div className={classes.resumeSalary}>2 500 000 - 4 000 000</div>
                  <div className={classes.resumeProfession}><i>ООО Grandford Development</i></div>
                  <div className={classes.resumeCity}>Tashkent</div>
                  <div className={classes.resumeDescription}>Создание, ведение и развитие сообществ и групп в социальных сетях. Формирование контент-плана и индивидуальной стратегии продвижения (создание информационного, продающего...</div>
                </div>
                <div className={classes.resumeRightContent}>
                  <Rate defaultValue={3} className={classes.rateStyle} character={<Icon type='star' style={{ color: '#66218f' }}/>}></Rate>
                </div>
                <div className={classes.resumeDate}>23-мая</div>
              </div>
              <div className={classes.resumeItem}>
                <img src={ResumeImage} className={classes.resumeImage}/>
                <div className={classes.resumeContent}>
                  <div className={classes.resumeTitle}><b>Графический дизайнер</b></div>
                  <div className={classes.resumeSalary}>2 500 000 - 4 000 000</div>
                  <div className={classes.resumeProfession}><i>ООО Grandford Development</i></div>
                  <div className={classes.resumeCity}>Tashkent</div>
                  <div className={classes.resumeDescription}>Создание, ведение и развитие сообществ и групп в социальных сетях. Формирование контент-плана и индивидуальной стратегии продвижения (создание информационного, продающего...</div>
                </div>
                <div className={classes.resumeRightContent}>
                  <Rate defaultValue={3} className={classes.rateStyle} character={<Icon type='star' style={{ color: '#66218f' }}/>}></Rate>
                </div>
                <div className={classes.resumeDate}>23-мая</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default enhance(SearchResults)
