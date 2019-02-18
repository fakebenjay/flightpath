import axios from 'axios'
import api from '../config/api'
import { fetchTrip } from './trips'

export const saveActivity = (activity, token, trip_id, account_id) => {
  let prefix = api
  return (dispatch) => {
  axios({
        method: 'post',
        url: `${prefix}/accounts/${account_id}/trips/${trip_id}/activities`,
        params: activity,
        headers: {'bearer': token}})
    .then(response => {
      let payload = response.data
      dispatch({type: 'ADD_ACTIVITY', payload})
    })
  }
}

export const removeActivity = (activity, token, accountId, tripId) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
  let prefix = api
  let trip_id = activity.trip_id
  axios
    .delete(`${prefix}/accounts/${accountId}/trips/${tripId}/activities/${activity.id}`, header)
    .then(response => {
      dispatch(fetchTrip(tripId, accountId, token))
    })
    .then(response => {
      dispatch({type: 'CLEAR_ACTIVITIES'})
    })
  }
}
