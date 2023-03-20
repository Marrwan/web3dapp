/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import logo from '../img/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css';
import "./registration.css";
import { detectEthereumProvider } from '@metamask/detect-provider';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';


function RegistrationForm() {
  const [sponcerId, setSponcerId] = useState('0x10d5942b2ca94f50d8a517d645fd26e3dc601e85');
  const web3 = new Web3();
  const [walletData, setWalletData] = useState({});
  const [walletAddress, setWalletAddress] = useState('');
  const [maticBalance, setmaticBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const walletRef = useRef(null);
  function setCookie() {
    const d = new Date();
    d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // setWalletAddress(walletRef.current.value);
    // console.log(walletRef.current.value);
    document.cookie = "wadd" + "=" + walletRef.current.value + ";" + expires + ";path=/";
    // console.log(walletAddress)
    window.location = "/home";
  };
 const connectWallet = async () => {
  if (window.ethereum && window.ethereum.isConnected()) {

        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const currentAccount = accounts[0];
          // Check if current account matches the inputted wallet address
          if (currentAccount.toLowerCase() === walletAddress.toLowerCase()) {
            console.log('Connected to wallet:', currentAccount);
          } else {
            console.log('Please enter a valid wallet address');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Please install MetaMask to connect to a wallet');
      }
    };
    useEffect(() => {
      const fetchWalletData = async () => {
        if (window.ethereum) {
          try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const currentAccount = accounts[0];
            // Fetch wallet data
            const balance = await web3.eth.getBalance(currentAccount);
            const networkId = await web3.eth.net.getId();
            const networkType = await web3.eth.net.getNetworkType();
            setWalletData({ balance, networkId, networkType });
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('Please install MetaMask to fetch wallet data');
        }
      };
      fetchWalletData();
    }, [web3.eth]);
    

 
  // const handleRegistration = () => {
  //   // Handle registration logic
  //   setCookie();
  //   console.log('Registration submitted!');
  // };

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
                  <label className="form-label">Referral</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sponcer_id"
                    name="sponcer_id"
                    placeholder="Referral Id : TRbzZEXSaQSteTrAK8jpNrpL4KD4i5hFu6"
                  // value="TRbzZEXSaQSteTrAK8jpNrpL4KD4i5hFu6"
                  // readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Package($)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="spackage"
                    name="spackage"
                    placeholder="Example : 30"
                    // value="30"
                    minValue="30"
                    step="30"
                    style={{ color: '#191c24' }}
                  // readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Wallet Address</label>
                 

                  <input
                    className="form-control"
                    id="walletAddress"
                    ref={walletRef}
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
                  // onClick={() => {
                  //   handleRegistration();
                  // }
                  // }
                  onClick={connectWallet}
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

export default RegistrationForm;
