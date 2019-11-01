import {
  FIELD_BORDER_COLOR,
  DATE_COLOR,
  GREY_BORDER_STYLE,
  BLACK_COLOR,
  ANCHOR_DISABLED,
  maxLineClamp
} from '../../constants/styles'
import { ARTICLES_ITEM_URL } from '../../constants/routes'
import _ from 'lodash'
import React from 'react'
import sprintf from 'sprintf'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import hexToRgb from '../../helpers/hexToRgb'
import Link from '../../components/Link'

const enhance = compose(
  injectSheet({
    itemWrapper: {
      ...ANCHOR_DISABLED,
      borderRadius: '4px',
      border: GREY_BORDER_STYLE,
      display: 'block',
      overflow: 'hidden',
      height: '100%'
    },
    noImageWrapper: {
      paddingTop: '78px',
      backgroundColor: hexToRgb(FIELD_BORDER_COLOR, '0.4'),
      '& > div': {
        height: '258px'
      }

    },
    item: {
      minHeight: '300px',
      height: '100%'
    },
    image: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '170px'
    },
    text: {
      position: 'relative',
      fontFamily: '\'Montserrat\', sans-serif',
      color: BLACK_COLOR,
      padding: '12px 20px'
    },
    tag: {
      borderRadius: '5px',
      position: 'absolute',
      left: '20px',
      bottom: 'calc(100% + 15px)',
      background: '#5e77ff',
      fontSize: '12px',
      fontWeight: '500',
      color: '#fff',
      lineHeight: '25px',
      padding: '0 10px'
    },
    article: {
      background: '#F9AE46'
    },
    tagNoImage: {
      bottom: 'calc(100% + 3px)'
    },
    date: {
      color: DATE_COLOR
    },
    title: {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.57',
      maxHeight: '3.14em',
      overflow: 'hidden',
      margin: '3px 0'
    },
    description: {
      ...maxLineClamp('3'),
      color: hexToRgb(BLACK_COLOR, '0.7'),
      fontSize: '13px',
      fontWeight: 'normal',
      lineHeight: '22px'
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
    }
  })
)

const ArticleCard = props => {
  const { classes, data, id, smooth } = props
  const title = _.get(data, 'title')
  const description = _.get(data, 'description')
  const image = _.get(data, 'photo.file')
  const isArticle = _.get(data, 'type') === 'article'
  const link = _.get(data, 'link')
  return (
    <Link
      smooth={smooth}
      to={sprintf(ARTICLES_ITEM_URL, id)}
      className={classNames({
        [classes.itemWrapper]: true,
        [classes.noImageWrapper]: !image
      })}
    >
      <div className={classes.item}>
        {image && (
          <div className={classes.image} style={{ backgroundImage: `url(${image}` }} />
        )}
        <div className={classNames(classes.text, { [classes.link]: link })}>
          <div className={classNames({
            [classes.tag]: true,
            [classes.tagNoImage]: !image,
            [classes.article]: isArticle
          })}
          />
          <div className={classes.date} />
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

ArticleCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  smooth: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
}

ArticleCard.defaultProps = {
  smooth: false
}

export default enhance(ArticleCard)
