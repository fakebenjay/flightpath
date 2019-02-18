export default function Errors(state = null, action) {
  switch (action.type) {
    case "ADD_ERRORS":
      return action.payload
    case "CLEAR_ERRORS":
      return []
    default:
      return state
  }
}
