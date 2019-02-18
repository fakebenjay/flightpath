import axios from 'axios'
import { resetLocations } from './location'
import { history } from '../App'
import api from '../config/api'


export const editEndDate = (date) => {
  return {
    type: "EDIT_START_DATE",
    date
  }
}

export const editStartDate = (date) => {
  return {
    type: "EDIT_END_DATE",
    date
  }
}

export const addTrip = (trip, token, account_id, friends) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
    let prefix = api
    axios
      .post(`${prefix}/accounts/${account_id}/trips`, {trip: trip, friends: friends}, header)
        .then(response => {
        let trip = response.data
        dispatch({type: 'ADD_TRIP', trip})
      }).then(() => {
        dispatch({type: "SET_REDIRECT_TRUE"})
        dispatch(resetLocations())
      })
  }
}

export const fetchTrips = (token, account_id) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
    let prefix = api
    axios
      .get(`${prefix}/accounts/${account_id}/trips`, header)
      .then(response => {
        let payload = response.data
        dispatch({type: 'FETCH_TRIPS', payload})
      })
      .catch((error) => {
        dispatch(history.push('/logout'))
      })
  }
}


export const fetchTrip = (tripId, accountId, token) => {
  const header = {
    headers: {'bearer': token}
  };
  return (dispatch) => {
    let prefix = api
    axios
      .get(`${prefix}/accounts/${accountId}/trips/${tripId}`, header)
      .then(response => {
        let payload = response.data
        dispatch({type: 'FETCH_TRIP', payload})
      })
      .catch((error) => {
        dispatch(history.push('/logout'))
      })
    }
  }

export const updateStartDate = (date, tripId, token, accountId) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
    let prefix = api
    axios
      .post(`${prefix}/accounts/${accountId}/trips/${tripId}/change-start-date`, {start_date: date}, header)
      .then(response => {
        let payload = response.data
        dispatch({type: 'EDIT_START_DATE', payload})
      })
    }
}

export const updateEndDate = (date, tripId, token, accountId) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
    let prefix = api
    axios
      .post(`${prefix}/accounts/${accountId}/trips/${tripId}/change-end-date`, {end_date: date}, header)
      .then(response => {
        let payload = response.data
        dispatch({type: 'EDIT_END_DATE', payload})
      })
    }
}


export const leaveTrip = (accountId, token, tripId, newOwner) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
    let prefix = api
    axios
      .post(`${prefix}/accounts/${accountId}/trips/${tripId}/leavetrip`, {account_id: accountId, trip_id: tripId, new_owner: newOwner}, header)
      .then(() => {
        dispatch(history.push('/mytrips'))
      })
    }
}

export const deleteTrip = (accountId, token, tripId) => {
  const header = {
    headers: {'bearer': token}
  }
  return (dispatch) => {
    let prefix = api
    axios
      .delete(`${prefix}/accounts/${accountId}/trips/${tripId}`, header)
      .then(() => {
        dispatch(history.push('/mytrips'))
      })
    }
}
