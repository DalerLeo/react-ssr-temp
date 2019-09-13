import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import MoreButtonLarge from 'components/MoreButton/MoreButtonLarge'
import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR, ALTERNATE_COLOR
} from 'constants/styles'
import { hexToRgb } from 'helpers'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

const enhance = compose(

  injectSheet({
    flex: fallbacksStyle('display', 'flex'),
    alignCenter: crossBrowserify('alignItems', 'center'),
    alignBaseline: crossBrowserify('alignItems', 'baseline'),
    justifyCenter: crossBrowserify('justifyContent', 'center'),
    justifyBetween: crossBrowserify('justifyContent', 'space-between'),

    wrapper: {
    },

    profiles: {
      marginBottom: '10px'
    },

    profile: {
      ...crossBrowserify('boxShadow', `3px 6px 15px ${hexToRgb(BLACK_COLOR, '0.16')}`),
      overflow: 'hidden',
      display: 'inline-block',
      marginBottom: '30px',
      minWidth: '190px',
      width: '100%',
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
      height: '235px',
      width: '100%',
      minWidth: '190px'
    },

    body: {
      fontSize: '12px',
      padding: '12px 22px 17px 32px',
      position: 'relative'
    },

    name: {
      color: '#6b6a6a',
      lineHeight: '1.33',
      fontSize: '15px',
      fontStyle: 'italic',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    more: {
      lineHeight: '34px'
    },

    info: {
      fontSize: '12px',
      fontWeight: '300',
      lineHeight: '1.42',
      color: '#6b6a6a',
      margin: '12px 0'
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
      <div className={classes.profiles}>
        <Row gutter={15}>
          {_.map(_.range(Number('8')), (item, index) => {
            return (
              <Col span={6}>
                <div key={index} className={classes.profile}>
                  <div className={classes.image}/>
                  <div className={classes.body}>
                    <div className={classes.name}>ООО "Lorem implus"</div>
                    <div className={classes.info}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nunc justo purus, malesuada eget fermentum eu, sodales at erat.
                  Aliquam quis elit ultricies, sollicitudin augue quis, tempus quam.
                    </div>
                    <MoreButtonLarge
                      text={'Подробнее'}
                      onClick={() => null}
                      style={{ lineHeight: '34px' }}
                    />
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
      <MoreButtonLarge
        text={'Больше профилей'}
        onClick={() => null}
        alignRight={true}
        style={{ lineHeight: '35px' }}
      />
    </div>
  )
}

export default enhance(TopProfiles)
