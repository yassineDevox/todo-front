import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useCdn from '../hooks/use.cdn'

import "./../styles/auth.css"

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

class LoginInput {

    constructor(email = "", password = "") {
        this.email = email
        this.password = password
    }

}

function LoginPage() {

    useCdn(cssCDN)
    //state for loginInput
    const [loginInput, setLoginInput] = useState(new LoginInput())

    //state for errorMsgs
    const [errorMsg, setErrorMsg] = useState("")

    //handle change input 
    let handleChangeInput = (e) => {
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }
    //handle login submit 
    let handleLoginSubmit = (e) => {
        e.preventDefault()
        
        //send data & get response from the server
        let errorMSG=validateLoginData(loginInput)
        if (errorMSG=="")
            Axios.post('http://localhost:9000/api/users/login', loginInput)
            .then(data => console.log(data))
            .catch(err => setErrorMsg(err?.response?.data?.message))
        else
            setErrorMsg(errorMSG)
    }

    let validateLoginData = (loginInput) => {
        let { password, email } = loginInput
        if (password == "" || email == "")
            return "Email and Password Are required 😅"

        let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        if (!emailPattern.test(email)) {
            return "Please Enter a valid Email Address 😅"

        }
        return ""
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square" ></i></span>
                            <span><i className="fab fa-google-plus-square" ></i></span>
                            <span><i className="fab fa-twitter-square" ></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                         {/* ERROR MSG PART  */}
                         <div className={errorMsg == "" ? "d-none" : "alert alert-danger"}>
                            {errorMsg}
                        </div>
                        {/* FORM PART  */}
                        <form onSubmit={handleLoginSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i 
                                        className="fas fa-user" ></i></span>
                                </div>
                                <input

                                    onFocus={()=>setErrorMsg("")}
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChangeInput} />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key" ></i></span>
                                </div>
                                <input
                                onFocus={()=>setErrorMsg("")}
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleChangeInput} />
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" />Remember Me
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account ? <Link to="/register">Sign Up</Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/forget-pass">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage