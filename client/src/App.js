import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import { useForm } from "react-hook-form";

import axios from "axios";
import { set } from "mongoose";

function App() {
  //user fetch
  const [data, setData] = useState({});

  useEffect(
    () => {
      axios.get("/api/current_user").then((res) => {
        setData(res.data);
      });
    },
    { data }
  );

  //data from user fetch
  const { name, email, balance, role } = data;

  //login form
  const [login_email, setLogin] = useState("");
  const [login_password, setPassword] = useState("");
  const [LoginError, setLoginError] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/login", {
      email: login_email,
      password: login_password,
    });
    console.log(res.data.message);
    setLoginError(res.data.message);
  };

  //sign up form
  const [signup_email, setSemail] = useState("");
  const [signup_password, setSpassword] = useState("");
  const [date, setDate] = useState("");

  const signupSubmit = (e) => {
    e.preventDefault();
    const signupData = {
      name: "test",
      email: signup_email,
      password: signup_password,
      dob: date,
    };
    axios.post("/api/signup", signupData).then((res) => console.log(res));
  };

  //react-hook-form
  const { register, handleSubmit, errors } = useForm();

  //render
  if (data) {
    if (role) {
      return <div>MOD PAGE</div>;
    } else {
      return (
        <div>
          <span>{name + email}</span>
          <a href="/api/logout">
            {" "}
            <button>log out</button>
          </a>
        </div>
      );
    }
  } else {
    return (
      <div>
        {LoginError}
        <form action="" onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={login_email}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={login_password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">log in</button>
        </form>
        <a href="/auth/google">
          <button> google oauth</button>
        </a>
        <br></br>
        signup
        <form onSubmit={signupSubmit}>
          <input
            type="email"
            name="s_email"
            value={signup_email}
            onChange={(e) => {
              setSemail(e.target.value);
            }}
          ></input>
          <input
            name="s_password"
            value={signup_password}
            onChange={(e) => {
              setSpassword(e.target.value);
            }}
          ></input>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></input>
          <button type="submit">Sign up</button>
        </form>
        <form
          noValidate
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({
              validate: async (value) => {
                const res = await axios.post("/api/check_email", {
                  email: value,
                });

                return res === 200;
              },
            })}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.email ? true : false}
          />
          {errors.email && "Email already exist"}

          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
