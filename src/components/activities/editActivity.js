import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editActivity } from '../../actions/editActivity'

class EditActivity extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.input !== '') {
      this.props.editActivity(this.state.input, this.props.activity, this.props.account)
      this.props.updateState(this.state.input)
      this.setState({
      input: ''
      })
    }
  }
  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }
  render() {
    return (
      <div>
        <br />
        <div><strong>Add a Comment:</strong></div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='custom-input' value={this.state.input} onChange={this.handleChange}/>
          <input type='submit' className='custom-input login-button add' value='Add'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.Account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editActivity: editActivity
  }, dispatch)
}

const ConnectedEditActivity = connect(mapStateToProps, mapDispatchToProps)(EditActivity)

export default ConnectedEditActivity
