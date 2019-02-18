import React from 'react'
import Modal from 'react-modal'
import ConnectedEditActivity from './editActivity'
import FontAwesome from 'react-fontawesome'
import '../../stylesheets/panel.css'
import { customStyles } from '../../stylesheets/modal'

class ActivityTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentModalStatus: false,
      infoModalStatus: false,
      comments: props.activity.comments
    }
    this.handleClick = this.handleClick.bind(this)
    this.openInfoModal = this.openInfoModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateState = this.updateState.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.closeModalOnClick = this.closeModalOnClick.bind(this)
  }
  handleClick() {
    this.setState({
      commentModalStatus: true
    })
  }
  openInfoModal() {
    this.setState({
      infoModalStatus: true
    })
  }
  handleRemove(e) {
    e.preventDefault()
    this.props.onRemove(this.props.activity)
  }
  closeModal() {
    this.setState({
      commentModalStatus: false,
      infoModalStatus: false
    })
    this.props.refreshCurrentTrip()
  }
  updateState(comment) {
    let id = this.state.comments.length
    let newComment = {comment: comment, id: id, author: 'me'}
    this.setState({
      comments: [...this.state.comments, newComment]
    })
  }
  closeModalOnClick() {
    this.setState({
      commentModalStatus: false,
      infoModalStatus: false
    })
  }
  render() {
    let activity = this.props.activity
    let comments = this.state.comments.map((comment, i) => {
      let author = this.props.friends.filter((friend) => {
        return friend.id === comment.account_id
      })
      if (author[0] && author[0].username !== this.props.account.username) {
        return <li key={i}><strong>{author[0].username}</strong> : {comment.comment}</li>
      } else {
        return <li key={i}><strong>Me: </strong> {comment.comment}</li>
      }

    })
    let disabled = this.props.trip.creator_id !== this.props.account.account_id
    return (
      <div className="col-lg-4 col-sm-6 col-xs-12 tile">
        <div className="panel activity panel-default">
          <div className="panel-heading activity">
            <span className='panel-name'>
              <strong className="col-xs-10 activity-title" onClick={this.openInfoModal}>{activity.name}</strong>
            </span>
            {disabled ? null : <button className="btn btn-danger btn-xs" href="" onClick={this.handleRemove}>
              <FontAwesome className='icon' name='minus'/>
            </button>
          }
          </div>
          <div onClick={this.handleClick} className="fill activity">
              <img src={activity.img_url} className='img' alt=':('/>
          </div>
        </div>
        <Modal isOpen={this.state.commentModalStatus} onRequestClose={this.closeModalOnClick} style={customStyles} contentLabel="Activity Modal">
          <h2>{activity.name}</h2>
          <ul>
            {comments}
          </ul>
          <ConnectedEditActivity activity={activity} updateState={this.updateState}/>
          <br />
          <button className="custom-input login-button" onClick={this.closeModal}>Close</button>
        </Modal>

        <Modal isOpen={this.state.infoModalStatus} onRequestClose={this.closeModalOnClick} style={customStyles} contentLabel="Activity Modal">
          <h2>{activity.name}</h2>
          <p>Address: {activity.address}</p>
          <p>Rating: {activity.rating}/5</p>
          <p>For more info and to view in Google Maps, click <a target='_blank' href={`https://www.google.com/maps/place/${activity.name}/@${activity.lat},${activity.lng},17z/`}>here</a>!</p>
        </Modal>
      </div>
    )
  }
}

export default ActivityTile
