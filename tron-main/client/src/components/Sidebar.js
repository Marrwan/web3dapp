/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import logo from '../img/logo.jpg';


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
    return (
        <>
       
        <div 
        className={`sidebar pe-4 pb-3 ${
          collapsed ? "collapsed" : ""
        }`}
        // className="sidebar pe-4 pb-3 collapsed" 
        style={{ backgroundColor: '#0e0e0e' }}>
        <nav className="navbar navbar-dark" style={{ backgroundColor: '#0e0e0e' }}>
          <a href="home" className="navbar-brand mx-4 mb-3">
            <img
              className=""
              src={logo}
              alt=""
              style={{ width: '160px', height: '50px' }}
            />
          </a>

          <div className="navbar-nav w-100">
            <a href="Home" className="nav-item nav-link active">
              <i className="fa fa-tachometer me-2"></i>Dashboard
            </a>
            
            <div className="nav-item dropdown">
              <a
            
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-users me-2"></i>My Team
                
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="myreferral" className="dropdown-item">
                  My Referral
                  
                </a>
                <a href="myteam" className="dropdown-item">
                  My Team
                </a>
                <a href="mytree?idn=737251" className="dropdown-item">
                  My Tree
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
            
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-users me-2"></i>Matrix
                
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="matrix?matrix=100" className="dropdown-item">
                  Matrix List (100 $)
                </a>
                <a href="matrix?matrix=500" className="dropdown-item">
                  Matrix List (500 $)
                </a>
                <a href="matrix?matrix=2000" className="dropdown-item">
                  Matrix List (2000 $)
                </a>
                <a href="matrix?matrix=8000" className="dropdown-item">
                  Matrix List (8000 $)
                </a>
                <a href="matrix?matrix=40000" className="dropdown-item">
                  Matrix List (40000 $)
                </a>
                <a href="matrix?matrix=200000" className="dropdown-item">
                  Matrix List (200000 $)
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
            
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-money me-2"></i>My Income
                
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="referralincome" className="dropdown-item">
                  Referral Income</a>
                <a href="sponsorincome" className="dropdown-item">
                  Sponsor Income</a>
                <a href="uplineincome" className="dropdown-item">
                  Upline Income</a>
                <a href="matrixincome" className="dropdown-item">
                  Matrix Income</a>
              </div>
            </div>
            <a href="#" className="nav-item nav-link">
              <i className="fa fa-download me-2"></i>Download Plan
            </a>
            <a href="logout" className="nav-item nav-link">
              <i className="fa fa-sign-out me-2"></i>Logout
            </a>
          </div>
        </nav>
      </div>
      
      <nav className="navbar navbar-expand navbar-dark sticky-top px-4 py-0"
            style={{ backgroundColor: "#0e0e0e" }}>
            <a href="Home" className='navbar-brand d-flex d-lg-none me-4'>
              <img
                className="me-lg-2"
                src={logo}
                alt=""
                style={{ width: '160px', height: '50px' }}
              />
            </a>
            <a href="#" 
             className="sidebar-toggler flex-shrink-0 btn btn-sm btn-primary "
             onClick={toggleSidebar}
           >
              <i className="fa fa-bars"></i>

              {/* <i className={`fa fa-${collapsed ? "bars" : "times"}`}></i>      */}
                     </a>
            {/* <form className="d-none d-md-flex ms-4">Hi ! 737252</form> */}
            <div className="navbar-nav align-items-center ms-auto">
              <div className="nav-item dropdown">
                <a
              
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa fa-signout me-2"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <a href="logout" className="dropdown-item">Log Out</a>
                </div>
              </div>
            </div>
          </nav>
       <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                  <h6>
                    Dashboard
                    <small><span className='' style={{ color: "#f19107" }}>Hi ! 737251</span></small>
                    <br />
                    {/* <small><span className='' style={{ color: "#f19107" }}>0x10d5942b2ca94f50d8a517d645fd26e3dc601e85</span></small> */}
    
                  </h6>
                 
                </div>
              </div>
       </>
    );
    }