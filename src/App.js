import React, { Component } from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { setToken, setAccount } from './actions/account'
import createHistory from 'history/createBrowserHistory'
import ConnectedLogin from './components/registrations-sessions/login'
import ConnectedRegister from './components/registrations-sessions/register'
import ConnectedAddTrip from './components/trip/addTrip'
import ConnectedMyTrips from './components/trip/myTrips'
import ConnectedNavbar from './components/Navbar'
import PrivateRoute from './components/routes/PrivateRoute'
import ConnectedLogout from './components/registrations-sessions/Logout'
import ConnectedTrip from './components/trip/trip'
import ProtectedTripRoute from './components/routes/ProtectedTripRoute'
import './stylesheets/font.css';


export const history=createHistory()

class App extends Component {
  componentWillMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.setToken(token)
      this.props.setAccount(token)
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={ConnectedNavbar} />
          <Switch>
            {this.props.account.account_id ? <Redirect exact from="/" to="/login" /> : <Redirect exact from="/" to="/login" />}
            {this.props.account.account_id ? <Redirect from="/login" to="/mytrips" /> : <Route path='/login' component={ConnectedLogin}/>}
            {this.props.account.account_id ? <Redirect from="/register" to="/mytrips" /> : <Route path='/register' component={ConnectedRegister}/>}
            <Route path="/logout" component={ConnectedLogout} />
            <PrivateRoute path='/addtrip' component={ConnectedAddTrip}/>
            <PrivateRoute path='/mytrips' component={ConnectedMyTrips}/>
            <ProtectedTripRoute path='/trips/:id' component={ConnectedTrip}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.Account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setToken: setToken,
    setAccount: setAccount
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
