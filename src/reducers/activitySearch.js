const defaultState = { keyword: 'attraction', radius: 25, activities: []}
export default function activitySearch(state = defaultState, action) {
  switch (action.type) {
    case "SET_RADIUS":
      return Object.assign({}, state, {radius: action.radius})
      case "SET_KEYWORD":
        return Object.assign({}, state, {keyword: action.keyword})
      case "FETCH_ACTIVITIES":
        let newActivites = action.payload
        return Object.assign({}, state, {activities: newActivites})
      case "RESET_ACTIVITY_SEARCH":
          return defaultState
      default:
        return state
  }
}
