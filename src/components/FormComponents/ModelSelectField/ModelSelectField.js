import {
  crossBrowserify,
  fallbacksStyle, LABEL_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import React, { useEffect } from 'react'
import {
  compose,
  mapPropsStream,
  withReducer,
  withHandlers
} from 'recompose'
import injectSheet from 'react-jss'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import t, { getTranslate } from 'helpers/translate'
import caughtCancel from 'helpers/caughtCancel'
import hexToRgb from 'helpers/hexToRgb'
import CloseIcon from 'react-icons/lib/md/close'
import MdSearch from 'react-icons/lib/md/search'
import T from 'components/T'
import Title from 'components/Title'
import Dialog from 'components/Dialog'
import { Button, GREY } from 'components/Button'
import TextSimpleField from 'components/FormComponents/TextField/TextSimpleField'
import { Checkbox } from 'components/FormComponents'
import Label2 from '../FieldLabel/FieldLabel2'
import CheckboxGroup from '../CheckboxGroup/CheckboxWrap'

const handleData = (dispatch, api, otherParams) => {
  const params = toSnakeCase({
    pageSize: 1000,
    ordering: 'name_ru',
    ...otherParams
  })
  axios({}, true)
    .get(api, { params })
    .then(response => {
      const data = fp.get('data.results', response)
      const parent = fp.filter(item => !item.parent, data)
      const children = fp.filter(item => item.parent, data)
      const allData = fp.map(item => {
        return {
          ...item,
          children: fp.filter(fp.flow(
            fp.get('parent.id'),
            fp.isEqual(item.id)
          ),
          children)
        }
      }, parent)

      dispatch({
        data: allData,
        clonedData: allData,
        loading: false
      })
      return response
    })
    .catch(caughtCancel)
}
const enhance = compose(
  withReducer(
    'state',
    'dispatch',
    (state, action) => ({ ...state, ...action }),
    {
      open: false,
      data: [],
      clonedData: [],
      loading: false,
      text: '',
      selected: []
    }
  ),
  mapPropsStream(props$ => {
    props$
      .distinctUntilChanged(null, fp.get('state.open'))
      .filter(fp.get('state.open'))
      .subscribe(({ dispatch, api, state, params }) => {
        if (fp.isEmpty(state.data)) {
          dispatch({ loading: true })
          handleData(dispatch, api, params)
        }
      })
    return props$
  }),
  withHandlers({
    onOpen: props => (open) => {
      props.dispatch({ open })
    },
    onCancel: props => () => {
      props.dispatch({
        open: false,
        selected: []
      })
    },
    onChange: props => (values, id) => {
      const { parentsOnly } = props
      if (parentsOnly) {
        if (fp.includes(id, props.state.selected)) {
          return props.dispatch({
            selected: fp.filter(item => {
              return item !== id
            }, props.state.selected)
          })
        }
        return props.dispatch({
          selected: [...props.state.selected, id]
        })
      }
      return props.dispatch({
        selected: {
          ...props.state.selected,
          [id]: values
        }
      })
    },
    onComplete: ({ input, dispatch, parentsOnly, state }) => data => {
      input.onChange(parentsOnly ? state.selected : data)
      dispatch({ open: false })
    }
  }),
  injectSheet({
    wrapper: {
      marginBottom: '20px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    notSelected: {
      color: MAIN_COLOR,
      fontWeight: '500',
      fontSize: '14px',
      marginLeft: '17px',
      lineHeight: 'normal',
      cursor: 'pointer'
    },
    dialog: {},
    content: {
      width: '900px',
      margin: 'auto',
      background: '#f6f7f9',
      padding: '30px 50px 50px'
    },
    iconClass: {
      top: '-47px',
      right: '-120px'
    },
    title: {},
    modelField: {
      position: 'relative',
      paddingLeft: '25px',
      marginBottom: '18px'
    },
    list: {
      maxHeight: '472px',
      overflow: 'hidden',
      overflowY: 'auto',
      marginTop: '18px'
    },
    checkAll: {
      marginBottom: '15px',
      marginLeft: '25px'
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
    actionButtons: {
      marginTop: '30px',
      textAlign: 'right',
      '& > button:first-child': {
        marginRight: '25px',
        padding: '0 61px'
      }
    },

    chosenSpheres: {
      marginBottom: '15px'
    },
    sphereWrap: {
      ...crossBrowserify('borderRadius', '4px'),
      background: hexToRgb('#c6cbd4', '0.05'),
      border: '1px solid ' + hexToRgb('#c6cbd4', '0.2'),
      padding: '10px',
      '&:not(:last-child)': {
        marginBottom: '10px'
      }
    },
    sphere: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      '& svg': {
        color: hexToRgb('#000', '0.25'),
        cursor: 'pointer',
        fontSize: '18px',
        marginLeft: '8px'
      }
    },
    childSpheres: {
      marginTop: '10px'
    },
    childSphere: {
      ...crossBrowserify('borderRadius', '4px'),
      background: hexToRgb('#c6cbd4', '0.17'),
      display: 'inline-block',
      marginRight: '10px',
      marginBottom: '10px',
      padding: '5px 10px'
    }
  })
)

const ModelSelectField = props => {
  const {
    lang,
    onOpen,
    onChange,
    dispatch,
    className,
    classes,
    onComplete,
    required,
    label,
    state: {
      loading,
      data,
      clonedData,
      open,
      selected,
      text
    },
    selectLabel,
    input,
    parentsOnly,
    searchFaceted
  } = props

  const searchQuery = fp.toLower(text)
  const allData = parentsOnly
    ? fp.filter(item => {
      return fp.includes(item.id, selected)
    }, data)
    : fp.map(item => {
      const parent = fp.get('id', item)
      const children = fp.map(child => {
        return fp.get('id', child)
      }, fp.get('children', item))
      return {
        parent,
        children
      }
    }, data)

  const selectedDataFull = fp.flow(
    fp.map(item => {
      const parent = item.parent
      const children = item.children
      const parentData = fp.find({ id: parent }, data)
      const parentName = getTranslate(parentData, lang)
      const chosenChilds = fp.get(parent, selected)
      const parentIsChosen = fp.has(parent, selected) && !fp.isEmpty(chosenChilds)
      const chosenChildsAreEqual = fp.size(chosenChilds) === fp.size(children)
      if (!fp.isEmpty(chosenChilds)) {
        return {
          parent,
          name: parentName,
          isFull: parentIsChosen && chosenChildsAreEqual,
          children: fp.map(o => {
            const childrenData = fp.get('children', parentData)
            return {
              id: o,
              name: getTranslate(fp.find({ id: o }, childrenData), lang)
            }
          }, chosenChilds)
        }
      }
      return null
    }),
    fp.filter(item => item)
  )(allData)

  const onRemoveItem = (parentId, childId) => {
    if (!childId) {
      const newStateData = fp.omit([parentId], selected)
      const newInputData = fp.filter(item => {
        return parentId !== fp.get('parent', item)
      }, input.value)
      dispatch({ selected: newStateData })
      input.onChange(newInputData)
    } else {
      const parentChilds = fp.get(parentId, selected)
      const newStateData = {
        ...selected,
        [parentId]: fp.filter(child => child !== childId, parentChilds)
      }
      const newInputData = fp.map(item => {
        return {
          ...item,
          children: fp.filter(ch => {
            return ch.id !== childId
          }, item.children)
        }
      }, input.value)
      dispatch({ selected: newStateData })
      input.onChange(newInputData)
    }
  }

  const onRemoveParent = id => {
    const formedArray = fp.filter(item => {
      return item !== id
    }, selected)
    dispatch({ selected: formedArray })
    input.onChange(formedArray)
  }

  useEffect(() => {
    const filteredData = fp.filter(item => {
      const omittedItem = fp.omit(['id', 'createdDate', 'isDelete', 'parent'], item)
      const stringify = fp.toLower(JSON.stringify(omittedItem))
      return fp.includes(searchQuery, stringify)
    }, clonedData)
    dispatch({ data: filteredData })
  }, [clonedData, dispatch, searchQuery, text])

  const onCheckAll = isChecked => {
    if (isChecked) {
      const allSpheres = fp.map(item => item.id, data)
      input.onChange(allSpheres)
      dispatch({ selected: allSpheres })
    } else {
      input.onChange([])
      dispatch({ selected: [] })
    }
  }

  const allResumesCount = fp.flow(
    fp.map(item => item),
    fp.sumBy(item => item)
  )(searchFaceted)
  const isSelectedAll = fp.size(data) === fp.size(selected) && !fp.isEmpty(selected)
  const isIndeterminate = !fp.isEmpty(selected) && !isSelectedAll

  return (
    <div className={classNames(classes.wrapper, className)}>
      <Label2 label={label} required={required} />
      <div className={classes.chosenSpheres}>
        {parentsOnly
          ? isSelectedAll
            ? <div className={classes.sphereWrap}>
              <div className={classes.sphere}>
                <div>
                  <T>main_all_spheres</T>
                  <span className={classes.count}>{allResumesCount}</span>
                </div>
                <CloseIcon onClick={() => onCheckAll(false)} />
              </div>
            </div>
            : fp.map(item => {
              const id = fp.get('id', item)
              const name = fp.get('name', item)
              const resumeCount = fp.get(id, searchFaceted)
              return (
                <div key={id} className={classes.sphereWrap}>
                  <div className={classes.sphere}>
                    <div>
                      {name}
                      {resumeCount && <span className={classes.count}>{resumeCount}</span>}
                    </div>
                    <CloseIcon onClick={() => onRemoveParent(id)} />
                  </div>
                </div>
              )
            }, allData)
          : fp.map(item => {
            const parentId = fp.get('parent', item)
            const parentName = fp.get('name', item)
            const isFull = fp.get('isFull', item)
            const children = fp.get('children', item)
            return (
              <div key={parentId} className={classes.sphereWrap}>
                <div className={classes.sphere}>
                  {parentName}
                  <CloseIcon onClick={() => onRemoveItem(parentId)} />
                </div>
                {!isFull &&
                <div className={classes.childSpheres}>
                  {fp.map(ch => {
                    const childrenId = fp.get('id', ch)
                    const childrenName = fp.get('name', ch)
                    return (
                      <div key={childrenId} className={classNames(classes.sphere, classes.childSphere)}>
                        {childrenName}
                        <CloseIcon onClick={() => onRemoveItem(parentId, childrenId)} />
                      </div>
                    )
                  }, children)}
                </div>}
              </div>
            )
          }, selectedDataFull)}
      </div>
      <div
        onClick={() => onOpen(true)}
        className={classes.notSelected}
      >{selectLabel}
      </div>

      <Dialog
        open={open}
        className={classes.dialog}
        handleClose={() => onOpen(false)}
        iconClass={classes.iconClass}
        width={900}
      >
        <div className={classes.content}>
          <Title
            fontSize="20px"
            margin="0 0 16px 0"
            text={t('main_sphere', lang)}
          />

          <TextSimpleField
            prefix={<MdSearch />}
            onChange={({ target }) => dispatch({ text: target.value })}
            placeholder={t('main_fast_search', lang)}
          />
          <div className={classes.list}>
            {loading && <div>Loading...</div>}
            {parentsOnly &&
            <Checkbox
              label=""
              className={classes.checkAll}
              checked={isSelectedAll}
              indeterminate={isIndeterminate}
              onChange={event => onCheckAll(event.target.checked)}
            >
              <span>
                <T>main_all_spheres</T>
                <span className={classes.count}>{allResumesCount}</span>
              </span>
            </Checkbox>}
            {fp.map(item => {
              return (
                <div key={item.id} className={classes.modelField}>
                  <CheckboxGroup
                    item={item}
                    lang={lang}
                    search={searchQuery}
                    selected={selected}
                    onChange={(value) => onChange(value, item.id)}
                    parentsOnly={parentsOnly}
                    searchFaceted={searchFaceted}
                  />
                </div>
              )
            }, data)}
          </div>
          <div className={classes.actionButtons}>
            <Button
              text="button_cancel"
              onClick={() => onOpen(false)}
              color={GREY}
              type="medium"
            />
            <Button
              onClick={() => onComplete(selectedDataFull)}
              style={{ padding: '0 58px' }}
              text="button_select"
              type="medium"
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

ModelSelectField.defaultProps = {
  withLabel: false
}
ModelSelectField.propTypes = {
  lang: PropTypes.string.isRequired,
  state: PropTypes.shape({
    open: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  dispatch: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
  input: PropTypes.object,
  className: PropTypes.string,
  api: PropTypes.string.isRequired,
  classes: PropTypes.object,
  required: PropTypes.bool,
  label: PropTypes.string,
  selectLabel: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  parentsOnly: PropTypes.bool
}

export default enhance(ModelSelectField)
