import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTrips } from '../../actions/trips'
import { NavLink } from 'react-router-dom'
import TripTile from './tripTile'

class MyTrips extends Component {


  componentWillMount() {
    let token = this.props.account.token
    let account_id = this.props.account.account_id
    this.props.fetchTrips(token, account_id)
  }

  listTrips() {
    return this.props.trips.map((trip) => {
      return <TripTile key={trip.id} trip={trip}/>
    })
  }

  render() {
    return (
      <div className='container-flex'>
        <div className="padding"></div>
        {this.props.trips.length === 0 ? <h3 className="center-text">No trips planned yet? Get moving, <NavLink to="/addtrip">add</NavLink> one now</h3> : this.listTrips()}
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    trips: state.Trip,
    account: state.Account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTrips: fetchTrips,
  }, dispatch)
}


const ConnectedMyTrips = connect(mapStateToProps, mapDispatchToProps)(MyTrips)

export default ConnectedMyTrips
