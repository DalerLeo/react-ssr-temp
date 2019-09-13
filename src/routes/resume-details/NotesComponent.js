import React, { useState } from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { MAIN_COLOR } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import dateFormat from 'helpers/dateFormat'
import TextSimpleField from 'components/FormComponents/TextField/TextAreaField'
import T from 'components/T'

const styles = {
  noteWrap: {
    background: '#F9FAFC',
    padding: '25px',
    width: '100%'
  },
  onlyFewComments: {
    '&:nth-child(n + 5)': {
      display: 'none'
    }
  },
  title: {
    fontWeight: '500',
    fontSize: '15px',
    paddingBottom: '20px',
    borderBottom: '1px solid #EEF0F2',
    marginBottom: '15px'
  },
  list: {

  },
  info: {
    marginBottom: '6px',
    fontSize: '13px',
    color: hexToRgb('#000', '0.4')
  },
  note: {
    lineHeight: '20px',
    borderBottom: '1px solid #EEF0F2',
    paddingBottom: '12px',
    marginBottom: '13px'
  },
  btn: {
    textAlign: 'right',
    marginTop: '10px',
    color: MAIN_COLOR,
    fontWeight: '500',
    '& span': {
      cursor: 'pointer'
    }
  },
  allBtn: {
    marginTop: '5px',
    marginBottom: '15px',
    textAlign: 'center',
    color: MAIN_COLOR,
    fontWeight: '500',
    '& span': {
      cursor: 'pointer'
    }
  }
}
const NotesComponent = props => {
  const { classes, onComment, commentList, onAllComment, loading } = props

  const list = fp.get('data', commentList)

  const [comment, setComment] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const sendComment = () => {
    onComment(comment)
    return setComment(null)
  }

  const onShowAllComments = () => {
    onAllComment()
    setShowAll(true)
  }

  const onHideAllComments = () => {
    setShowAll(false)
  }

  return (
    <div className={classes.noteWrap}>
      <div className={classes.title}><T>resume_comments</T>:</div>
      <div>
        {fp.map(item => {
          const user = fp.get('user.0', item)
          return (
            <div key={item.id} className={classNames({
              [classes.onlyFewComments]: !showAll
            })}>
              <div className={classes.info}>
                <div>{dateFormat(fp.get('createdDate', item))}</div>
                <div>{user}</div>
              </div>
              <div className={classes.note}>
                {fp.get('comment', item)}
              </div>
            </div>
          )
        }, list)}
      </div>
      {!fp.isEmpty(list) && (
        <div className={classes.allBtn}>
          {showAll
            ? <span onClick={onHideAllComments}><T>button_hide</T></span>
            : <span onClick={onShowAllComments}><T>resume_comments_all</T></span>}
        </div>
      )}
      <TextSimpleField
        value={comment}
        onPressEnter={sendComment}
        loading={loading}
        onChange={({ target }) => setComment(target.value)}
        autosize={{ minRows: 3, maxRows: 6 }}
      />
      <div className={classes.btn}>
        <span onClick={loading ? null : sendComment}><T>button_simple_add</T></span>
      </div>
    </div>
  )
}
NotesComponent.propTypes = {
  onComment: PropTypes.func.isRequired,
  commentList: PropTypes.object.isRequired,
  classes: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onAllComment: PropTypes.func.isRequired
}
export default withStyles(styles)(NotesComponent)
