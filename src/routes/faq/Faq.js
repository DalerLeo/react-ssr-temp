import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import injectSheet from 'react-jss'
import { getTranslate } from 'helpers/translate'
import CollapsedIcon from 'react-icons/lib/md/add'
import ExpandedIcon from 'react-icons/lib/md/remove'
import Collapse from 'antd/lib/collapse'
import Panel from 'antd/lib/collapse/CollapsePanel'
import Container from 'components/Container'
import SideAnchor from 'components/SideAnchor'
import TW from 'components/TW'

const withStyles = injectSheet({
  wrapper: {
    ...fallbacksStyle('display', 'flex'),
    padding: '58px 0 80px'
  },
  content: {
    ...crossBrowserify('flexGrow', '1')
  },
  block: {
    '&:not(:last-child)': {
      marginBottom: '40px'
    }
  },
  title: {
    color: 'black',
    fontSize: '22px',
    fontWeight: '600',
    lineHeight: 'normal',
    marginBottom: '30px',
    '& span': {
      color: '#A9B2BE',
      marginRight: '5px'
    }
  },
  collapse: {
    background: 'white',
    border: 'none',
    fontFamily: 'inherit',
    '& > $panel > .ant-collapse-header': {
      color: 'inherit',
      padding: '20px !important',
      outline: 'none'
    }
  },
  panel: {
    ...crossBrowserify('transition', 'all 200ms'),
    background: '#F6F7F9',
    borderRadius: '4px',
    border: 'none !important',
    color: '#8993A2',
    fontWeight: '500',
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: '0'
    },
    '&.ant-collapse-item-active': {
      background: 'white',
      color: 'black',
      '& $panelIcon': {
        color: MAIN_COLOR
      }
    },
    '& .ant-collapse-content': {
      border: 'none',
      padding: '0',
      '& > .ant-collapse-content-box': {
        padding: '0 20px 20px'
      }
    }
  },
  panelIcon: {
    color: '#99A0AA',
    fontSize: '20px',
    position: 'absolute',
    right: '20px'
  },
  panelHeader: {}
})

const Faq = props => {
  const { classes, faqList } = props
  const list = fp.get('data', faqList)
  const groupedList = fp.groupBy(fp.get('parent.id'), list)
  const getParentName = (id, lang) => {
    const parent = fp.flow(
      fp.find(item => fp.get('parent.id', item) === fp.toInteger(id)),
      fp.get('parent')
    )(list)
    return getTranslate(parent, lang)
  }

  const anchors = lang => loMap(groupedList, (item, parent) => {
    return {
      isTranslated: true,
      name: getParentName(parent, lang),
      href: parent
    }
  })

  return (
    <Container>
      <div className={classes.wrapper}>
        <TW>
          {lang => (
            <SideAnchor
              offsetTop={191}
              offsetBottom={522}
              list={anchors(lang)}
            />
          )}
        </TW>
        <div className={classes.content}>
          {loMap(groupedList, (questions, parent) => {
            const title = getParentName(parent)
            return (
              <div id={parent} key={parent} className={classes.block}>
                <div className={classes.title}><span>F.A.Q.</span>{title}</div>
                <Collapse
                  className={classes.collapse}
                  bordered={true}
                  expandIcon={({ isActive }) => {
                    return (
                      <span>
                        {isActive
                          ? <ExpandedIcon className={classes.panelIcon} />
                          : <CollapsedIcon className={classes.panelIcon} />}
                      </span>
                    )
                  }}
                >
                  {loMap(questions, item => {
                    const id = fp.get('id', item)
                    const question = fp.get('questionRu', item)
                    const answer = fp.get('answerRu', item)
                    return (
                      <Panel
                        key={parent + id}
                        className={classes.panel}
                        header={question}
                      >
                        {answer}
                      </Panel>
                    )
                  })}
                </Collapse>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

Faq.propTypes = {
  classes: PropTypes.object,
  faqList: PropTypes.object.isRequired
}

export default withStyles(Faq)
