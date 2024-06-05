import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Signup.css';

function Signup(props) {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://notebook-server-kappa.vercel.app/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      if (json.success) {
        // Saving auth-token and redirect
        localStorage.setItem('token', json.Authtoken);
        navigate('/');
        props.showalert("Account Created Successfully", "success");
      } else {
        props.showalert("Invalid Details", "danger");
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      props.showalert("Something went wrong. Please try again.", "danger");
    }
  };

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='signup'>
      <h2 className='signup-heading'>Create an account to use Notebook</h2>
      <form onSubmit={handlesubmit} className='signup-form'>
        <div >
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="name" onChange={onchange} minLength={3} required />
        </div>
        <div >
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div >
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required />
        </div>
        <button type="submit" className="btn sign-btn submit-button">Submit</button>
      </form>
    </div>
  )
}

export default Signup;
