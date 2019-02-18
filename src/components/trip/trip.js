import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTrip, updateStartDate, updateEndDate, leaveTrip, deleteTrip } from '../../actions/trips'
import ConnectedActivities from '../activities/activitiesList'
import ConnectedAddActivity from '../activities/addActivity'
import ConnectedAddFriendToTrip from '../friends/addFriendToTrip'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { ButtonGroup } from 'react-bootstrap';
import Modal from 'react-modal'
import { customStyles } from '../../stylesheets/modal'
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css'
import '../../stylesheets/button_tab.css'
import '../../stylesheets/background.css'

class Trip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: 'planned',
      startDate: moment(),
      endDate: moment(),
      isConfirmationModalOpen: false,
      isTransferOwnershipModalOpen: false,
      newOwner: '',
      isTransferOwnershipError: false,
      friends: [],
      error: ''
    }
    this.handleClickPlan = this.handleClickPlan.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleDateEnd = this.handleDateEnd.bind(this)
    this.handleDateStart = this.handleDateStart.bind(this)
    this.listFriends = this.listFriends.bind(this)
    this.renderDateFields = this.renderDateFields.bind(this)
    this.leaveTripClick = this.leaveTripClick.bind(this)
    this.ownerLeaveTripClick = this.ownerLeaveTripClick.bind(this)
    this.renderDelete = this.renderDelete.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.deleteTripClick = this.deleteTripClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openTransferOwnershipModal = this.openTransferOwnershipModal.bind(this)
    this.openConfirmationModal = this.openConfirmationModal.bind(this)
    this.onOwnerSelect = this.onOwnerSelect.bind(this)
    this.renderOwnerFields = this.renderOwnerFields.bind(this)
  }

  componentWillMount() {
    let tripID = this.props.match.params.id
    let accountId = this.props.account.account_id
    let token = this.props.account.token
    this.props.fetchTrip(tripID, accountId, token)
  }

  componentWillReceiveProps(nextProps) {
    let potentialFriendNames = nextProps.trip.accounts.filter((account) => account.id !== nextProps.account.account_id)
    let friendNames = potentialFriendNames.map((account) => {
      return {value: account.username, label: account.username}
    })
    this.setState({
      startDate: moment(nextProps.trip.start_date),
      endDate: moment(nextProps.trip.end_date),
      friends: friendNames
    })
  }

  handleClickPlan() {
    this.setState({
      toggle: 'planned'
    })
    let tripID = this.props.match.params.id
    let accountId = this.props.account.account_id
    let token = this.props.account.token
    this.props.fetchTrip(tripID, accountId, token)
  }

  handleClickAdd() {
    this.setState({
      toggle: 'add'
    })
    let tripID = this.props.match.params.id
    let accountId = this.props.account.account_id
    let token = this.props.account.token
    this.props.fetchTrip(tripID, accountId, token)
  }

  listFriends() {
    let friends = []
      if (this.props.trip.accounts) {
         friends = this.props.trip.accounts
      }
    if (friends.length === 0) {
      return <p className="sub-title">You haven't added any friends yet!</p>
    } else {
      return friends.map((friend, index) => <p key={index} className="sub-title">{friend.username} {friend.id === this.props.trip.creator_id ? '(owner)' : null}</p>)
      }
    }


  handleDateStart(startDate) {
    if (startDate.isBefore(moment(this.state.endDate, "YYYY-MM-DD"))) {
      this.setState({
        error: ''
      })
      this.props.updateStartDate(startDate, this.props.trip.id, this.props.account.token, this.props.account.id)
    } else {
      this.setState({
        error: "Start Date must be before the End Date"
      })
    }
  }

  handleDateEnd(endDate) {
    if (endDate.isAfter(moment(this.state.startDate, "YYYY-MM-DD"))) {
      this.setState({
        error: ''
      })
      this.props.updateEndDate(endDate, this.props.trip.id, this.props.account.token, this.props.account.id)
    }  else {
      this.setState({
        error: "End Date must be after Start Date"
      })
    }
  }

  renderDateFields() {
    let trip = this.props.trip
    if (this.props.account.account_id === trip.creator_id) {
      return (
        <div>
          <div className="col-xs-6 col-sm-6">
            <h4>Start Date</h4>
            <DatePicker className="custom-input trip-edit-field" selected={this.state.startDate} onChange={this.handleDateStart}/>
          </div>
          <div className="col-xs-6 col-sm-6">
            <h4>End Date</h4>
            <DatePicker className="custom-input trip-edit-field" selected={this.state.endDate} onChange={this.handleDateEnd}/>
          </div>
          <div className="col-md-12 align-center">
            {this.state.error !== '' ? <h4 className="error">{this.state.error}</h4> : null}
          </div>
        </div>
      )} else {
        return (
          <div>
            <div className="col-xs-6 col-sm-6">
              <h4>Start Date</h4>
              <input className="custom-input trip-edit-field" value={trip.start_date} disabled="true"/>
            </div>
            <div className='col-xs-6 col-sm-6'>
              <h4>End Date</h4>
              <input className="custom-input trip-edit-field" value={trip.end_date} disabled="true"/>
            </div>
            <div className='col-md-12 align-center'>If you'd like to change the dates of this trip, contact the trip's owner</div>
          </div>
        )}
  }

  renderDelete() {
    let trip = this.props.trip
    if (trip.creator_id === this.props.account.id) {
      return <button onClick={this.deleteTripClick}>Delete Trip</button>
    }
  }

  closeModal() {
    this.setState({
      isConfirmationModalOpen: false,
      isTransferOwnershipModalOpen: false,
      isTransferOwnershipError: false,
      newOwner: ''
    })
  }

  openTransferOwnershipModal() {
    this.setState({
      isTransferOwnershipModalOpen: true,
    })
  }

  openConfirmationModal() {
    this.setState({
      isConfirmationModalOpen: true,
    })
  }

  deleteTripClick() {
    this.props.deleteTrip(this.props.account.account_id, this.props.account.token, this.props.trip.id)
  }

  ownerLeaveTripClick() {
    if (this.state.newOwner !== '') {
      this.props.leaveTrip(this.props.account.account_id, this.props.account.token, this.props.trip.id, this.state.newOwner)
    } else {
      this.setState({
        isTransferOwnershipError: true
      })
    }
  }

  leaveTripClick() {
    this.props.leaveTrip(this.props.account.account_id, this.props.account.token, this.props.trip.id, this.state.newOwner)
  }

  onOwnerSelect(e) {
    if (e) {
    this.setState({
      newOwner: e.value
    })}
    else {
      this.setState({
        newOwner: ''
      })
    }
  }

    handleRedirect() {
      return (
        <Redirect to={'/mytrips'}/>
      )
    }

    renderOwnerFields() {
      if (this.props.trip.accounts.length === 1) {
        return <input type="submit" value="Delete Trip" className="custom-input delete" onClick={this.openConfirmationModal}/>
      } else {
      return (
        <div>
          <input type="submit" value="Delete Trip" className="custom-input delete" onClick={this.openConfirmationModal}/>
          <input type="submit" value="Leave Trip" className="custom-input leave" onClick={this.openTransferOwnershipModal} />
        </div>
      )}
    }

  render() {
    let trip = this.props.trip
    return (
      <div className="container-flex">
        {this.state.redirect ? this.handleRedirect() : null}
        <div className="col-lg-4 col-md-12 col yellow-background align-items-center">
          <div className="d-flex trip-panel-title align-items-center">
            <h2>{trip.name}</h2>
            <h3>to {trip.formatted_name}</h3>
            {trip.creator_id === this.props.account.account_id ? this.renderOwnerFields() : <input type="submit" value="Leave Trip" className="custom-input leave" onClick={this.leaveTripClick} /> }
          </div>
          <div className="d-flex row trip-panel-title align-items-center">
            <div className="col-xs-12 col-sm-6 col-lg-12">
              {this.renderDateFields()}
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-12">
              <div className="col-xs-6 col-sm-6">
                <h4>Travelers</h4>
                {this.listFriends()}
              </div>
              <div className="col-xs-6 col-sm-6">
                <h4>Add some friends!</h4>
                <ButtonGroup vertical>
                  <ConnectedAddFriendToTrip fetchTrip={this.fetchTrip}/>
                </ButtonGroup>
              </div>
            </div>
          </div>
      </div>
      <div className="col-lg-8 col-md-12 panels">
        <div className="row tabs">
          <button className="btn btn-default tab" onClick={this.handleClickPlan} disabled={this.state.toggle === 'planned'}>Planned Activities</button>
          <button className="btn btn-default tab" onClick={this.handleClickAdd} disabled={this.state.toggle === 'add'}>Add Activity</button>
        </div>
        <div className="tile-background pre-scrollable">
          {this.state.toggle !== 'planned' ? <ConnectedAddActivity/> : <ConnectedActivities/>}
        </div>
      </div>
      <Modal isOpen={this.state.isConfirmationModalOpen} style={customStyles} onRequestClose={this.closeModal} contentLabel="Confirmation Modal">
        <h2 className="centered">Are You Sure?</h2>
        <br />
        <input type="submit" value="Confirm" className="custom-input confirm" onClick={this.deleteTripClick} />
        <input type="submit" value="Cancel" className="custom-input confirm" onClick={this.closeModal}/>
      </Modal>
      <Modal isOpen={this.state.isTransferOwnershipModalOpen} style={customStyles} onRequestClose={this.closeModal} contentLabel="Transfer Ownership Modal">
        <h2>Please Pick A New Trip Owner</h2>
        <Select
          name="form-field-name"
          value={this.state.newOwner}
          options={this.state.friends}
          onChange={this.onOwnerSelect}
        />
        <br></br>
        <input type="submit" value="Confirm" className="custom-input confirm" onClick={this.ownerLeaveTripClick} />
        <input type="submit" value="Cancel" className="custom-input confirm" onClick={this.closeModal} />
        {this.state.isTransferOwnershipError ? <h4 className="error">Please pick a valid owner!</h4> : null}
      </Modal>
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
    updateEndDate: updateEndDate,
    updateStartDate: updateStartDate,
    leaveTrip: leaveTrip,
    deleteTrip: deleteTrip
  }, dispatch)
}


const ConnectedTrip = connect(mapStateToProps, mapDispatchToProps)(Trip)

export default ConnectedTrip
