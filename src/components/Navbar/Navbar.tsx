import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/quote-generator">Quote generator</NavLink>
        </li>
        <li>
          <NavLink to="/image-gallery">Image gallery</NavLink>
        </li>
        <li>
          <NavLink to="/user-feed">User Feed</NavLink>
        </li>
        <li>
          <NavLink to="/card-generator">Card generator</NavLink>
        </li>
        <li>
          <NavLink to="/clicker">Clicker</NavLink>
        </li>
        <li>
          <NavLink to="/digital-clock">Digital clock</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
