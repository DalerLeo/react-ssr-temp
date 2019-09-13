import React from 'react'
import PropTypes from 'prop-types'
import MdSearch from 'icons/SearchIcon'
import withStyles from 'react-jss'

const styles = {
  fieldWrap: {
    position: 'relative',
    borderRadius: '18px',
    height: '36px',
    border: '1px solid #DADDE3',
    width: '220px',
    paddingLeft: '30px',
    transition: 'all 300ms',
    '&:focus': {
      outline: 'none',
      borderColor: '#b5b8be'
    }

  },
  searchIcon: {
    zIndex: '1',
    position: 'absolute',
    transform: 'translateY(-50%)',
    left: '13px',
    top: '50%'
  }
}
const SearchField = ({ classes, style, onChange, type, ...props }) => {
  return (
    <div style={{ position: 'relative', ...style }} >
      <MdSearch className={classes.searchIcon}/>
      <input
        type="text"
        className={classes.fieldWrap}
        onChange={ev => onChange({ value: ev.target.value, type })}
        {...props}
      />
    </div>
  )
}

SearchField.propTypes = {
  classes: PropTypes.object,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.any
}

SearchField.defaultProps = {
  placeholder: 'Поиск'
}

export default withStyles(styles)(SearchField)
