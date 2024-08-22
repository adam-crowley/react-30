import { useNavigate, useLocation } from 'react-router-dom'
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants'

function Header(props) {
  const location = useLocation()
  const navigate = useNavigate()

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  let title = capitalize(location.pathname.substring(1))
  if (location.pathname === '/') {
    title = 'Welcome'
  }

  function renderLogout() {
    if (location.pathname === '/home') {
      return (
        <button className="" onClick={handleLogout}>
          Logout
        </button>
      )
    }
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME)
    navigate('/login')
  }

  return (
    <nav className="user-auth__navbar">
      <div className="">
        <span className="">{props.title || title}</span>
        {renderLogout()}
      </div>
    </nav>
  )
}

export default Header
