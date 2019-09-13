const styles = {
  wrapper: {
    fontSize: '25px',
    lineHeight: '1.32',
    color: '#565656'
  },
  imgWrapper: {
    position: 'relative',
    '& > div:first-child': {
      height: 'calc(100vh - 98px)',
      marginBottom: '100px',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    '& > div:last-child': {
      whiteSpace: 'nowrap',
      position: 'absolute',
      color: 'white',
      fontSize: '50px',
      fontWeight: '600',
      textShadow: '0 3px 7px rgba(0, 0, 0, 0.74)',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      '& span': { display: 'block' }
    }
  },
  button: {
    margin: '128px 0 100px',
    textAlign: 'center',
    '& span': {
      lineHeight: '28px',
      display: 'inline-block',
      backgroundColor: '#65218f',
      padding: '20px 48px',
      fontSize: '25px',
      fontWeight: '600',
      color: '#fff'
    }
  },
  text: {
    margin: '0 146px'
  },
  image: {
    '& img': {
      margin: '50px 0 100px',
      width: '100%'
    },
    '& div': {
      fontStyle: 'italic',
      margin: '30px 0 100px'
    }
  }
}

export default styles
