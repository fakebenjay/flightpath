import axios from 'axios'
import api from '../config/api'
import { history } from '../App'

export const setToken = (token) => ({
 type: 'SET_TOKEN', payload: token
})

export const clearAccount = () => ({
  type: 'CLEAR_ACCOUNT'
})

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
})

export const setAccount = (token) => {
  const header = {
    headers: {'bearer': token}
    };
  return (dispatch) => {
    let prefix = api
    axios
      .get(`${prefix}/set-account`, header)
      .then(response => {
        let account = response.data
        dispatch({type: 'SET_ACCOUNT', account})
      })
      .catch((error) => {
        dispatch(history.push('/logout'))
      })
  }
}

export const createAccount = (params) => {
  return (dispatch) => {
    let prefix = api
    axios
      .post(`${prefix}/registrations`, {
        account: {
          username: params.username,
          password: params.password,
          email: params.email
        }
      })
      .then(response => {
        let token = response.data.token
        localStorage.setItem('token', token)
        dispatch(setToken(token))
        dispatch(setAccount(token))
      })
      .catch((error) => {
        dispatch({type: 'ADD_ERRORS', payload: error.response.data.errors})
      })
  }
}

  export const login = (params) => {
    return (dispatch) => {
      let prefix = api
      axios
        .post(`${prefix}/sessions`, {
          username: params.username,
          password: params.password
        })
        .then(response => {
          let token = response.data.token
          localStorage.setItem('token', token)
          dispatch(setToken(token))
          dispatch(setAccount(token))
        })
        .catch((error)=> {
          dispatch({type: "ADD_ERRORS", payload: ["Username and Password Do Not Match"]})
        })
    }
}
