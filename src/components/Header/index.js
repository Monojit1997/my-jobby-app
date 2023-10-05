import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineHome} from 'react-icons/hi'
import {BsBag} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
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
          className="jobby-logo"
        />
      </Link>
      <div className="menu-container-small-device">
        <Link to="/" className="nav-link">
          <HiOutlineHome className="icon-style" />
        </Link>
        <Link to="/jobs" className="nav-link">
          <BsBag className="icon-style" />
        </Link>
        <FiLogOut className="icon-style" onClick={onClickLogout} />
      </div>
      <div className="menu-container">
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
      </div>
    </nav>
  )
}
export default withRouter(Header)
