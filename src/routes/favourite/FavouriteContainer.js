import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import { getDataFromState } from 'utils/get'
import Favourite from './Favourite'

const FavouriteContainer = props => {
  const favouriteList = useSelector(getDataFromState(STATE.FAVOURITE_LIST), equals)

  return <Favourite favouriteList={favouriteList} />
}

export default FavouriteContainer
