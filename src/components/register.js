import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createAccount, clearErrors} from '../actions/account'
import { Redirect, NavLink } from 'react-router-dom'
import { Clouds } from './clouds'


class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      emailConfirm: '',
      errors: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.listErrors = this.listErrors.bind(this)
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
    if (this.state.email !== this.state.emailConfirm && this.state.password === this.state.passwordConfirm) {
      this.setState({
        errors: ["Your email fields do not match"]
      })
    } else if (this.state.email === this.state.emailConfirm && this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errors: ["Your password fields do not match"]
      })
    } else if (this.state.email !== this.state.emailConfirm && this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errors: ["Your email fields do not match", "Your password fields do not match"]
      })
    }
    else {
      this.props.createAccount(this.state)
    }
  }

  handleRedirect() {
    return <Redirect to="/mytrips" />
  }

  listErrors() {
    return this.state.errors.map((error, i) => {
      return <h4 key={i} className="error">{error}</h4>
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
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
              <input className=" text-center custom-input login-input" type='text' name='email' value={this.state.email} placeholder='E-mail' onChange={this.handleChange}/>
            </div>
            <div className="row login-register center-block">
              <input className=" text-center custom-input login-input" type='text' name='emailConfirm' value={this.state.emailConfirm} placeholder='Confirm E-mail' onChange={this.handleChange}/>
            </div>
            <div className="row login-register center-block">
              <input className=" text-center custom-input login-input" type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange}/>
            </div>
            <div className="row login-register center-block">
              <input className=" text-center custom-input login-input" type='password' name='passwordConfirm' value={this.state.passwordConfirm} placeholder='Confirm Password' onChange={this.handleChange}/>
            </div>
            <div className="row login-register center-block">
              <input className="custom-button login-button" type='submit' value='Register'/>
            </div>
          </form>
          <div className="row login-register center-block">
            {this.state.errors !== null ? this.listErrors() : null}
            <p className="instructions">Have an account, already? <NavLink className="instructions-link" to="/login">Sign in</NavLink> here!</p>
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
    createAccount: createAccount,
    clearErrors: clearErrors
  }, dispatch)
}

const ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register)

export default ConnectedRegister
