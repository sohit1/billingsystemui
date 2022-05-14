import './App.css';
import {useState} from 'react';
import LandingPage from './component/Product/LandingPage.js';
import MasterLanding from './component/Common/MasterLanding.js';

function App() {
  const [State,setState] = useState("LandingPage");

  const AppChangeState =(parameter) =>
  {
    setState(parameter);
  }

  return (
    <div className= "divheight">
      { State == "LandingPage" &&
        <LandingPage IsLandingPage = {AppChangeState} />
      }
      {State == "MasterLanding" && 
        <MasterLanding IsMasterPage = {AppChangeState} />
      }
      
    </div>
    
  );
}
export default App;
