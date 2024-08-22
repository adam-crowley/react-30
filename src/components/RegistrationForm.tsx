import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiConstants'
import { Link, useNavigate } from 'react-router-dom'

function RegistrationForm(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
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

  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      props.showError(null)
      const payload = {
        email: state.email,
        password: state.password,
        name: state.userName,
      }
      axios
        .post(API_BASE_URL + '/user/register', payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                'Registration successful. Redirecting to home page..',
            }))
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token)
            redirectToHome()
            props.showError(null)
          } else {
            props.showError('Some error occurred')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      props.showError('Please enter valid username and password')
    }
  }

  const redirectToHome = () => {
    props.updateTitle('Home')
    navigate('/home')
  }

  const redirectToLogin = () => {
    props.updateTitle('Login')
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
    if (state.password === state.confirmPassword) {
      sendDetailsToServer()
    } else {
      props.showError('Passwords do not match')
    }
  }

  return (
    <div className="">
      <form className="form">
        <div className="">
          <div className="form__group">
            <label>User Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Add User Name"
              value={state.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={state.email}
              onChange={handleChange}
            />
            <small id="emailHelp">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form__group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="button button--yellow"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <Link
          to="/user-authentication/login"
          className="loginText"
          onClick={redirectToLogin}
        >
          Login here
        </Link>
      </div>
    </div>
  )
}

export default RegistrationForm
