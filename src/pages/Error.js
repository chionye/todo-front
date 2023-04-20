/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Error.css";
import "../components/Form/Form.css";
import warning from "../assets/images/warning.png";

function Error() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className='full-height'>
      <div className='error-image'>
        <img src={warning} alt='Access Denied' className='' />
      </div>
      <div className='my center-align'>
        <h1 className='error-title'>Access Denied</h1>
        <button type='submit' className='btn btn-lg' onClick={handleLogin}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Error;
