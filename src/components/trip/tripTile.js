import React from 'react'
import { Link } from 'react-router-dom'
import '../../stylesheets/panel.css'

class TripTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let trip = this.props.trip
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 pb-xs-12 pb-sm-6 pb-md-4 tile trip">
        <div className="panel panel-default trip pb-xs-12 pb-sm-6 pb-md-4">
          <div className="panel-heading trip">
            <Link to={`/trips/${trip.id}`}><strong>{trip.name}</strong><br/>to {trip.formatted_name}</Link>
          </div>
          <div className="fill trip">
              <img src={trip.img_url} className='img' alt=':('/>
          </div>
        </div>
      </div>
    )
  }

}

export default TripTile
