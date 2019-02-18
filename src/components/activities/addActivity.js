import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setRadius, setKeyword, fetchActivities, resetSearch} from '../../actions/activitySearch'
import { saveActivity } from '../../actions/activity'
import ConnectedPreviewActivityTile from './previewActivityTile'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class AddActivity extends Component {
  constructor() {
    super()
    this.state = {
      toggle: false,
      step: 1,
      max: 50,
      min: 1,
      addedActivities: []
    }

    this.handleToggle = this.handleToggle.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.renderSearchFields = this.renderSearchFields.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.renderPreviewActivities = this.renderPreviewActivities.bind(this)
  }

  componentWillMount() {
    this.props.fetchActivities(this.props.activitySearch.radius, this.props.activitySearch.keyword, this.props.currentTrip.lng, this.props.currentTrip.lat, this.props.currentTrip.id, this.props.token)
  }

  componentWillUnmount() {
    this.props.resetSearch()
  }

  changeValue(e) {
    this.props.setRadius(e)
  }

  handleChange(e) {
    this.props.setKeyword(e.target.value)
  }

  handleSearch() {
    this.props.fetchActivities(this.props.activitySearch.radius, this.props.activitySearch.keyword, this.props.currentTrip.lng, this.props.currentTrip.lat, this.props.currentTrip.id, this.props.token)
  }

  handleToggle() {
    this.setState({
      toggle: true
    })
  }

  handleClick(activity) {
    // this.props.removePotentialActivity(activity)
    let token = this.props.token
    let trip_id = this.props.currentTrip.id
    let account_id = this.props.account.account_id
    this.props.saveActivity(activity, token, trip_id, account_id)
    this.setState({
      addedActivities: [...this.state.addedActivities, activity]
    })
  }

  isAdded(activity) {
    let filteredList = this.props.tripActivities.filter((plannedActivity) => plannedActivity.name === activity.name)
    return filteredList.length !== 0
  }

  renderPreviewActivities() {
    return this.props.activitySearch.activities.map((activity, index) => {
      return <ConnectedPreviewActivityTile key={index} activity={activity} isDisabled={this.isAdded(activity)} handleClick={this.handleClick.bind(null, activity)} tripActivities={this.props.tripActivities}/>
    })
  }

  renderSearchFields() {
    return (
      <div className='row'>
        <div className='col-xs-8'>
          Keyword: <input type="text" onChange={this.handleChange} value={this.state.keyword} />
          <br/><br/>
          Radius: {this.props.activitySearch.radius} kilometers
          <Slider
            defaultValue={this.props.activitySearch.radius}
            onChange={this.changeValue}
            max={this.state.max}
            min={this.state.min}
           />
        </div>
        <div className='col-xs-4'>
          <br/>
          <button className="btn btn-primary active filter" onClick={this.handleSearch}>Filter</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container-flex">
        <div className='row search'>
          <div className="col-xs-8">
            {this.renderSearchFields()}
            <div className='row click'>
              {this.props.activitySearch.activities.length === 0 ? <h1><em>There's nothing to do here!</em></h1> : <em>Click an activity for more information</em>}
            </div>
          </div>
        </div>
        <div className="container-flex">
          {this.props.activitySearch.activities.length === 0 ? null : this.renderPreviewActivities()}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setRadius: setRadius,
    setKeyword: setKeyword,
    fetchActivities: fetchActivities,
    saveActivity: saveActivity,
    resetSearch: resetSearch
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    activitySearch: state.activitySearch,
    currentTrip: state.CurrentTrip,
    account: state.Account,
    tripActivities: state.CurrentTrip.activities,
    token: state.Account.token
  }
}

const ConnectedAddActivity = connect(mapStateToProps, mapDispatchToProps)(AddActivity)

export default ConnectedAddActivity
