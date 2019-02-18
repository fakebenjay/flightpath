export default function Account(state = { token: null, username: null, account_id: null }, action) {
  switch (action.type) {
    case "SET_ACCOUNT":
      return Object.assign({}, state, {
        username: action.account.username,
        account_id: action.account.id
      })
    case "SET_TOKEN":
      return Object.assign({}, state, {
        token: action.payload
      })
    case "CLEAR_ACCOUNT":
      return Object.assign({}, state, {
        token: null,
        username: null,
        account_id: null
      })
    default:
      return state
  }
}
