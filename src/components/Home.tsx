import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(API_BASE_URL + '/user/me', {
        headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin()
        }
      })
      .catch(function (error) {
        redirectToLogin()
      })
  }, [])

  function redirectToLogin() {
    navigate('/user-authentication/login')
  }

  return <p>You are now logged in!</p>
}

export default Home
