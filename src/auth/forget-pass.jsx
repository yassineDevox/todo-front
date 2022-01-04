import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useCdn from '../hooks/use.cdn'

import "./../styles/auth.css"

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

class ForgetPasswordInput {

    constructor(email = "") {
        this.email = email
    }

}

function ForgetPasswordPage() {

    useCdn(cssCDN)
    //state for forget form's Input
    const [forgetInput, setForgetInput] = useState(new ForgetPasswordInput())

    //state for errorMsgs
    const [errorMsg, setErrorMsg] = useState("")

    //handle change input 
    let handleChangeInput = (e) => {
        setForgetInput({
            ...forgetInput,
            [e.target.name]: e.target.value
        })
    }
    //handle Forget submit 
    let handlForgetSubmit = (e) => {
        e.preventDefault()

        //send data & get response from the server
        let errorMSG = validateForgetData(forgetInput)
        if (errorMSG == "")
            Axios.post('http://localhost:9000/api/auth/forget-pass', forgetInput)
                .then(data => console.log(data))
                .catch(err => setErrorMsg(err?.response?.data?.message))
        else
            setErrorMsg(errorMSG)
    }

    let validateForgetData = (forgetInput) => {
        let { email } = forgetInput
        if (email == "")
            return "Email and Password Are required "

        let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        if (!emailPattern.test(forgetInput.email)) {
            return "Please Enter a valid Email Address 😅"

        }
        return ""
    }

    return <div className="container mt-5">
        <div className="d-flex justify-content-center h-100">
            <div className="card card-custom">
                <div className="card-header">
                    <h3 style={{ marginTop: 15 }}>Forget Password</h3>
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
                    <form onSubmit={handlForgetSubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i
                                        className=
                                        {
                                            errorMsg?.includes("Email") == "" ?
                                                "fas fa-at" : "fas fa-at text-danger"
                                        } >
                                    </i>
                                </span>
                            </div>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Confirm Your Email"
                                name='email'
                                onChange={handleChangeInput} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Send" className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account ? <Link to="/register">
                            Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default ForgetPasswordPage