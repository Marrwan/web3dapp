/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from '../img/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css';
import Modal from './Modal';
import Sidebar from './Sidebar';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [copyModal, setCopyModal] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  const UpgradeLevel = (value) => {
    console.log(value)
  }
  const BuyMatrix = (value) => {
    console.log(value)
  }
  const CopyModal = (props) => {
    return (
        <div className='modal'>
            <div className="modal-content">
                <h3>Link Copied</h3>
                <div className='modal-button-container'>

                    <button className='modal-button'
                        onClick={props.closeModal}
                    >Ok</button>
                </div>
            </div>

        </div>
    )
}
  const copyRefLink = () => {
    // const copyText = document.getElementById('refLink');
    const copyText = document.getElementsByClassName('refreelink')[0];

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    // alert('Link Copied ');
  // return Modal for notification of copy
return  setCopyModal(true)
  }

  return (
    <>
    {copyModal && <CopyModal closeModal={() => setCopyModal(!copyModal)} />}
      {modal && <Modal closeModal={() => setModal(!modal)} />}
      <div className="container-fluid position-relative d-flex p-0">
        {/* Spinner Start
      <div
        id="spinner"
        className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-warning"
          style={{ width: '3rem', height: '3rem' }}
          role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}

        <div className="content">
      <Sidebar />
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
            <a href="#" className="sidebar-toggler flex-shrink-0">
              <i className="fa fa-bars"></i>
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
                  <a href="Profile" className="dropdown-item">Profile</a>
                  <a href="Settings" className="dropdown-item">Settings</a>
                  <a href="#" className="dropdown-item">Log Out</a>
                </div>
              </div>
            </div>
          </nav>

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
             
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  {/* <marquee behavior="scroll" direction="left"
                    scrolldelay="10" scrollamount="3" width="100%" height="30" onMouseOver="this.stop();" onMouseOut="this.start();">
                  </marquee> */}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <div className="text-center" style={{ width: "60%" }}>
                    <label>Upgrade Level</label>
                    <button
                      type="button"
                      name='btninvest'
                      className="btn btn-warning btninvest"
                      style={{ marginTop: "20px" }}
                      onClick={() => UpgradeLevel(200)}
                    >
                      Upgrade Level 4 (200 $)
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-6">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <div className="text-center" style={{ width: "60%" }}>
                    <label>Buy Matrix</label>
                    <button
                      type="button"
                      id='matrix'
                      className="btn btn-warning btninvest"
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        BuyMatrix('100')

                        setModal(true)
                      }}
                    >
                      Buy Matrix : 100 $ (1512 TRX)
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-shopping-cart fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">CURRENT LEVEL-3</p>
                    <h6 className="mb-0">60 $</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-shopping-cart fa-3x " style={{ color: "#d5b476" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">CURRENT MATRIX</p>
                    <h6 className="mb-0">3</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-user fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">DIRECT ASSOCIATE</p>
                    <h6 className="mb-0">4</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-chart-pie fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">REFERRAL INCOME</p>
                    <h6 className="mb-0">114.00 $</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-chart-pie fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">SPONSOR INCOME</p>
                    <h6 className="mb-0">65.50 $</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-chart-pie fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">PLACEMENT UPLINE INCOME</p>
                    <h6 className="mb-0">95.00 $</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-chart-pie fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">MATRIX INCOME</p>
                    <h6 className="mb-0">0.00 $</h6>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                  <i className="fa fa-chart-pie fa-3x " style={{ color: "#f19107" }}></i>
                  <div className="ms-3">
                    <p className="mb-2">TOTAL INCOME</p>
                    <h6 className="mb-0">274.50 $</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-md-6 col-xl-12">
                <div className="h-100 bg-secondary rounded p-4">
                  <div className="d-flex align-items-center jusstify-content-between mb-4">
                    <h6 className="mb-0">Referral Link</h6>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="col-sm-12 col-md-6 col-xl-9">
                      <input
                        type="text"
                        className="refreelink form-control bg-dark border-0 text-white"
                        id="reflink"
                        // readonly
                        style={{ color: "#fff" }}
                      />
                    </div> 
                    <div className="col-sm-12 col-md-6 col-xl-3">
                      <button
                        type="button"
                        className="btn btn-info"
                        style={{ backgroundColor: "#f19107" }}
                      onClick={copyRefLink}
                      >
                        Copy Ref Link
                      </button>
                    </div>
                    <input
                      type="hidden"
                      name="reflink"
                      id="reflink"

                      className='form-control'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className='container-fluid pt-4 px-4'>
            <div className="bg-secondary rounded-top p-4 new-color">
              <div className="row">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                  Contact Address :
                  <a href="" target="_blank">0x4De84A....ff6331cB</a>
                </div>

              </div>
            </div>
          </div>
          <br />
        </div>
        <div className="loader1">
          {/* <center
            style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <h6 style={{
              color: "#fff",
              fontSize: "16px",
              zIndex: "99999",
              fontWeight: "700"
            }}
            > Please wait whyle your transaction is not complete...</h6>
          </center> */}

        </div>
      </div >
    </>

  );
}

export default Dashboard;
