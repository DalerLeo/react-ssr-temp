import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import { Checkbox } from 'components/FormComponents'
import Container from 'components/Container'
import Title from 'components/Title'
import Dropdown from 'components/Dropdown'

const withStyles = injectSheet({
  container: {
    padding: '58px 0 80px'
  },
  title: {
    marginBottom: '40px'
  },
  listWrap: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('flexWrap', 'wrap')
  },
  checkboxWrap: {
    ...crossBrowserify('borderRadius', '4px'),
    ...crossBrowserify('transition', 'all 300ms 100ms'),
    background: '#fff',
    border: '1px solid #DFE1E7',
    padding: '15px 30px 15px 15px',
    position: 'relative',
    marginRight: '15px',
    width: 'calc((100% / 3) - 10px)',
    '&:nth-child(3n + 3)': {
      marginRight: '0'
    },
    '&:nth-child(n + 4)': {
      marginTop: '20px'
    }
  },
  checkboxWrapActive: {
    borderColor: MAIN_COLOR
  },
  checkbox: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'initial'),
    height: 'auto'
  },
  dropdown: {
    top: '8px'
  }
})

const data = [
  { id: 1, dropdown: true, title: 'Подходящие вакансии' },
  { id: 2, dropdown: true, title: 'Explicabo quasi. Facilis fringilla pulvinar exercitation.' },
  { id: 3, dropdown: false, title: 'Non molestias cillum voluptate magni.' },
  { id: 4, dropdown: false, title: 'Culpa nascetur vitae luctus mus.' },
  { id: 5, dropdown: false, title: 'Aliquet sapien aliquet quam integer.' },
  { id: 6, dropdown: false, title: 'Dignissimos, atque, facere! Amet, viverra.' },
  { id: 7, dropdown: true, title: 'Sodales tortor magna semper atque.' },
  { id: 8, dropdown: false, title: 'Facilis aliquam quidem? Eiusmod bibendum.' },
  { id: 9, dropdown: false, title: 'Placerat placerat turpis animi exercitationem.' },
  { id: 10, dropdown: false, title: 'Diamlorem consectetuer lectus maecenas tempora.' },
  { id: 11, dropdown: true, title: 'Ante dis praesent exercitationem eaque.' }
]

const Subscription = props => {
  const { classes } = props

  const [selected, setSelected] = useState([])

  const onChange = fp.curry((id, event) => {
    const checked = fp.get('target.checked', event)
    if (checked) {
      return setSelected([...selected, id])
    }
    return setSelected(fp.filter(item => item !== id, selected))
  })

  const dropdownActions = id => [
    { text: 'button_simple_edit', action: () => console.warn(id) }
  ]

  return (
    <Container>
      <div className={classes.container}>
        <Title className={classes.title} text={'Мои подписки'}/>
        <div className={classes.listWrap}>
          {fp.map(item => {
            const id = fp.get('id', item)
            const title = fp.get('title', item)
            const dropdown = fp.get('dropdown', item)
            const checked = fp.includes(id, selected)
            return (
              <div key={id} className={classNames(classes.checkboxWrap, {
                [classes.checkboxWrapActive]: checked
              })}>
                <Checkbox
                  checked={checked}
                  className={classes.checkbox}
                  label={title}
                  onChange={onChange(id)}
                />
                {dropdown &&
                <Dropdown
                  type={'vertical'}
                  className={classes.dropdown}
                  actions={dropdownActions(id)}
                />}
              </div>
            )
          }, data)}
        </div>
      </div>
    </Container>
  )
}

Subscription.propTypes = {
  classes: PropTypes.object
}

export default withStyles(Subscription)
