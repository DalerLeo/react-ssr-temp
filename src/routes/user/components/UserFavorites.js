import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { CardList, VACANCY_BIG, COMPANY } from 'components/Cards'
import { animationStyle } from 'constants/styles'
import Title from 'components/Title'
import Container from 'components/Container'
import RenderOrNull from 'components/Utils/RenderOrNull'

const enhance = compose(
  injectSheet({
    wrapper: {
      paddingBottom: '20px',
      '& > div:last-child': {
        marginTop: '24px'
      }
    }
  })
)

const UserFavorites = ({ classes, vacancyData, employerData }) => {
  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <RenderOrNull value={vacancyData.data}>
          <Title isStatic={true} isProfile={true} text={'menu_favorites_vacancy'}/>
          <CardList marginBottom="16px" span={24} type={VACANCY_BIG} data={vacancyData}/>
        </RenderOrNull>

        <RenderOrNull value={employerData.data}>
          <Title isStatic={true} isProfile={true} text={'menu_favorites_company'}/>
          <CardList marginBottom="16px" span={24} type={COMPANY} data={employerData} isFav={true}/>
        </RenderOrNull>
      </div>
    </Container>
  )
}

UserFavorites.propTypes = {
  classes: PropTypes.object,
  vacancyData: PropTypes.object.isRequired,
  employerData: PropTypes.object.isRequired
}

export default enhance(UserFavorites)
