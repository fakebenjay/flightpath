import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedTripRoute = ({ trips, token, computedMatch, component: Component, ...rest }) => {
  return (
      <Route {...rest} render={props => (
    (token && trips.find((trip) => trip.id === parseInt(computedMatch.params.id, 10))) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
  )
}

const mapStateToProps = (state) => ({
    token: state.Account.token,
    trips: state.Trip
})

const ConnectedProtectedTripRoute = connect(mapStateToProps, null)(ProtectedTripRoute)

export default ConnectedProtectedTripRoute
