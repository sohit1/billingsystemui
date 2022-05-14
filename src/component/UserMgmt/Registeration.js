import { useState } from 'react';
import './Registeration.css';

function Registeration(props) {
    const SignIn = () => {
        props.IsRegister("Signin");
    }
    const [emailState, setEmailState] = useState("");
    const [passState, setPassState] = useState("");

    const captureEmailHandler = (event) => {
        setEmailState(event.target.value);
    }

    const capturePassHandler = (event) => {
        setPassState(event.target.value);
    }

    const submitHandler = (event) => {
        if(ValidateIsEmpty(emailState))
        {
            alert("Email : Can not be blank");
            return;
        }
        if(ValidateIsEmpty(passState))
        {
            alert("Password : Can not be blank");
            return;
        }
            

        const data = {
            "Email": emailState,
            "Password": passState
        };
        props.IsRegister("Signin");
        // fetch("https://localhost:44389/user/InsertUserDetails",
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(data),
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
        //             setEmailState("");
        //             setPassState("");
        //             props.IsRegister("Signin");
        //         });
        //     });
            
    }
    const ValidateIsEmpty = (value) =>
    {
        if(value == undefined || value == "")
            return true;
        
        return false;
    }

    return (
        <form className="form">
            <div className="container">
                <ul className="formsection">
                    <li>
                        <div className="">
                            <h1>Register</h1>
                            <p>Please fill in this form to create an account.</p>
                        </div>
                    </li>
                    <li>
                        <div className="lidiv">
                            <input type="text" onChange={captureEmailHandler} placeholder="Enter Email" required></input>
                        </div>
                    </li>
                    <li>
                        <div className="lidiv">
                            <input type="password" onChange={capturePassHandler} placeholder="Enter Password" required></input>
                        </div>
                    </li>
                </ul>
                <ul className='formsection2'>
                    <li>
                        <div className="">
                            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                        </div>
                    </li>
                    <li>
                        <div className="divflex">
                            <input type="button" value="Register" onClick={submitHandler}></input>
                        </div>
                    </li>
                    <li>
                        <div className="divpadding">
                            <p>Already have an account? <label className='labelcolor2' onClick={SignIn}>Login here</label></p>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    );
}
export default Registeration;