import './App.css';
import {useState} from 'react';
import LandingPage from './component/Product/LandingPage.js';
import MasterLanding from './component/Common/MasterLanding.js';

function App() {
  const [State,setState] = useState("LandingPage");
  const [IsLoggedIn,setIsLoggedIn] = useState(false);

  const fnSetIsLoggedIn =(param)=>
  {
    const token = localStorage.getItem('token-info');
    var loggedin = false;
    if(localStorage.getItem('login-time') !== " ")
    {
      loggedin = true;
      var currentmins = parseInt(new Date().getHours())*60 + parseInt(new Date().getMinutes())
      
      if(currentmins - parseInt(localStorage.getItem('login-time'))*60 > 60)
      {
        loggedin = false;
      }    
    }
    
  
    if(token !== " " && loggedin )
    {
      setIsLoggedIn(true);
    }
    else
      {
        setIsLoggedIn(false);
      }
      
  }
  const AppChangeState =(parameter) =>
  {
    fnSetIsLoggedIn();
    setState(parameter);
  }
  useState(state =>
    {
      fnSetIsLoggedIn();
    });
  return (
      <div className= "divheight">
      {
        IsLoggedIn && 
         <MasterLanding IsMasterPage = {AppChangeState} />     
      }
      { 
      (State === "LandingPage")  &&
        <LandingPage IsLandingPage = {AppChangeState} />
      }
      {(State === "MasterLanding") && 
         <MasterLanding IsMasterPage = {AppChangeState} />
      }

      </div>
    
  );
}
export default App;
