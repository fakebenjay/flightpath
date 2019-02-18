import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Account from './account'
import Friends from './friends'
import Location from './location'
import Trip from './trips'
import Activity from './activity'
import CurrentTrip from './currentTrip'
import activitySearch from './activitySearch'
import Errors from './errors'

const rootReducer = combineReducers({
  Account, Friends, Location, Trip, router: routerReducer, activitySearch, CurrentTrip, Activity, Errors
})

export default rootReducer
