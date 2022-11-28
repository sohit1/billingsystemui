import './App.css';
import {useState , useEffect} from 'react';
import LandingPage from './component/Product/LandingPage.js';
import MasterLanding from './component/Common/MasterLanding.js';

function App() {
  const [State,setState] = useState("LandingPage");
  const [IsLoggedIn,setIsLoggedIn] = useState(false);
  const [IsFlag,setFlag] = useState(false);

  useEffect(() => {
    function handleResize() {
      localStorage.setItem("Screen",window.outerWidth < 991 ? true : false)
      setFlag(window.outerWidth < 991 ? true : false);

    }
    console.log("called resize");
    window.addEventListener('resize', handleResize)

    return _ => {
        window.removeEventListener('resize', handleResize)
    }
});
  const fnSetIsLoggedIn =(param)=>
  {
    const token = localStorage.getItem('token-info');
    var loggedin = false;
    var Datetime = new Date(localStorage.getItem('login-Datetime'));
    var currDatetime = new Date();
    Datetime.setHours(Datetime.getHours() + 8);
    if(localStorage.getItem('login-Datetime') !== null)
    {
      loggedin = true;
  
      if(Datetime <  currDatetime)
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
      console.log('state change  ' +  window.innerHeight);
      fnSetIsLoggedIn();
    });
  return (
      <div className= "divheight">
      {
        (IsLoggedIn && (IsFlag == true || IsFlag == false)) &&
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
