import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import Title from 'components/PageTitle'
import Container from 'components/Container'
import styles from './styles'
import TopCompaniesCard from 'components/HomePage/TopCompaniesCard'
import NewsFeed from 'components/HomePage/NewsFeed'

const enhance = compose(
  withState('openDialog', 'setOpenDialog', false),
  injectSheet(styles)
)

const Companies = ({ ...props }) => {
  const { classes } = props
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.body}>
          <div className={classes.pageTitle}>
            <Title text={'Топ компании'}/>
          </div>
          <TopCompaniesCard/>
        </div>
      </Container>
      <NewsFeed/>
    </div>
  )
}

export default enhance(Companies)
