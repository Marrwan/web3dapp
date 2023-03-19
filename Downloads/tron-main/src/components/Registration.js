/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import logo from '../img/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css';
import "./registration.css";
import { detectEthereumProvider } from '@metamask/detect-provider';

function RegistrationForm() {
  const [sponcerId, setSponcerId] = useState('0x10d5942b2ca94f50d8a517d645fd26e3dc601e85');
  const [sPackage, setSPackage] = useState(30);
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

  useEffect(() => {
    async function connectToWallet() {
      // Detect the MetaMask provider
      const provider = await detectEthereumProvider();

      // If MetaMask is not installed or not available, display an error message
      if (!provider) {
        alert('Please install MetaMask to connect to your wallet.');
        return;
      }

      // Request permission to connect to the user's wallet
      const accounts = await provider.request({ method: 'eth_requestAccounts' });

      // Retrieve the user's wallet address
      const address = accounts[0];

      // Use the address as needed (e.g. store it in a state variable, display it on the website, etc.)
      console.log(`Wallet address: ${address}`);
      setWalletAddress(address);
    }

    connectToWallet();
    // Initialize Owl Carousel
    // $(".owl-carousel").owlCarousel({
    //   items: 1,
    //   loop: true,
    //   autoplay: true,
    //   nav: false,
    //   dots: true,
    //   autoplayTimeout: 5000,
    //   smartSpeed: 1000,
    // });

    // // Initialize Tempus Dominus DateTimePicker
    // $("#datetimepicker").datetimepicker({
    //   format: "L",
    //   defaultDate: new Date(),
    //   icons: {
    //     time: "fa fa-clock-o",
    //     date: "fa fa-calendar",
    //     up: "fa fa-chevron-up",
    //     down: "fa fa-chevron-down",
    //     previous: "fa fa-chevron-left",
    //     next: "fa fa-chevron-right",
    //     today: "fa fa-bullseye",
    //     clear: "fa fa-trash",
    //     close: "fa fa-times",
    //   },
    // });

    // Load matic balance and token balance from API
    $.getJSON("https://api.example.com/balance", (data) => {
      setmaticBalance(data.matic);
      setTokenBalance(data.token);
    });
  }, []);

  const fetchWalletData = () => {
    // Use jQuery to fetch data from server API
    $.get('/api/walletData', (data) => {
      setWalletAddress(data.walletAddress);
      setmaticBalance(data.maticBalance);
      setTokenBalance(data.tokenBalance);
    });
  };

  fetchWalletData();
  const handleRegistration = () => {
    // Handle registration logic
    setCookie();
    console.log('Registration submitted!');
  };

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
                  <a href="Home.js" className="Home">
                    <img src={logo} height="100" style={{ width: '100%' }} alt="logo" />
                  </a>
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
                    type="text"
                    className="form-control"
                    id="walletAddress"
                    ref={walletRef}
                    placeholder="Wallet Address"
                  // readOnly
                  />
                  <input type="hidden" name="maticbalance" id="maticbalance" />
                </div>
                <input type="hidden" id="tokenbalance" />
                <button
                  type="button"
                  className="btn btn-info py-3 w-100 mb-4 regist"
                  onClick={() => {
                    handleRegistration();
                  }
                  }
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
