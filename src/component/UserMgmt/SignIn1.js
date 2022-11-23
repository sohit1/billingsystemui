import "./Registeration.css";
import React, { useState } from "react";
import GoogleImg from "../../images/login-with-google.png";
import config from "../../config.json";

function SignIn(props) {
  const [emailState, setEmailState] = useState("");
  const [passState, setPassState] = useState("");
  const [showLoading, setLoading] = useState(false);

  const captureEmailHandler = (event) => {
    setEmailState(event.target.value);
  };

  const capturePassHandler = (event) => {
    setPassState(event.target.value);
  };

  const ValidateIsEmpty = (value) => {
    if (value == undefined || value == "") return true;

    return false;
  };

  const submitHandler = (event) => {
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (response.ok) {
        alert(response.json());
      } else {
        throw new Error("Could not reach the API: " + response.statusText);
      }
    });

    if (ValidateIsEmpty(emailState)) {
      alert("Email : Can not be blank");
      return;
    }
    if (ValidateIsEmpty(passState)) {
      alert("Password : Can not be blank");
      return;
    }

    const data = {
      userName: emailState,
      password: passState,
    };
    setLoading("True");
    fetch(config.WEBAPI_URL + "user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 200) {
        setLoading("False");
        alert("Something went wrong");
        return;
      }
      response.json().then((data) => {
        setLoading("False");
        if (data.responseStatus != null) {
          if (data.responseStatus.errorNo != 0) {
            setLoading("False");
            alert(data.responseStatus.errorMessage);
            return;
          }
        }
        var selectedDate = new Date();
        let loginDatetime =
          selectedDate.getMonth() +
          1 +
          "/" +
          selectedDate.getDate() +
          "/" +
          selectedDate.getFullYear() +
          " " +
          selectedDate.getHours() +
          ":" +
          selectedDate.getMinutes() +
          ":" +
          selectedDate.getSeconds();
        localStorage.setItem("token-info", data.token);
        localStorage.setItem("login-Datetime", loginDatetime);
        props.IsSignIn("MasterLanding");
      });
    });
  };
  return (
    <form className="form">
      <div className="container mbcontainer">
        <ul className="formsection">
          <li>
            <div className="divflex">
              <span>
                <h1>Login</h1>
              </span>
            </div>
          </li>
          <li>
            <div className="lidiv">
              <input
                type="text"
                onChange={captureEmailHandler}
                placeholder="Enter Email or Mobile no"
                name="email"
                id="email"
                required
              ></input>
            </div>
          </li>
          <li>
            <div className="lidiv">
              <input
                type="password"
                onChange={capturePassHandler}
                placeholder="Enter Password"
                name="psw"
                id="psw"
                required
              ></input>
            </div>
          </li>
          <li>
            <div className="divflex divmargin">
              <input
                type="button"
                onClick={submitHandler}
                value="Login"
              ></input>
            </div>
          </li>
          <li>
            <div className="divlabel">
              <label className="labelcolor1">or</label>
            </div>
          </li>
          <li>
            <div className="divimg1">
              <img src={GoogleImg} alt="billingimage"></img>
            </div>
            {showLoading && (
              <div className="loading">
                <h1>Please wait, loading . . .</h1>
              </div>
            )}
          </li>
        </ul>
      </div>
    </form>
  );
}
export default SignIn;
