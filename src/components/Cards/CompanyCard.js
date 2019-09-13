import fp from 'lodash/fp'
import React from 'react'
import sprintf from 'sprintf'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Image from 'images/myjob.png'
import {
  fallbacksStyle,
  maxLineClamp,
  GREY_BORDER_STYLE,
  BLACK_COLOR,
  ANCHOR_DISABLED
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import { getTranslate } from 'helpers/translate'
import { COMPANIES_ITEM_URL } from 'constants/routes'
import Link from 'components/Link'
import T from 'components/T'
import TW from 'components/TW'
import CompanyName from 'components/Cards/CompanyName'

const enhance = compose(
  injectSheet({
    company: {
      background: '#fff',
      ...ANCHOR_DISABLED,
      display: 'block',
      ...fallbacksStyle('display', 'flex'),
      fontSize: '12px',
      overflow: 'hidden',
      width: '100%',
      border: GREY_BORDER_STYLE,
      borderRadius: '4px'
    },
    image: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      height: '135px',
      width: '135px',
      minWidth: '135px'
    },
    imageSmall: {
      height: '112px',
      width: '105px',
      minWidth: '105px'
    },
    body: {
      overflow: 'hidden',
      padding: '19px 30px 19px 25px',
      position: 'relative',
      width: '100%'
    },
    name: {
      ...maxLineClamp('2'),
      fontWeight: '500',
      fontSize: '14px',
      marginBottom: '5px'
    },
    desc: {
      ...maxLineClamp('2'),
      color: hexToRgb(BLACK_COLOR, '0.7'),
      fontSize: '13px'
    },
    footer: {
      fontSize: '13px',
      marginTop: '6px',
      textTransform: 'lowercase'
    },
    invited: {
      borderColor: '#2bc48c'
    }
  })
)

const CompanyCard = props => {
  const { classes, small, data, invited } = props
  const name = fp.get('title', data)
  const id = fp.get('id', data)
  const logo = fp.get('logo.file', data) || Image
  const industry = fp.get('industry', data)
  const vacancyNum = fp.get('vacancyCount', data) || '0'
  const isApproved = fp.get('generalStatus', data) === 'moderated'
  const pinned = false
  // Const query = paramsToQuery(_.get(hashHistory, ['location', 'search']))
  // Const openServicesDialog = toBoolean(_.get(query, 'servicesDialog'))
  return (
    <Link to={sprintf(COMPANIES_ITEM_URL, id)} className={classNames(classes.company, {
      [classes.pinned]: pinned,
      [classes.invited]: invited
    })}>
      <div className={classNames({
        [classes.image]: true,
        [classes.imageSmall]: small
      })} style={{ backgroundImage: 'url(' + logo + ')' }}/>
      <div className={classes.body}>
        <CompanyName
          name={name}
          className={classes.name}
          isApproved={isApproved}
        />
        <div className={classes.desc}>
          <TW>{lang => getTranslate(industry, lang)}</TW>
        </div>
        <div className={classes.footer}>{vacancyNum} <T>main_vacancy</T></div>
      </div>
    </Link>
  )
}

CompanyCard.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object,
  small: PropTypes.bool,
  invited: PropTypes.bool,
  isFav: PropTypes.bool
}

export default enhance(CompanyCard)
