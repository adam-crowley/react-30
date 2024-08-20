import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Home from './Home'
import AlertComponent from './AlertComponent'
import PrivateRoute from '../utils/PrivateRoute'

function UserAuthentication() {
  const [title, setTitle] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  return (
    <div className="user-auth">
      <h2>User Authentication</h2>
      <Header title={title} />
      <div className="user-auth__container">
        <Routes>
          <Route
            path="/"
            element={
              <RegistrationForm
                showError={setErrorMessage}
                updateTitle={setTitle}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationForm
                showError={setErrorMessage}
                updateTitle={setTitle}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm showError={setErrorMessage} updateTitle={setTitle} />
            }
          />
          <PrivateRoute path="/home" element={<Home />} />
        </Routes>
        <AlertComponent
          errorMessage={errorMessage}
          hideError={setErrorMessage}
        />
      </div>
    </div>
  )
}

export default UserAuthentication
