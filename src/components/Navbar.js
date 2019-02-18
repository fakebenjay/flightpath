import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import '../stylesheets/navbar.css'

class Navbar extends Component  {

  render() {
    return (
      // <nav className="navbar navbar-default">
      //   <div className="container-fluid">
      //     <a className="navbar-brand align-middle" href="/mytrips">
      //       <FontAwesome className='logo' name='globe' size='2x' href='/mytrips' /> {this.props.token ? <NavLink className="navbar-link align-middle" to="/mytrips">Flight Path</NavLink> : null }
      //     </a>
      //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarNav">
      //       <div className="navbar-nav">
      //         {this.props.token ? <NavLink className="nav-item nav-link" to="/mytrips">My Trips</NavLink> : null }
      //         {this.props.token ? <NavLink className="nav-item nav-link" to="/addtrip">Add Trip</NavLink> : null }
      //         {this.props.token ? <NavLink className="nav-item nav-link" to="/logout">Log Out</NavLink> : null }
      //       </div>
      //     </div>
      //   </div>
      // </nav>


      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-list" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {this.props.token ? <NavLink className="navbar-brand align-middle" to="/mytrips"><FontAwesome className='logo' name='globe' size='2x'/> <strong className="navbar-link">Flight Path</strong></NavLink> : null }
          </div>

          <div className="collapse navbar-collapse navbar-right" id="collapse-list">
            <ul className="nav navbar-nav">
              <li>{this.props.token ? <NavLink className="navbar-link-small" to="/mytrips">My Trips</NavLink> : null }</li>
              <li>{this.props.token ? <NavLink className="navbar-link-small" to="/addtrip">Add Trip</NavLink> : null }</li>
              <li>{this.props.token ? <NavLink className="navbar-link-small" to="/logout">Log Out</NavLink> : null }</li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

}

const mapStateToProps = (state) => ({
  token: state.Account.token
})


const ConnectedNavbar = connect(mapStateToProps, null)(Navbar)

export default ConnectedNavbar
