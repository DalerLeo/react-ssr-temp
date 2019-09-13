import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import Title from 'components/Title'
import MoreButton from 'components/MoreButton'
import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR, ALTERNATE_COLOR
} from 'constants/styles'
import Rate from 'antd/lib/rate'
import { hexToRgb } from 'helpers'

const ONE = 1
const FIVE = 5
const enhance = compose(

  injectSheet({
    flex: fallbacksStyle('display', 'flex'),
    alignCenter: crossBrowserify('alignItems', 'center'),
    alignBaseline: crossBrowserify('alignItems', 'baseline'),
    justifyCenter: crossBrowserify('justifyContent', 'center'),
    justifyBetween: crossBrowserify('justifyContent', 'space-between'),

    wrapper: {
      marginTop: '35px'
    },

    profiles: {

    },

    profile: {
      ...crossBrowserify('boxShadow', `3px 6px 15px ${hexToRgb(BLACK_COLOR, '0.16')}`),
      overflow: 'hidden',
      display: 'inline-block',
      margin: '0 20px 20px 0',
      minWidth: '190px',
      '&:nth-child(2n + 2)': {
        '& $image': {
          backgroundColor: hexToRgb(ALTERNATE_COLOR, '0.8')
        }
      },
      '&:nth-child(3n + 3)': {
        '& $image': {
          backgroundColor: `${hexToRgb(PRIMARY_COLOR, '0.9')} !important`
        }
      },
      '&:nth-child(4n + 4)': {
        marginRight: '0',
        '& $image': {
          backgroundColor: `${hexToRgb(ALTERNATE_COLOR, '0.9')} !important`
        }
      }
    },

    image: {
      backgroundColor: hexToRgb(PRIMARY_COLOR, '0.8'),
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      height: '160px',
      width: '100%',
      minWidth: '190px'
    },

    body: {
      fontSize: '12px',
      padding: '10px 25px 10px 15px',
      position: 'relative'
    },

    position: {
      color: '#272727',
      fontWeight: '600',
      lineHeight: '17px',
      minHeight: '34px',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    createdDate: {
      fontStyle: 'italic'
    },

    experience: {
    },

    rating: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('flexDirection', 'column-reverse'),
      position: 'absolute',
      top: '10px',
      right: '8px',
      whiteSpace: 'nowrap',
      fontSize: '11px',
      marginLeft: '10px',
      color: PRIMARY_COLOR,
      '& .ant-rate-star': {
        marginRight: '0',
        marginTop: '-2px'
      }
    },

    moreButton: {
      cursor: 'pointer',
      position: 'absolute',
      padding: '7px 16px',
      right: '0',
      top: 'calc(50% - 19px)',
      '& > div': {
        background: '#95989A',
        borderRadius: '50%',
        marginTop: '3px',
        height: '6px',
        width: '6px',
        '&:first-child': {
          marginTop: '0'
        }
      }
    },

    moreItems: {
      textAlign: 'center',
      marginTop: '5px'
    },

    itemsCount: {
      borderBottom: `1px solid ${hexToRgb('#707070', '0.14')}`,
      color: hexToRgb('#1f1f1f', '0.3'),
      display: 'inline-block',
      padding: '25px 5px',
      position: 'relative',
      '&:after': {
        background: PRIMARY_COLOR,
        content: '""',
        clear: 'both',
        position: 'absolute',
        bottom: '-1px',
        left: '0',
        height: '1px',
        width: '70px'
      }
    },

    loadMore: {
      marginTop: '28px',
      '& > button': {
        background: WHITE_COLOR,
        border: '1px #1f1f1f solid',
        borderRadius: '50px',
        cursor: 'pointer',
        color: '#1f1f1f',
        display: 'inline-block',
        outline: 'none',
        padding: '13px 29px'
      }
    }
  })
)

const TopProfiles = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <Title text={'Топ профилей'}/>
      <div className={classes.profiles}>
        {_.map(_.range(Number('8')), (item, index) => {
          return (
            <div key={index} className={classes.profile}>
              <div className={classes.image}/>
              <div className={classes.body}>
                <div className={classes.position}>Психолог</div>
                <div className={classes.experience}><i>Опыт:</i> 3 года</div>
                <div className={classes.createdDate}>добавлено: 24.05.2018</div>
                <Rate
                  allowHalf
                  disabled
                  className={classes.rating}
                  defaultValue={_.random(ONE, FIVE)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <MoreButton
        text={'Больше профилей'}
        onClick={() => null}
      />
    </div>
  )
}

export default enhance(TopProfiles)
