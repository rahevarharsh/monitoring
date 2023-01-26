import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { parseEmail } from './Forgot';
const Otp = () => {
    const navigate = useNavigate();
    const [otpData, setOtp] = useState({ "otp": "" })
    const [InvalidOTP, setInvalidOTP] = useState("");
    const OtpStyle = {
        "color":"red"
    }
    const handleInput = (event) => {
        setOtp((preval) => { return { ...preval, [event.target.name]: event.target.value } })
    }

    const sendData = async (event) => {
        event.preventDefault();
        const { otp } = otpData;
        if (!otp) {
            window.alert("Enter otp");
            return;
        }
        const res = await fetch("/otp", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ otp })
        })
        if (await res.status === 200) {
            navigate("/");
        }
        else {
           setInvalidOTP("Worng OTP !")
        }

    }

    const ResendOtp = async(event)=>{
      const res = await fetch("/resend",{
            method:'post',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({parseEmail})
        })

    }
    return (
        <div>
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center align-items-center h-100">
                        <div className="card-wrapper">
                            <div className="brand">
                                <img src="img/logo.png" alt="bootstrap 4 login page" />
                            </div>
                            <div className="card fat">
                                <div className="card-body">
                                    <h4 className="card-title">OTP Verification</h4>
                                    <form className="my-login-validation" noValidate="">
                                        <div className="form-group">
                                            <label htmlFor="email">Enter OTP</label>
                                            <input id="email" type="number" value={otpData.otp} onChange={handleInput} className="form-control" name="otp" required autoFocus />
                                            <div className="invalid-feedback">
                                                Email is invalid
                                            </div>
                                            <div className="form-text text-muted">
                                                By clicking "Reset Password" we will send a password reset link
                                            </div>
                                        </div>
                                        <NavLink onClick={ResendOtp}>Resend otp</NavLink>
                                        <p style={OtpStyle}>{InvalidOTP}</p>
                                        <div className="form-group m-0">
                                            <button onClick={sendData} type="submit" className="btn btn-primary btn-block">
                                                Reset Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="footer">
                                Copyright &copy; 2023 &mdash; WMIS
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}

export default Otp