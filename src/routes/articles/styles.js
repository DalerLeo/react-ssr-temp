import {
  BLACK_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import { hexToRgb } from 'helpers'

const styles = {
  wrapper: {
    paddingTop: '56px',
    paddingBottom: '76px'
  },
  pageTitle: {
    marginBottom: '30px'
  },
  articleWrapper: {
    '&:nth-child(n + 5)': {
      marginTop: '20px'
    }
  },
  itemWrapper: {
    display: 'block',
    marginBottom: '16px',
    '&:hover': {
      color: 'unset'
    },
    '&:focus': {
      color: 'unset'
    }
  },
  item: {
    backgroundColor: '#efefef',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    height: '465px'
  },
  text: {
    background: hexToRgb(BLACK_COLOR, '0.5'),
    color: WHITE_COLOR,
    padding: '30px 50px',
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    height: '50%'
  },
  link: {
    background: hexToRgb('#8249a3', '0.5')
  },
  title: {
    fontSize: '25px',
    fontWeight: '600',
    marginBottom: '24px'
  },
  description: {
    fontSize: '15px',
    lineHeight: '20px'
  }
}

export default styles
