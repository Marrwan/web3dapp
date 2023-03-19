import React from "react";
import logo from '../img/logo.jpg';


export default function Sidebar() {
    return (
        <>
        <div className="sidebar pe-4 pb-3" style={{ backgroundColor: '#0e0e0e' }}>
        <nav className="navbar navbar-dark" style={{ backgroundColor: '#0e0e0e' }}>
          <a href="Home" className="navbar-brand mx-4 mb-3">
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
              {/* <a href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown}> */}
              <a
            
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
                <i className="fa fa-laptop me-2"></i>
                Buy Slot
                <i className="fa fa-angle-down ms-2"></i>
              </a>
              
                <div className="dropdown-menu bg-transparent border-0">
                  <a href="SlotBuy" className="dropdown-item">Buy Slot</a>
                  <a href="SlotPurchaseHistory" className="dropdown-item">Slot Purchase History</a>
                  <a href="SlotStatics" className="dropdown-item">Slot Statics</a>
                </div>
            
            </div>
            <div className="nav-item dropdown">
              <a
            
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-users me-2"></i>My Team
                <i className="fa fa-angle-down ms-2"></i>
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
                <i className="fa fa-angle-down ms-2"></i>
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="MatrixList?matrix=100" className="dropdown-item">
                  Matrix List (100 $)
                </a>
                <a href="MatrixList?matrix=500" className="dropdown-item">
                  Matrix List (500 $)
                </a>
                <a href="MatrixList?matrix=2000" className="dropdown-item">
                  Matrix List (2000 $)
                </a>
                <a href="MatrixList?matrix=8000" className="dropdown-item">
                  Matrix List (8000 $)
                </a>
                <a href="MatrixList?matrix=40000" className="dropdown-item">
                  Matrix List (40000 $)
                </a>
                <a href="MatrixList?matrix=200000" className="dropdown-item">
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
                <i className="fa fa-angle-down ms-2"></i>
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="ReferralIncome" className="dropdown-item">
                  Referral Income</a>
                <a href="SponsorIncome" className="dropdown-item">
                  Sponsor Income</a>
                <a href="UplineIncome" className="dropdown-item">
                  Upline Income</a>
                <a href="MatrixIncome" className="dropdown-item">
                  Matrix Income</a>
              </div>
            </div>
            <a href="#" className="nav-item nav-link">
              <i className="fa fa-download me-2"></i>Download Plan
            </a>
            <a href="#" className="nav-item nav-link">
              <i className="fa fa-sign-out me-2"></i>Logout
            </a>
          </div>
        </nav>
      </div>
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