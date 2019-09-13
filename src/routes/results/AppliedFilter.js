import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import loGet from 'lodash/get'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import isEmpty from 'lodash/isEmpty'
import hexToRgb from 'helpers/hexToRgb'
import { arrayObjToObj } from 'helpers/get'
import { EXPERIENCES_LIST, EMPLOYMENT_TYPE } from 'constants/backend'
import { crossBrowserify, MAIN_COLOR } from 'constants/styles'
import MdClose from 'react-icons/lib/md/close'

const Chip = ({ classes, children, onClear }) => children ? (
  <div className={classes.chip}>
    {children}
    <MdClose
      onClick={onClear}
      style={{ marginLeft: '7px', cursor: 'pointer' }}/>
  </div>
) : null

Chip.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  onClear: PropTypes.func.isRequired
}

const enhance = compose(
  connect(state => {
    return {
      values: loGet(state, 'form.SearchResultsForm.values')
    }
  }),
  injectSheet({
    wrap: {
      marginBottom: '30px'
    },
    chip: {
      padding: '4px 12px 3px 10px',
      background: hexToRgb('#c6cbd4', '0.17'),
      display: 'inline-block',
      marginRight: '12px',
      borderRadius: '4px',
      marginTop: '15px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.57'
    },
    saveSearch: {
      ...crossBrowserify('transition', 'all 300ms'),
      display: 'inline-block',
      color: MAIN_COLOR,
      cursor: 'pointer',
      fontWeight: '500',
      padding: '3px 15px',
      marginTop: '20px',
      border: '1px solid ',
      borderRadius: '12px',
      lineHeight: '18px',
      '&:hover': {
        background: MAIN_COLOR,
        color: 'white'
      }
    }
  })
)

const AppliedFilter = props => {
  const {
    classes,
    values,
    onClear,
    profList,
    onSaveSearch,
    regList
  } = props
  const arrayData = {
    ...arrayObjToObj(EMPLOYMENT_TYPE),
    ...arrayObjToObj(fp.map(i => ({ id: i.id, name: i.name }), profList))
  }

  const data = {
    resume: 'Резюме',
    vacancy: 'Вакансия',
    employer: 'Компании',
    doctoral: 'Докторантура',
    higher: 'Высшее',
    master: 'Магистратура',
    secondary: 'Среднее',
    secondary_special: 'Средне-специальное',
    full_time: 'Полный день',
    shift: 'Сменный график',
    flexible: 'Гибкий график',
    remote: 'Удаленная работа',
    camp_type: 'Вахтовый метод',
    ...arrayObjToObj(EXPERIENCES_LIST),
    ...arrayObjToObj(fp.map(i => ({ id: i.id, name: i.name }), regList))
  }

  if (isEmpty(values)) return null
  return (
    <div className={classes.wrap}>
      <div className={classes.label}>Выбранные опции</div>
      {loMap(values, (item, fieldName) => {
        if (fp.isArray(item)) {
          return fp.map(value => {
            return (
              <Chip
                key={JSON.stringify(value)}
                classes={classes}
                onClear={() => onClear({ fieldName, value })}>
                {fp.get(value, arrayData)}
              </Chip>
            )
          }, item)
        }

        return (
          <Chip
            key={item}
            classes={classes}
            onClear={() => onClear({ fieldName, value: item })}>
            {fp.get(item, data)}
          </Chip>
        )
      })}

      <div onClick={onSaveSearch} className={classes.saveSearch}>
        Сохранить результат поиска
      </div>
    </div>
  )
}

AppliedFilter.propTypes = {
  classes: PropTypes.object,
  values: PropTypes.object.isRequired,
  onClear: PropTypes.func.isRequired,
  onSaveSearch: PropTypes.func.isRequired,
  regList: PropTypes.array.isRequired,
  profList: PropTypes.array.isRequired
}

export default enhance(AppliedFilter)
