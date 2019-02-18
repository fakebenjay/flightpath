export default function Activity(state = [], action) {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return [...state, action.payload].reverse()
    case "CLEAR_ACTIVITIES":
      return []
    default:
      return state.reverse()
  }
}
