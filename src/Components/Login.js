import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://notebook-server-fawn.vercel.app/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success) {
            //saving auth-token and redirect
            localStorage.setItem('token', json.Authtoken);
            props.showalert("Successfully Login", "success");
            navigate('/');
        }
        else {
            props.showalert("Invalid Credentials", "danger")
        }
    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h2>Login to continue with Notebook</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
