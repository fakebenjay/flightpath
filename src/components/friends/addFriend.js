import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFriends, addFriend, removeFriend, removeAddedFriend, clearFriends } from '../../actions/friends'
import { Button, ButtonGroup } from 'react-bootstrap';

class AddFriend extends React.Component {
  constructor() {
    super()
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.listPotentialFriends = this.listPotentialFriends.bind(this)

    this.listAddedFriends = this.listAddedFriends.bind(this)
    this.removeAddedFriendClick = this.removeAddedFriendClick.bind(this)
  }
  listPotentialFriends() {
    return this.props.friends.potentialFriends.map((friend) => {
      return <Button className="friend-button" key={friend.id} type="submit" onClick={this.handleClick.bind(null, friend)}>{friend.username}</Button>
    })
  }

  listAddedFriends() {
    return this.props.friends.addedFriends.map((friend) => {
      return <Button className="friend-button" key={friend.id} type="submit" bsStyle="success" onClick={this.removeAddedFriendClick.bind(null, friend)}>{friend.username}</Button>
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
    this.props.addFriend(e)
    this.props.removeFriend(e)
  }

  componentWillUnmount() {
    this.props.dispatch({type: "CLEAR_FRIENDS_UNMOUNT"})
  }

  render() {
    return (
      <div>
        <ButtonGroup vertical>
        <input type='text' className="custom-input trip-planning-field" placeholder="Name" onChange={this.handleChange}/>
          {this.props.friends.potentialFriends.length > 0 ? this.listPotentialFriends() : null}
          {this.props.friends.addedFriends.length > 0 ? this.listAddedFriends() : null}
        </ButtonGroup>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchFriends: fetchFriends,
    addFriend: addFriend,
    removeFriend: removeFriend,
    removeAddedFriend: removeAddedFriend,
    clearFriends: clearFriends,
    dispatch
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    friends: state.Friends,
    account: state.Account
  }
}

const ConnectedAddFriend = connect(mapStateToProps, mapDispatchToProps)(AddFriend)

export default ConnectedAddFriend
