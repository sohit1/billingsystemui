import "./Registeration.css";
import GoogleImg from "../../images/login-with-google.png";
import React from "react";
import styles from "./SignIn.module.css";
import { useEffect , useState } from 'react';
import coverImg from '../../images/bg-1.jpg';
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

  function handleClick(event) {
    event.preventDefault();
    const el = document.getElementById('password-field');
    if (el.type === 'password') {
      el.type = 'text';
      event.currentTarget.classList.remove('fa-eye');
      event.currentTarget.classList.add('fa-eye-slash');
    }
    else {
      el.type = 'password';
      event.currentTarget.classList.add('fa-eye');
      event.currentTarget.classList.remove('fa-eye-slash');
    }

  };
  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (response.ok) {
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
    <React.Fragment>
      <div className={`${styles.container}`}>
        <div className={`${styles.justify_content_center} ${styles.row}`}>
          <div className="col-lg-1 col-posd-1">
            <div className={styles.wrap}>
              <div className={`${styles.wrap_img}`} style={{ backgroundImage: `url(${coverImg})` }}>
                {/* <img src={coverImg} alt="Google" /> */}
              </div>
              <div className="login-wrap p-md-5 p-4">
                <div class="d-flex">
                  <div class="w-100">
                    <h3 class="mb-4">Sign In</h3>
                  </div>
                  {/* <div class="w-100">
                    <p class="social-media d-flex justify-content-end">
                      <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-facebook"></span></a>
                    </p>
                  </div> */}
                </div>
                <form class="signin-form">
                  <div class="form-group mt-3">
                    <input type="text" class="form-control" placeholder="Mobile" onChange={captureEmailHandler} required="" />
                    {/* <label class= {`${styles.signin_form_label} ${"form-control-placeholder "}`} for="username">Username</label> */}
                  </div>
                  <div class="form-group">
                    <input id="password-field" type="password" placeholder="password" class="form-control" onChange={capturePassHandler} required="" />
                    {/* <label class="form-control-placeholder" for="password">Password</label> */}
                    <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={handleClick}></span>
                  </div>
                  <div class="form-group">
                    <button class="form-control btn btn-primary rounded submit px-3" onClick={submitHandler}>Sign In</button>
                  </div>
                  {/* <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div> */}
                </form>
                <p class="text-center">Not a member?
                  <a data-toggle="tab" href="#signup">Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}
export default SignIn;
