import './Registeration.css';
import { useState } from 'react';
import GoogleImg from '../../images/login-with-google.png';
import config from '../../config.json';

function SignIn(props) {
    const [emailState, setEmailState] = useState("");
    const [passState, setPassState] = useState("");
    const [showLoading, setLoading] = useState(false);

    const captureEmailHandler = (event) => {
        setEmailState(event.target.value);
    }

    const capturePassHandler = (event) => {
        setPassState(event.target.value);
    }

    const ValidateIsEmpty = (value) => {
        if (value == undefined || value == "")
            return true;

        return false;
    }

    const submitHandler = (event) => {
        if (ValidateIsEmpty(emailState)) {
            alert("Email : Can not be blank");
            return;
        }
        if (ValidateIsEmpty(passState)) {
            alert("Password : Can not be blank");
            return;
        }

        
        const data = {
            "userName":emailState,
            "password":passState
        };
        setLoading('True');
        fetch(config.WEBAPI_URL+"user/login",
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type' : "application/json"
                }           
            }).then((response) => {
                setLoading('False');
                if (response.status != 200) {
                    alert("Something went wrong");
                    console.log("Error : " + response.status);
                    return;
                }
                response.json().then((data) => {
                    setLoading('False');
                    if(data.responseStatus != null)
                    {
                        if(data.responseStatus.errorNo != 0)
                        {
                            alert(data.responseStatus.errorMessage);
                            return;
                        }
                        
                    }
                    let date = new Date();
                    let hours = date.getHours();
                    localStorage.setItem('token-info', JSON.stringify(data));
                    localStorage.setItem('login-time', hours);
                    props.IsSignIn("MasterLanding");
                    
                    
                });
            });

    }
    return (
        <form className="form">
            <div className="container mbcontainer">
                <ul className="formsection">
                    <li>
                        <div className="divflex" >
                            <span><h1>Login</h1></span>
                        </div>

                    </li>
                    <li>
                        <div className="lidiv">
                            <input type="text" onChange={captureEmailHandler} placeholder="Enter Email or Mobile no" name="email" id="email" required></input>
                        </div>
                    </li>
                    <li>
                        <div className="lidiv">
                            <input type="password" onChange={capturePassHandler} placeholder="Enter Password" name="psw" id="psw" required></input>
                        </div>
                    </li>
                    <li>
                        <div className="divflex divmargin">
                            <input type="button" onClick={submitHandler} value="Login" ></input>
                        </div>
                    </li>
                    <li>
                        <div className="divlabel">
                            <label className='labelcolor1'>or</label>
                        </div>
                    </li>
                    <li>
                        <div className='divimg1'>
                            <img src={GoogleImg} alt="billingimage"></img>
                        </div>
                        {
                            showLoading && 
                            <div className="loading">
                                <h1>Please wait, loading . . .</h1>
                            </div>
                        }
                        
                    </li>
                </ul>
            </div>
        </form>
    );
}
export default SignIn;