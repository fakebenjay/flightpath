export default function CurrentTrip(state = {}, action) {
  switch (action.type) {
    case "FETCH_TRIP":
      return action.payload
    case "EDIT_END_DATE":
      return Object.assign({}, state, {end_date: action.payload.end_date})
    case "EDIT_START_DATE":
      return Object.assign({}, state, {start_date: action.payload.start_date})
    default:
      return state
  }
}
