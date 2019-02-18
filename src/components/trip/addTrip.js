import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import ConnectedAddFriend from '../friends/addFriend'
import ConnectedGetLocation from './getLocation'
import { resetSearch } from '../../actions/location'
import { addTrip } from '../../actions/trips'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../stylesheets/addtrip.css'
import '../../stylesheets/submit_and_input.css'


class AddTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      startDate: moment(),
      endDate: moment(),
      lat: this.props.location.lat,
      lng: this.props.location.lng,
      formattedName: this.props.location.formattedName,
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleDateStart = this.handleDateStart.bind(this)
    this.handleDateEnd = this.handleDateEnd.bind(this)
    this.renderError = this.renderError.bind(this)
  }


  handleChange(e) {
    let target = e.target.name
    this.setState({
      [target]: e.target.value
    })
  }

  handleRedirect() {
    return (
      <Redirect to={'/mytrips'}/>
    )
  }

  handleClick() {
    let today = moment()
    if (this.props.location.hasBeenFound && this.state.name !== '' &&  this.state.endDate !== today && moment(this.state.endDate, "YYYY-MM-DD").isAfter(this.state.startDate, "YYYY-MM-DD") && moment(this.state.startDate, "YYYY-MM-DD").isAfter(moment().add(-1, 'days'))) {
      let trip = {}
      trip.formatted_name = this.props.location.formattedName
      trip.google_id = this.props.location.googleId
      trip.name = this.state.name
      trip.start_date = this.state.startDate.utc()
      trip.end_date = this.state.endDate.utc()
      let token = localStorage.getItem("token")
      let friends = []
      this.props.friends.forEach((friend) => {
        friends.push(friend.id)
      })
      this.props.addTrip(trip, token, this.props.account.account_id, friends)
      this.setState({
        error: false,
      })
    }
    else {
      this.setState({
        error: true
      })
    }
  }


  handleDateStart(date) {
    this.setState({
      startDate: date
    })
  }
  handleDateEnd(date) {
    this.setState({
      endDate: date
    })
  }

  renderError() {
    return <h3 className="error">Please make sure you fill out all of the fields correctly!</h3>
  }

  render() {
    return (
      <div>
      <div className="col-xs-12 col-sm-12">
        <div className="container-fluid">
          {this.props.location.redirect ? this.handleRedirect() : null}
          <div className="row add-trip-title-row">
            <h1 className="add-trip-title">Begin Your Journey</h1>
          </div>
          <div className="add-trip-name-row">
            <div className="col-xs-12 col-sm-6">
              <div>
                <input type='text' className="custom-input title-field form-control" placeholder='Trip Name' onChange={this.handleChange} name='name'/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 text-left">
              <ConnectedGetLocation />
            </div>
          </div>
        <div className="add-trip-row row">
          <div className="col-xs-12 col-sm-6 col-md-4 pb-xs-12 pb-sm-6">
            <p className="date-label">Departure</p>
            <DatePicker className="custom-input trip-planning-field" selected={this.state.startDate} onChange={this.handleDateStart}/>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 pb-xs-12 pb-sm-6">
            <p className="date-label">Return</p>
            <DatePicker className="custom-input trip-planning-field" selected={this.state.endDate} onChange={this.handleDateEnd}/>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 pb-xs-12 pb-sm-6">
            <p className="date-label">Invite some friends!</p>
            <ConnectedAddFriend />
          </div>
        </div>
          <div className="add-trip-button-row row">
            <input type='submit' className="custom-button add-trip-button" value='Add Trip' onClick={this.handleClick}/>
            {this.state.error ? this.renderError() : null }
          </div>
         <div className="add-trip-row">
        </div>
      </div>
    </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTrip: addTrip,
    resetSearch: resetSearch
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    account: state.Account,
    location: state.Location,
    friends: state.Friends.addedFriends
  }
}

const ConnectedAddTrip = connect(mapStateToProps, mapDispatchToProps)(AddTrip)

export default ConnectedAddTrip
