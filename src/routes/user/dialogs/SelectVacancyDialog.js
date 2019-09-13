import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import Icon from 'antd/lib/icon'
import map from 'lodash/map'
import Dialog from 'components/Dialog'
import Paginator from '../components/Paginator'
import { Button } from 'components/Button/index'
import Company from 'components/Cards/VacancyBigCard'
import { PRIMARY_LIGHT } from 'constants/styles'

const enhance = compose(
  injectSheet({
    dialogBody: {
      lineHeight: '1',
      padding: '50px 43px 0 90px'
    },

    field: {
      marginBottom: '25px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    header: {
      fontSize: '33px',
      fontWeight: 'bold',
      color: PRIMARY_LIGHT
    },
    actionButtons: {
      textAlign: 'right',
      marginTop: '70px'
    },

    orderBtn: {
      fontSize: '20px',
      padding: '0 84px'
    },
    text: {
      color: '#3d3d3d',
      fontSize: '15px',
      lineHeight: '1.8',
      margin: '30px 127px 30px 0'
    },
    iconClass: {
      width: '30px',
      height: '30px'
    },
    resume: {
      maxHeight: '1070px',
      overflow: 'auto',
      marginRight: '258px'
    },
    body: {
      backgroundColor: '#f5f5f5',
      margin: '0 -43px 0 -90px',
      padding: '30px 43px 50px 90px'
    },
    title: {
      fontSize: '20px',
      color: PRIMARY_LIGHT,
      marginBottom: '34px'
    },
    paginator: {
      marginRight: '306px !important'
    }
  })
)

const data = [
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  },
  {
    v: 'Графический дизайнер',
    c: '45',
    f: '14',
    i: '8',
    d: '5',
    w: '1'
  }
]
const HighlightDialog = props => {
  const {
    open,
    onClose,
    onSubmit,
    classes,
    loading
  } = props
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      handleClose={onClose}
      iconClass={classes.iconClass}
      width={1024}>
      <form onSubmit={onSubmit} className={classes.dialogBody}>
        <div className={classes.fields}>
          <div className={classes.header}>
            ООО Grandford Development
            Ташкент
          </div>
          <div className={classes.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at erat a Leo
            ultrices euismod vitae non lacus. Integer nec lectus ex. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet
            , consectetur adipiscing elit. Nunc at erat a Leo ultrices euismod vitae non lacus.
            Integer nec lectus ex. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.
          </div>
          <div className={classes.body}>
            <div className={classes.title}>Вакансии компании</div>
            <div className={classes.resume}>
              {map(data, (card, index) => (
                <Company key={index}/>
              ))}
            </div>
            <Paginator className={classes.paginator}/>
            <div className={classes.actionButtons}>
              <Button
                type={'medium'}
                text={loading ? <Icon type={'loading'}/> : 'Отправить'}
                className={classes.orderBtn}/>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  )
}

HighlightDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default enhance(HighlightDialog)
