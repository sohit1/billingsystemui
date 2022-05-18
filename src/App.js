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
    let adsj = localStorage.getItem('login-time');
    console.log('asdasdasd' + adsj);
    if(localStorage.getItem('login-time') !== " ")
    {
      loggedin = true;
      var currentmins = parseInt(new Date().getHours())*60 + parseInt(new Date().getMinutes())
      console.log('currentmin: '+currentmins);
      console.log('loggedin: '+localStorage.getItem('login-time')*60);
      
      if(currentmins - parseInt(localStorage.getItem('login-time'))*60 > 60)
      {
        loggedin = false;
        console.log('getTime:   '+localStorage.getItem('login-time'));
      }
      // if(new Date().getHours() - localStorage.getItem('login-time') > 2)
      // {
      //   loggedin = false;
      //   console.log('getTime:   '+localStorage.getItem('login-time'));
      // }
      
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
