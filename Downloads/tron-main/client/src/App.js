/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import RegristrationFom from './components/Registration';
import Dashboard from './components/Home';
import { useEffect, useState } from 'react';
import Referral from './components/Team/Referral';
import Team from './components/Team/Team';
import Matrix from './components/Matrix';
import queryString from 'query-string';
import IncomeReferral from './components/Income/Referral';
import SponsorIncome from './components/Income/Sponsor';
import UplineIncome from './components/Income/Upline';
import MatrixIncome from './components/Income/Matrix';
import Tree from './components/Team/Tree';
import Logout from './components/Logout';
import NotFound from './components/NotFound';



import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setLoggedIn(false)
      }
    }
  }
  useEffect(() => {
    let user = document.cookie;
    console.log(user)
    if (!user) setLoggedIn(true)
    if (user) setLoggedIn(false)
  }, [])
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  return (
     <Routes>

    <Route path="/" element={ <RegristrationFom />}/>
    <Route path="/home" element={ <Dashboard />} />
    <Route path="/myreferral" element={<Referral />} />
    <Route path="/myteam" element={<Team />} />
    <Route path="/mytree" element={<Tree idn={queryParams.idn}/>} />
    <Route path="/matrix" element={<Matrix matrix={queryParams.matrix}/>} />
    <Route path="/referralincome" element={<IncomeReferral />} />
    <Route path="/sponsorincome" element={<SponsorIncome />} />
    <Route path="/uplineincome" element={<UplineIncome />} />
    <Route path="/matrixincome" element={<MatrixIncome />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<NotFound />} />

    
      </Routes>
  );
}

export default App;
 