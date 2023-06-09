/* eslint-disable no-useless-concat */
import React, { useState } from 'react';
import logo from '../img/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css';
import "./registration.css";


export default function Logout() {
  const [walletAddress, setWalletAddress] = useState('');
  function setCookie() { 
    const d = new Date();
    d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // setWalletAddress(walletRef.current.value);
    // console.log(walletRef.current.value);
    document.cookie = "wadd" + "=" + ";" + expires + ";path=/";
    // console.log(walletAddress)
    window.location = "/home";
  };


  const register = async () => {  
    setCookie()
  }


  return (
    <div className='blur-filter'>
      <div className="container-fluid  d-flex p-0 reg-form">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minheight: '100vh' }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="Home">
                    <img src={logo} height="100" style={{ width: '100%' }} alt="logo" />
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Wallet Address</label>
                  <input
                    className="form-control"
                    id="walletAddress"
                    placeholder="Wallet Address"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />

                  <input type="hidden" name="maticbalance" id="maticbalance" />
                </div>
                <input type="hidden" id="tokenbalance" />
                <button
                  type="button"
                  className="btn btn-info py-3 w-100 mb-4 regist"
                  onClick={register}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
