/* eslint-disable no-useless-concat */
import React, { useState, useRef , useEffect} from 'react';
import logo from '../img/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css';
import "./registration.css";
import Modal from './Modal';


export default function RegistrationForm() {
  const [walletAddress, setWalletAddress] = useState('');
  // const [mesage, setMesage] = useState('');
  const [modal, setModal] = useState(false)
  const [data, setData] = useState(null)
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
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/api');
      const jsonData = await response.json();
      console.log(jsonData)
    };
    fetchData();
  }, []);
let result = data ? data : <div>Loading ...</div>
  

  const register = async () => {  
    
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        walletAddress
      })
    })
      .then(response => response.json())
      .then(data => {

        console.log(data)
        setData(data.message);
        setModal(true)
      })
      .catch(error => console.error(error));
    
  }


  return (
    <div className='blur-filter'>
      <div className="container-fluid  d-flex p-0 reg-form">
        <div className="container-fluid">
        {modal && <Modal message={data} closeModal={() => setModal(!modal)} />}
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
                  <div>Name : {result?.name}</div>
                  <div>Age : {result?.age}</div>
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
