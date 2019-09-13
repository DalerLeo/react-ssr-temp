import _ from 'lodash'
import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { reduxForm, Field } from 'redux-form'
import MdSearch from 'react-icons/lib/md/search'

import {
  RadioGroup,
  Radio,
  TextField,
  CheckboxGroup
} from 'components/FormComponents'
import { ALTERNATE_COLOR } from 'constants/styles'
import { EDUCATION_LIST, EXPERIENCES_LIST, EMPLOYMENT_TYPE } from 'constants/backend'

const enhance = compose(
  withState('expandedData', 'setExpandedData', []),
  reduxForm({
    form: 'SearchResultsForm',
    enableReinitialize: true
  }),

  injectSheet({
    wrapper: {
      background: '#f8f8f8',
      padding: '35px 35px 35px 0',
      position: 'relative',
      '&:before': {
        background: 'inherit',
        content: '""',
        position: 'absolute',
        right: '100%',
        top: '0',
        bottom: '0',
        width: '100%'
      }
    },
    filterTitle: {
      borderLeft: `4px solid ${ALTERNATE_COLOR}`,
      fontSize: '13px',
      fontWeight: '600',
      lineHeight: '32px',
      padding: '0 45px',
      marginBottom: '65px'
    },
    searchField: {
      borderWidth: '1.5px',
      height: '36px',
      width: '285px'
    },
    radio: {
      display: 'block',
      marginBottom: '10px',
      marginRight: '0',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    field: {
      color: '#909090',
      marginBottom: '35px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    label: {
      fontSize: '15px',
      fontWeight: '600',
      marginBottom: '20px'
    },
    value: {
      paddingLeft: '30px'
    },
    list: {
      transition: 'all 300ms',
      cursor: 'pointer',
      fontSize: '15px',
      marginBottom: '26px',
      '&:hover': {
        color: '#333'
      }
    },
    expand: {
      background: '#e2e2e2',
      color: '#656565',
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '15px',
      padding: '5px 18px'
    }
  })
)

const COMPANY = [
  {
    name: 'OOO "Beeline Group"',
    count: '14'
  },
  {
    name: 'OOO "Stark Industries" '
  },
  {
    name: 'OOO "Mrak" '
  },
  {
    name: 'OOO " Marvel"'
  }

]

const Filter = (props) => {
  const {
    classes,
    professionsList,
    regionsList,
    expandedData,
    setExpandedData
  } = props

  const bigData = {
    spheres: {
      title: 'Специальность',
      data: _.get(professionsList, 'data'),
      button: 'Все специальности'
    },
    regions: {
      title: 'Регионы',
      data: _.get(regionsList, 'data'),
      button: 'Все локации'
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.filterTitle}>Параметры поиска</div>
      <div className={classes.field}>
        <Field
          name={'search'}
          component={TextField}
          className={classes.searchField}
          prefix={<MdSearch/>}
        />
      </div>
      <div className={classes.field}>
        <div className={classes.label}>Раздел поиска</div>
        <div className={classes.value}>
          <Field name={'searchSection'} component={RadioGroup}>
            <Radio className={classes.radio} label={'Вакансия'} value={'vacancy'}/>
            <Radio className={classes.radio} label={'Резюме'} value={'resume'}/>
          </Field>
        </div>
      </div>
      {_.map(bigData, (item, index) => {
        const title = _.get(item, 'title')
        const data = _.get(item, 'data')
        const button = _.get(item, 'button')
        const dataCount = _.get(data, 'length')
        const start = 0
        const end = 5
        const slicedData = _.slice(data, start, end)
        const expanded = _.includes(expandedData, index)
        return (
          <div key={index} className={classes.field}>
            <div className={classes.label}>{title}</div>
            <div className={classes.value}>
              {_.map(expanded ? data : slicedData, obj => {
                const id = _.get(obj, 'id')
                const name = _.get(obj, 'name')
                return (
                  <div className={classes.list} key={id}>{name}</div>
                )
              })}
              {!expanded && dataCount > end &&
                  <div
                    className={classes.expand}
                    onClick={() => setExpandedData(_.concat(expandedData, index))}>
                    {button}
                  </div>}
            </div>
          </div>
        )
      })}
      <div className={classes.field}>
        <div className={classes.label}>Опыт работы</div>
        <div className={classes.value}>
          <Field
            name={'experience'}
            component={CheckboxGroup}
            items={_.filter(EXPERIENCES_LIST, item => item.id !== 'none')}
          />
        </div>
      </div>
      <div className={classes.field}>
        <div className={classes.label}>Образование</div>
        <div className={classes.value}>
          <Field
            name={'education'}
            component={CheckboxGroup}
            items={_.filter(EDUCATION_LIST, item => item.id !== 'no_matter')}
          />
        </div>
      </div>
      <div className={classes.field}>
        <div className={classes.label}>График работы</div>
        <div className={classes.value}>
          <Field name={'workSchedule'} component={RadioGroup}>
            {_.map(EMPLOYMENT_TYPE, item => {
              return (
                <Radio
                  key={item.id}
                  className={classes.radio}
                  value={item.id}
                  label={item.name}
                />
              )
            })}
          </Field>
        </div>
      </div>
      <div className={classes.field}>
        <div className={classes.label}>Компания</div>
        <div className={classes.value}>
          {_.map(COMPANY, (item, index) => {
            const name = _.get(item, 'name')
            const count = _.get(item, 'count')
            return (
              <div className={classes.list} key={index}>{name} <span style={{ fontStyle: 'italic' }}>{count && `(${count})`}</span></div>
            )
          })}

        </div>
      </div>

    </div>
  )
}

export default enhance(Filter)
