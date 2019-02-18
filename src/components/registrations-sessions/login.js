import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, clearErrors } from '../../actions/account'
import { Redirect, NavLink } from 'react-router-dom'
import { Clouds } from '../clouds'
import '../../stylesheets/clouds.css'
import '../../stylesheets/login_register.css'
import '../../stylesheets/submit_and_input.css'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.listErrors = this.listErrors.bind(this)
  }

  handleRedirect() {
    return <Redirect to="/mytrips" />
  }

  handleChange(e) {
    this.props.clearErrors()
    let target = e.target.name
    this.setState({
      [target]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.state)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
    })
  }

  listErrors() {
    return this.state.errors.map((error, i) => {
      return <h4 key={i} className="error">{error}</h4>
    })
  }

  render() {
    return(
      <div className="login-register-background">
        <div className="col-xs-12 text-center login-register-form">
          {this.props.account.account_id ? this.handleRedirect() : null }
          <div className="row login-register center-block">
            <h1 className="intro">Welcome to Flight Path</h1>
            <h2 className="tagline">Plan your perfect getaway</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row login-register center-block">
              <input className=" text-center custom-input login-input" type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange}/>
            </div>
            <div className="row login-register center-block">
              <input className=" text-center custom-input login-input" type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange}/>
            </div>
            <div className="row login-register center-block">
              <input className="custom-button login-button" type='submit' value='Login'/>
            </div>
          </form>
          <div className="row login-register center-block">
            {this.state.errors !== null ? this.listErrors() : null}
            <p className="instructions">Need an account? <NavLink className="instructions-link" to="/register">Register</NavLink> now!</p>
          </div>
        </div>
        <Clouds />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    account: state.Account,
    errors: state.Errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login,
    clearErrors: clearErrors
  }, dispatch)
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
