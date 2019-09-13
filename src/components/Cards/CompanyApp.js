import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import propTypes from 'prop-types'
import ResumeImage from '../../images/resume.jpg'
import IoMdTrash from 'react-icons/lib/io/ios-trash-outline'
import { Button } from 'components/Button'

import { crossBrowserify, fallbacksStyle, PRIMARY_COLOR } from '../../constants/styles'

const enhance = compose(
  injectSheet({
    wrapper: {
      backgroundColor: '#fff',
      border: 'solid 0.5px rgba(112, 112, 112, 0.3)',
      marginBottom: '25px',
      padding: '15px 20px 20px 15px',
      width: '590px',
      boxSizing: 'border-box',
      position: 'relative'
    },
    resumeItem: {
      ...fallbacksStyle('display', 'flex')
    },
    resumeImage: {
      width: '120px',
      height: '130px',
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
      fontWeight: '300',
      color: '#232323',
      marginBottom: '5px'
    },
    resumeCity: {
      fontSize: '11px',
      lineHeight: '15px',
      color: '#232323',
      margin: '20px 0'
    },
    resumeDescription: {
      fontSize: '11px',
      lineHeight: '15px',
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#232323'
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
    rating: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('flexDirection', 'column-reverse'),
      position: 'absolute',
      top: '22px',
      right: '23px',
      whiteSpace: 'nowrap',
      fontSize: '13px',
      marginLeft: '10px',
      color: PRIMARY_COLOR,
      '& .ant-rate-star': {
        marginRight: '0',
        marginTop: '-2px'
      }
    },
    removeBtn: {
      cursor: 'pointer',
      position: 'absolute',
      top: '22px',
      right: '50px',
      lineHeight: '27px',
      padding: '0 10px 0 7px',
      fontSize: '11px',
      whiteSpace: 'nowrap',
      color: '#656565',
      background: '#e2e2e2'
    },
    noBorder: {
      border: 'none'
    },
    smallBtn: {
      fontSize: '11px',
      padding: '0 15px'
    },
    greyBtn: {
      fontSize: '11px',
      padding: '0 8px'
    },
    bottomButtons: {
      marginTop: '15px',
      '& > button': {
        marginRight: '7px'
      },
      '& > i': {
        fontSize: '15px',
        color: '#232323'
      }
    }
  })
)

const iconStyle = {
  width: '22px',
  height: '28px'
}

const Resume = ({ classes, noBorder, deleteBtn, bottomBtn }) => {
  return (
    <div className={classNames({
      [classes.wrapper]: true,
      [classes.noBorder]: noBorder
    })}>
      <div className={classes.resumeItem}>
        <img src={ResumeImage} className={classes.resumeImage}/>
        <div className={classes.resumeContent}>
          <div className={classes.resumeTitle}><b>ООО Grandford Development     </b></div>
          <div className={classes.resumeCity}>Tashkent</div>
          <div className={classes.resumeDescription}>Создание, ведение и развитие сообществ и групп в социальных сетях. Формирование контент-плана и индивидуальной стратегии продвижения (создание информационного, продающего...</div>
        </div>
        {deleteBtn &&
          <div className={classes.removeBtn}> <IoMdTrash style={iconStyle}/> Удалить</div>
        }
        {bottomBtn && <div className={classes.resumeDate}>23-мая</div>}
      </div>
      {bottomBtn &&
        <div className={classes.bottomButtons}>
          <Button
            className={classes.smallBtn}
            text={'Хочу у вас работать'}
            type={'xs'}
            alternate>
          </Button>
        </div>
      }
    </div>
  )
}

Resume.propTypes = {
  classes: propTypes.object,
  noBorder: propTypes.bool,
  deleteBtn: propTypes.bool,
  bottomBtn: propTypes.bool
}

export default enhance(Resume)
