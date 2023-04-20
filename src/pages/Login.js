/** @format */

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../Login.css";
import { Alert, Form, Button, Logo } from "../components";
import { Api } from "../api/Api";
import { Storage } from "../storage/Storage";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const user = { email, password };
      Api(`/user/login`, user, "POST")
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setSuccess("Login Successful!");
            Storage.set("user", JSON.stringify(data));
            navigate("/dashboard");
          } else {
            setError(data.message);
            setTimeout(() => {
              setError("");
            }, "3000");
          }
        })
        .catch((err) => console.log(err));
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
           <h1 className='title'>Sign In</h1>
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

           <div className='my'>
             <Button.Lg
               type={"submit"}
               label={"Login"}
               handleClick={handleLogin}
             />
             <Link to={"/register"} className='link mt'>
               Create Account
             </Link>
           </div>
         </Form.Container>
       </div>
     </div>
   );
}

export default Login;
