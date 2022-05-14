import './Registeration.css';
import { useState } from 'react';
import GoogleImg from '../../images/login-with-google.png';

function SignIn(props) {
    const [emailState, setEmailState] = useState("");
    const [passState, setPassState] = useState("");

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
            passState
        };
        props.IsSignIn("MasterLanding");
        // fetch("https://localhost:44389/user/userdetails?psUserName=" + emailState,
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(passState),
        //         headers:{
        //             'Content-Type' : "application/json"
        //         }           
        //     }).then((response) => {
        //         if (response.status != 200) {
        //             alert("Something went wrong");
        //             console.log("Error : " + response.status);
        //             return;
        //         }
        //         response.json().then((data) => {
        //             props.IsSignIn("MasterLanding");
        //         });
        //     });

    }
    return (
        <form className="form">
            <div className="container">
                <ul className="formsection">
                    <li>
                        <div className="divflex" >
                            <span><h1>Login</h1></span>
                        </div>

                    </li>
                    <li>
                        <div className="lidiv">
                            <input type="text" onChange={captureEmailHandler} placeholder="Enter Email" name="email" id="email" required></input>
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
                    </li>
                </ul>
            </div>
        </form>
    );
}
export default SignIn;