import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useCdn from '../hooks/use.cdn'

import "./../styles/auth.css"

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

class ResetPasswordInput {

    constructor(cPassword = "", password = "") {
        this.cPassword = cPassword
        this.password = password
    }

}

function ResetPasswordPage() {


    useCdn(cssCDN)

    //state for reset Password
    const [resetPasswordInput, setResetPasswordInput] =
        useState(new ResetPasswordInput())

    //state for errorMsgs
    const [errorMsg, setErrorMsg] = useState("")

    //handle change input 
    let handleChangeInput = (e) => {
        setResetPasswordInput({
            ...resetPasswordInput,
            [e.target.name]: e.target.value
        })
    }
    //handle login submit 
    let handleResetPasswordSubmit = (e) => {
        e.preventDefault()
        //send data & get response from the server
        let errorMSG = validateResetPasswordData(resetPasswordInput)
        if (errorMSG == "") {
            //let emailFromURL =
            //let tokenFromURL =
            let resetPasswordEndPoint =
                `http://localhost:9000/api/auth/${emailFromURL}/code/${tokenFromURL}`
            Axios.post(resetPasswordEndPoint, resetPasswordInput)
                .then(data => console.log(data))
                .catch(err => setErrorMsg(err?.response?.data?.message))
        }

        else
            setErrorMsg(errorMSG)
    }

    let validateResetPasswordData = () => {
        let { password, } = resetPasswordInput
        if (password == "" || email == "")
            return "Email and Password Are required"

        let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        if (!emailPattern.test(newUser.email))
            return "Please Enter a valid Email Address 😅"

        return ""
    }

    return <div className="container mt-5">
        <div className="d-flex justify-content-center h-100">
            <div className="card card-custom">
                <div className="card-header">
                    <h3 style={{ marginTop: 15 }}>Reset Password</h3>
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
                    <form onSubmit={handleResetPasswordSubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-key" ></i></span>
                            </div>
                            <input onFocus={() => setErrorMsg("")}
                                    type="password"
                                    className="form-control"
                                    placeholder="New Password"
                                    name='password' 
                                    />
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-key" ></i></span>
                            </div>
                            <input onFocus={() => setErrorMsg("")}
                                type="password"
                                className="form-control"
                                placeholder="Confirm New Password"
                                name='rPassword' />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Change " className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Already have an account ? <Link to="/">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ResetPasswordPage