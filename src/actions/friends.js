import axios from 'axios'
import api from '../config/api'


export const addFriend = (friend) => {
  return {
    type: "ADD_FRIEND",
    friend
  }
}

export const removeFriend = (friend) => {
  return {
    type: "REMOVE_FRIEND",
    friend
  }
}

export const removeAddedFriend = (friend) => {
  return {
    type: "REMOVE_ADDED_FRIEND",
    friend
  }
}

export const clearFriends = () => ({
  type: "CLEAR_FRIENDS"
})


export const fetchFriends = (query, token) => {
  return (dispatch) => {
    let prefix = api
    axios({
        method: 'get',
        url: `${prefix}/friends`,
        params: {query: query},
        headers: {'bearer': token}})
      .then(response => {
        let payload = response.data
        dispatch({type: 'FETCH_FRIENDS', payload})
      })
  }
}

export const addFriendToTrip = (friend, tripObj, token) => {
  let trip = {id: tripObj.id, friend_id: friend.id}
  return (dispatch) => {
    let prefix = api
    axios({
        method: 'patch',
        url: `${prefix}/accounts/${tripObj.creator_id}/trips/${trip.id}`,
        params: trip,
        headers: {'bearer': token}})
      .then(response => {
        let payload = response.data
        dispatch({type: 'FETCH_TRIP', payload})
      })
  }
}
