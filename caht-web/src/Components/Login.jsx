import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { handleKeyDown, CallService, toast, modalAlert } from "../Js/Script";
import {
  useIsLoading,
  useSetIsLoading,
} from "../Js/UseContext/LoaadingContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
//import "../Css/Login.css";
function Login() {
  const setIsLoading = useSetIsLoading();
  const IsLoading = useIsLoading();
  const [states,setStates] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const inputRefs = {
    username: useRef(null),
    password: useRef(null),
    loginBtn: useRef(null),
  };
  const getAuthToken = async () => {
    if (!states.username) {
      toast("Username is required");
      inputRefs.username.current.querySelector("input").focus();
    } else if (!states.password) {
      toast("Password is required");
      inputRefs.password.current.querySelector("input").focus();
    } else {
      var data = {
        password: states.password,
        userName: states.username,
      };

      CallService("Authentication", data, "POST", setIsLoading, true)
        .then((response) => {
          localStorage.setItem("ticket", response.ticket);
          localStorage.setItem("expireDate", response.expireDate);
          if (response.ticket) {
            navigate(process.env.PUBLIC_URL + "/FrontPage");
          }
        })
        .catch((error) => {
          modalAlert(
            error.message ||
              error ||
              "An unexpected error has occurred. Please contact software support"
          );
        });
    }
  };

  return (
    <div id="login" className="flexRow">
      {IsLoading && <Loading />}
        <div id="dvLoginItems" className="flexCulomn">
          <TextField
            ref={inputRefs.username}
            label="username"
            onChange={(e) => setStates(prevState => ({ ...prevState, username: e.target.value }))}
            variant="outlined"
            onKeyDown={(e) => {
              handleKeyDown(e, inputRefs.password, "input");
            }}
          />
          <TextField
            ref={inputRefs.password}
            label="password"
            onChange={(e) => setStates(prevState => ({...prevState, password: e.target.value}))}
            variant="outlined"
            onKeyDown={(e) => {
              handleKeyDown(e, inputRefs.loginBtn, "btn");
            }}
            type="password"
          />
          <Button
            onClick={() => {
              getAuthToken();
            }}
            ref={inputRefs.loginBtn}
            variant="contained"
          >
            login
          </Button>
        </div>
      </div>
  );
}
export default Login;
