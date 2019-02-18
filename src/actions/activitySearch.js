import axios from 'axios'
import api from '../config/api'
import { fetchTrip } from './trips'

export const setRadius = (radius) => ({
  type: "SET_RADIUS", radius
})

export const setKeyword = (keyword) => ({
  type: "SET_KEYWORD", keyword
})

export const resetSearch = () => ({
  type: "RESET_ACTIVITY_SEARCH"
})


export const fetchActivities = (radius, keyword, lng, lat, id, token) => {
  let activity = {radius: radius, keyword: keyword, lng: lng, lat: lat, id: id}
  let prefix = api
  return (dispatch) => {
  axios({
        method: 'get',
        url: `${prefix}/searchactivities`,
        params: activity,
        headers: {'bearer': token}})
    .then(response => {
      let payload = response.data
      dispatch({type: 'FETCH_ACTIVITIES', payload})
    })
  }
}
