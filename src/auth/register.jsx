import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useCdn from '../hooks/use.cdn'
import "./../styles/auth.css"

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"


class UserInput {
    constructor(firstName = "", lastName = "", email = "", password = "", rPassword = "") {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.rPassword = rPassword
    }
}


function RegisterPage() {

    useCdn(cssCDN)

    // state user input
    const [userInput, setUserInput] = useState(new UserInput())
    // state error msg 
    const [errorMsg, setErrorMsg] = useState("")


    //handle change inputs
    let handleChangeInput = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }



    //handle submit register 
    let handleSubmitRegister = (e) => {
        //disable the refresh after submit 
        e.preventDefault()
        //validate data 
        //let errorMSG = validateRegisterData(userInput)
            //send data & get response from the server
            let errorMSG=""
        if (errorMSG=="")
            Axios.post('http://localhost:9000/api/auth/register', userInput)
            .then(data => console.log(data))
            .catch(err =>  setErrorMsg(err?.response?.data?.message))
        else
            setErrorMsg(errorMSG)
    }

    //validate data 

    let validateRegisterData = (newUser = new UserInput()) => {

        console.log(newUser);
        //firstname
        let firstnamePattern = /^.{4,12}$/
        if (!firstnamePattern.test(newUser.firstName)) {
            return "FirstName Should be at least 4 characters & maximum 12 😅"
        }
        //lastname
        let lastnamePattern = /^.{4,12}$/
        if (!lastnamePattern.test(newUser.lastName)) {
            return "LastName Should be at least 4 characters & maximum 12 😅"

        }
        //email
        let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

        if (!emailPattern.test(newUser.email)) {
            return "email Should be at least 4 characters & maximum 30 😅"

        }
        //password
        let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
        if (!passwordPattern.test(newUser.password)) {
            return "invalid password 😅"

        }
        //rpassword and password should be much 
        if (newUser.password !== newUser.rPassword) return "The Repeated Password should match the Password "

        return ""
    }


    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign Up</h3>

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
                        <form onSubmit={handleSubmitRegister}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={errorMsg?.includes("FirstName") == "" ? "fas fa-user" : "fas fa-user text-danger"}>
                                        </i>
                                    </span>
                                </div>
                                <input
                                    onFocus={() => setErrorMsg("")}
                                    onChange={handleChangeInput}
                                    name="firstName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Firstname"
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={errorMsg?.includes("LastName") == "" ? "fas fa-user" : "fas fa-user text-danger"}></i>
                                    </span>
                                </div>
                                <input onFocus={() => setErrorMsg("")}
                                    onChange={handleChangeInput}
                                    name="lastName" type="text"
                                    className="form-control"
                                    placeholder="Lastname" />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={errorMsg?.includes("Email") == "" ? "fas fa-at" : "fas fa-at text-danger"} ></i>
                                    </span>
                                </div>
                                <input onFocus={() => setErrorMsg("")}
                                    onChange={handleChangeInput}
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    placeholder="Email" />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={errorMsg?.includes("Password") == "" ? "fas fa-key" : "fas fa-key text-danger"} ></i></span>
                                </div>
                                <input
                                    onFocus={() => setErrorMsg("")}
                                    onChange={handleChangeInput}
                                    name="password"
                                    type="password"
                                    className="form-control" placeholder="Password" />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={errorMsg?.includes("Repeated Password") == "" ? "fas fa-key" : "fas fa-key text-danger"}></i></span>
                                </div>
                                <input
                                    onFocus={() => setErrorMsg("")}
                                    onChange={handleChangeInput}
                                    name="rPassword"
                                    type="password"
                                    className="form-control" placeholder="Confirm Password" />
                            </div>
                            <div className="form-group">
                                <input
                                    onFocus={() => setErrorMsg("")}
                                    type="submit"
                                    value="Register"
                                    className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Already have an account ? <Link to="/login">   Sign In </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage