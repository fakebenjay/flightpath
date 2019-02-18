import axios from 'axios'
import api from '../config/api'

export const editActivity = (input, activity, account) => {
  let activityID = activity.id
  let tripID = activity.trip_id
  let account_id = account.account_id
  let token = account.token
  const header = {
    headers: {'bearer': token}
  }
  let comment = {activity_id: activityID, account_id: account_id, comment: input}
  return (dispatch) => {
    let prefix = api
    axios.post(`${prefix}/accounts/${account_id}/trips/${tripID}/activities/${activityID}/comments`, {comment: comment}, header)
  }
}
