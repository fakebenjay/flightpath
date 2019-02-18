import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFriends, addFriendToTrip, removeFriend, removeAddedFriend, clearFriends } from '../../actions/friends'
import { Button, ButtonGroup } from 'react-bootstrap';
import '../../stylesheets/trip.css'

class AddFriendToTrip extends React.Component {
  constructor() {
    super()
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.listPotentialFriends = this.listPotentialFriends.bind(this)
    this.friendsAdded = this.friendsAdded.bind(this)
    this.removeAddedFriendClick = this.removeAddedFriendClick.bind(this)
  }

  listPotentialFriends() {
    let addedFriendUsernames = this.props.trip.accounts.map((friend) => {
      return friend.username
    })

    //The filter below may become inefficient as the site's userbase grows beyond 3 people
    //This can hypothetically be solved when we differentiate between friends and non-friends of a user

    let unaddedFriends = this.props.friends.potentialFriends.filter((friend) => {
      return !addedFriendUsernames.includes(friend.username)
    })

    return unaddedFriends.map((friend) => {
      return <Button key={friend.id} type="submit" onClick={this.handleClick.bind(null, friend)}>{friend.username}</Button>
    })
  }

  removeAddedFriendClick(e) {
    this.props.removeAddedFriend(e)
  }

  handleChange(e) {
    if (this.state.query.length > e.target.value.length) {
      this.setState({
        query: e.target.value
      })
      this.props.clearFriends()
    } else {
      this.setState({
        query: e.target.value
      })
    if (this.state.query.length > 0) {
      this.queryAPI(this.state.query)
    }
  }
}

  queryAPI(query) {
    this.props.fetchFriends(query, this.props.account.token)
  }

  handleClick(e) {
    this.props.addFriendToTrip(e, this.props.trip, this.props.account.token)
    this.props.removeFriend(e)
    this.setState({
      query: ''
    })
  }

  friendsAdded() {
    return this.props.friends.addedFriends.map((friend) => {
      return <div><li key={friend.id}>{friend.username}</li></div>
    })
  }

  componentWillUnmount() {
    this.props.dispatch({type: "CLEAR_FRIENDS"})
  }

  render() {
    return (
      <div>
        <ButtonGroup vertical>
          <input type='text' className="custom-input trip-edit-field" onChange={this.handleChange}/>
          {this.props.friends.potentialFriends.length > 0 ? this.listPotentialFriends() : null}
        </ButtonGroup>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchFriends: fetchFriends,
    addFriendToTrip: addFriendToTrip,
    removeFriend: removeFriend,
    removeAddedFriend: removeAddedFriend,
    clearFriends: clearFriends,
    dispatch
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    friends: state.Friends,
    account: state.Account,
    trip: state.CurrentTrip
  }
}

const ConnectedAddFriendToTrip = connect(mapStateToProps, mapDispatchToProps)(AddFriendToTrip)

export default ConnectedAddFriendToTrip
