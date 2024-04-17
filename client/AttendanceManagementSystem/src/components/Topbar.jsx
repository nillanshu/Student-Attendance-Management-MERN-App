import React from 'react'
import userIcon from '../img/user-icn.png'
import logoutApi from '../api/api.logout'
import { useNavigate } from 'react-router-dom'

const Topbar = ({user}) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutApi().then((message) => {
      if (message === 'Logged out successfully') {
        navigate('/login');
      }
    });
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-gradient-primary topbar mb-4 static-top">
        <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>
        <div className="text-white big" ><b></b></div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-search fa-fw"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown">
              <form className="navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?"
                    aria-label="Search" aria-describedby="basic-addon2" style={{ borderColor: '#3f51b5' }} />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img className="img-profile rounded-circle" src={userIcon} style={{ maxWidth: '60px' }} />
              <span className="ml-2 d-none d-lg-inline text-white small"><b>Welcome {user.firstName + ' ' + user.lastName}</b></span>
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              {/* Uncomment and modify as needed
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              */}
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-power-off fa-fw mr-2 text-danger"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Topbar