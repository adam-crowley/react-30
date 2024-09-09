import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiConstants'
import { Link, useNavigate } from 'react-router-dom'

function LoginForm(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    successMessage: null as string | null,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
    const payload = {
      email: state.email,
      password: state.password,
    }
    axios
      .post(API_BASE_URL + '/user/login', payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: 'Login successful. Redirecting to home page..',
          }))
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token)
          redirectToHome()
          props.showError(null)
        } else if (response.status === 204) {
          props.showError('Username and password do not match')
        } else {
          props.showError('Username does not exist')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const redirectToHome = () => {
    props.updateTitle('Home')
    navigate('/user-authentication/home')
  }

  const redirectToRegister = () => {
    props.updateTitle('Register')
  }

  return (
    <>
      <form className="form">
        <div className="form__group">
          <label>Email address</label>
          <input
            type="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form__group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="button button--yellow"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="user-auth__message">
        <span>Don't have an account? </span>
        <Link to="/user-authentication/register" onClick={redirectToRegister}>
          Register
        </Link>
      </div>
    </>
  )
}

export default LoginForm
