export default function Friends(state = {potentialFriends: [], addedFriends: []}, action) {
  switch (action.type) {

    case "FETCH_FRIENDS":
      let friends = []
      action.payload.forEach((friend) => {
        let filteredFriends = state.potentialFriends.filter((friendInArray) => friendInArray.id === friend.id)
        let filteredAddedFriends = state.addedFriends.filter((friendInArray) => friendInArray.id === friend.id)
        if (filteredFriends.length < 2  && filteredAddedFriends.length === 0) {
          friends.push(friend)
        }
      })
      return Object.assign({}, state, {potentialFriends: friends})

    case 'ADD_FRIEND':
      let friendsAdded = []
      let filteredAdded = state.addedFriends.filter((friendInArray) => friendInArray.id === action.friend.id)
      if (filteredAdded.length === 0) {
        friendsAdded = [...state.addedFriends, action.friend]
      }
      return Object.assign({}, state, {addedFriends: friendsAdded})

    case 'ADD_FRIEND_TO_TRIP':
      return state

    case 'REMOVE_FRIEND':
      let filteredFriends = state.potentialFriends.filter((friend) => friend.id !== action.friend.id)
      return Object.assign({}, state, {potentialFriends: filteredFriends})

    case 'REMOVE_ADDED_FRIEND':
      let filteredAddedFriends = state.addedFriends.filter((friend) => friend.id !== action.friend.id)
      let potentialFriends = [...state.potentialFriends, action.friend]
      return Object.assign({}, state, {potentialFriends: potentialFriends, addedFriends: filteredAddedFriends})

    case "CLEAR_FRIENDS":
      return Object.assign({}, state, {potentialFriends: []})

    case "CLEAR_FRIENDS_UNMOUNT":
      return Object.assign({}, state, {potentialFriends: [], addedFriends: []})

    default:
      return state
  }
}
