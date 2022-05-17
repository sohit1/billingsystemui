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
    if(token != " ")
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
      (State == "LandingPage")  &&
        <LandingPage IsLandingPage = {AppChangeState} />
      }
      {(State == "MasterLanding") && 
         <MasterLanding IsMasterPage = {AppChangeState} />
      }

      </div>
    
  );
}
export default App;
