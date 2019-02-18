export default function Location(state = {locations: [], formattedName: '', googleId: null, hasBeenFound: false, redirect: false}, action) {
  switch (action.type) {
    case "SET_LOCATION":
      let newState = Object.assign({}, state)
      newState.formattedName = action.payload.formatted_name
      newState.googleId = action.payload.google_id
      newState.hasBeenFound = true
      return newState
    case "SET_LOCATIONS":
      let newLocations = action.payload
      let updatedState = Object.assign({}, state, {locations: newLocations})
      return updatedState
    case "CLEAR_LOCATIONS":
      return Object.assign({}, state, {locations: []})
    case "RESET_LOCATIONS":
      return {locations: [], formattedName: '', googleId: null, hasBeenFound: false}
    case "SET_REDIRECT_TRUE":
      return Object.assign({}, state, {redirect: true})
    case "RESET_SEARCH":
      return Object.assign({}, state, {locations: [], formattedName: '', googleId: null, hasBeenFound: false, redirect: false})
    default:
      return state
  }
}
