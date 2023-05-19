import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar-bg-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="header-option-container">
        <Link to="/" className="nav-link">
          <li className="header-option">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="header-option">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
