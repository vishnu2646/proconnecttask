import React, { useState } from 'react'
import "./login.css"

const Login = () => {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const loginwithgoogle = ()=>{
        window.open(`${process.env.REACT_APP_API_URL}/auth/google`,"_self")
    }

    const handleManualLogin = ()=>{
        console.log('manual login', loginForm);
        alert('please use google login');
    }

    return (
        <>
            <div className="login-page">
                <h1 style={{textAlign:"center"}}>Login</h1>
                <div className="form">
                    <form className='login-form'>
                        <input type="text" name="username" id="username" placeholder='username' onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}/>
                        <input type="password" name="password" id="password" placeholder='password' onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                        <button onClick={handleManualLogin}>Login</button>
                        <p className='message mt-3 mb-0'>Not Registerd? <a href="/">Create an account</a></p>
                    </form>
                    <button className='login-with-google-btn mt-3' onClick={loginwithgoogle}>
                        Sign In With Google
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login