import Register from '../UserMgmt/Registeration'
import ProductPage from './ProductPage'
import SignIn from '../UserMgmt/SignIn'
import { useState } from 'react'
import './LandingPage.css'
import ProductCatalog from './ProductCatalog'
import './ProductCatalog.css'

function LandingPage(props) {
    const [State, setState] = useState("ProductCatalog");
    const Showsignup = () => {
        setState("Register");
    }
    const Showsignin = () => {
        setState("Signin");
    }
    function ChangeState(parameter) {
            if(parameter == "MasterLanding")
            {
                props.IsLandingPage("MasterLanding");
                return;
            }
            setState(parameter);
    }
    const logoImgHandler =()=>
    {
        setState("ProductCatalog");
        //Need to handle this click as customer should be logged into the system.
    }

    return (
        <div className="LandingContent">
            <div className="header">
                <div className="header-left-component">
                    <div className="divlogo" onClick={logoImgHandler}>
                        <span>JB</span>
                    </div>
                </div>
                <div className="header-right-component">
                    <div className="header-right-component-right">
                        <div className="dvSignIn mbdvSignIn">
                            <label className='labelcolor' onClick={Showsignin}>
                                {/* <a href="#" onClick={Showsignin}> */}
                                    Login
                               {/* </a>  */}
                            </label>
                        </div>
                        <div className="dvSignUp mbdvSignUp">
                            <label className='labelcolor' onClick={Showsignup}>
                                {/* <a href="#" onClick={Showsignup}> */}
                                    Register
                                {/* </a> */}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                {State == "Register" &&
                    <Register IsRegister={ChangeState}></Register>
                }
                {State == "Signin" &&
                    <SignIn IsSignIn={ChangeState}></SignIn>
                }
                {State == "ProductPage" &&
                    <ProductPage IsSignIn={ChangeState}></ProductPage>
                }
                { State == "ProductCatalog" &&
                    <ProductCatalog IsProductCatalog={ChangeState}/>

                }
            </div>
        </div>
    );
}
export default LandingPage;