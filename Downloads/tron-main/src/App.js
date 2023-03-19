import RegristrationFom from './components/Registration';
import Dashboard from './components/Home';
import { useEffect, useState } from 'react';
import Myreferral from './components/Myreferral';
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


  return (
    <div >
      {loggedIn && <RegristrationFom />}
      <Dashboard />
      <Myreferral />
    </div>
  );
}

export default App;
