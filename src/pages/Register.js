import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../Login.css";
import { Alert, Form, Button, Logo } from "../components";
import { Api } from "../api/Api";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = { email, password };
      try {
        Api(`/user/register`, user, "POST")
          .then((res) => res.json())
          .then((data) => {
            if (data.id) {
              setSuccess("Signup Successful!");
              setTimeout(() => {
                navigate("/");
              }, "3000");
            } else {
              setError(data.message);
              setTimeout(() => {
                setError("");
              }, "3000");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        setError(error);
        setTimeout(() => {
          setError("");
        }, "3000");
      }
    } else {
      setError("Passwords do not match!");
      setTimeout(() => {
        setError("");
      }, "3000");
    }
  };
  return (
    <div className='wrapper'>
      <div>
        <Logo />
      </div>

      {error ? <Alert status={"error"} message={error} /> : null}
      {success ? <Alert status={"success"} message={success} /> : null}
      <div className='max-w-sm'>
        <Form.Container>
          <h1 className='title'>Sign Up</h1>
          <Form.Input
            type={"email"}
            label={"Email"}
            name={"email"}
            required={true}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            type={"password"}
            label={"Password"}
            name={"password"}
            required={true}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Form.Input
            type={"password"}
            label={"Confirm Password"}
            name={"confirmPassword"}
            required={true}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className='my'>
            <Button.Lg
              type={"submit"}
              label={"Create Account"}
              handleClick={handleLogin}
            />
            <Link to={"/"} className='link mt'>
              Sign In
            </Link>
          </div>
        </Form.Container>
      </div>
    </div>
  );
}

export default Register;
