import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  let navigate = useNavigate();

  const uploadfield = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      
      return toast.error("Invalid email");
    }
    if(!strongRegex.test(password)){
      return toast.error("Your password is too weak")
    }
    else {
      fetch("https://quiz-master-1.herokuapp.com/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            toast.error(data.error);
          } else {
            // M.toast({ html: data.message });
            toast.success(data.message)
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const postData = () => {
    uploadfield();
  };

  return (
    <div className="signup-body">
      <div className="media_card_signup">
        <h1 className="brand-logo" style={{ margin: "0 auto" }}>
          Nginx
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            type="text"
            style={{ color: "white" }}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            style={{ color: "white" }}
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            style={{ color: "white" }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{ width: "2rem", margin: "0px auto" }}
            onClick={() => postData()}
          >
            Signup
          </Button>

          <div className="signup-redirect">
            <Link to="/login">
              {" "}
              <h4
                className="signup-redirect"
                style={{ color: "white", fontSize: "1.2rem" }}
              >
                Already have an account??
              </h4>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer/>
      <ToastContainer/>
      <ToastContainer/>
      <ToastContainer/>
    </div>
  );
}

export default Signup;
