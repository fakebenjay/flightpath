import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTrip } from '../../actions/trips'
import { removeActivity } from '../../actions/activity'
import ActivityTile from './activityTile'

class ActivitiesList extends Component {
  constructor() {
    super()
    this.refreshCurrentTrip = this.refreshCurrentTrip.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  refreshCurrentTrip() {
    let tripID = this.props.trip.id
    let accountId = this.props.account.account_id
    let token = this.props.account.token
    this.props.fetchTrip(tripID, accountId, token)
  }
  handleRemove(activity) {
    let token = this.props.account.token
    let accountId = this.props.account.account_id
    let tripId = this.props.trip.id
    this.props.removeActivity(activity, token, accountId, tripId)
  }
  render() {
    let actprops = this.props.trip.activities
    let activities = []
    if (actprops) {
      activities = actprops.map((activity, index) => {
        return <ActivityTile key={activity.id} activity={activity} trip={this.props.trip} onRemove={this.handleRemove} friends={this.props.trip.accounts} account={this.props.account} refreshCurrentTrip={this.refreshCurrentTrip}/>
      })
    }
    return (
      <div className="container-flex">
        <div className='row click'>
          {activities.length === 0 ? <h1><em>Add some activities!</em></h1> : <em>Click an activity's photo to comment, or click on its title for more information</em>}
        </div>
        <div className="container-flex">
          {activities}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trip: state.CurrentTrip,
    account: state.Account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTrip: fetchTrip,
    removeActivity: removeActivity
  }, dispatch)
}

const ConnectedActivities = connect(mapStateToProps, mapDispatchToProps)(ActivitiesList)

export default ConnectedActivities
