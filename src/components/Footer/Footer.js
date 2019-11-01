import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import {
  BLACK_COLOR,
  GREY_BORDER_STYLE
} from '../../constants/styles'
import hexToRgb from '../../helpers/hexToRgb'
import Container from '../Container'

const enhance = compose(
  injectSheet({
    wrapper: {
      background: '#f9fafb',
      color: '#3a3a3a',
      padding: '56px 0 32px'
    },
    menu: {
      width: '20%',
      padding: '0 25px',
      textAlign: 'left'
    },
    copyrightWrap: {
      borderTop: GREY_BORDER_STYLE,
      paddingTop: '25px',
      marginTop: '50px',
      position: 'relative'
    },
    copyright: {
      marginBottom: '6px'
    },
    copyDesc: {
      color: hexToRgb(BLACK_COLOR, '0.32'),
      fontSize: '13px',
      paddingRight: '350px'
    }
  })
)

const Footer = props => {
  const { classes } = props

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.copyrightWrap}>
          <div className={classes.copyright}>© {moment().format('YYYY')} DalerLeo </div>
          <div className={classes.copyDesc}>footer_copyright_desc</div>
        </div>
      </Container>
    </div>
  )
}

Footer.propTypes = {
  classes: PropTypes.object
}

export default enhance(Footer)
