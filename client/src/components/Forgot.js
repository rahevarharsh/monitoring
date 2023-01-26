import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
let parseEmail;

const Forgot = () => {
	const navigate = useNavigate();
	const [userEmail, setUserEmail] = useState({ email: "" });
	// var invalid = "";
	const handleInput = (event) => {
		setUserEmail((preval) => { return { ...preval, email: event.target.value } });
	}

	const sendData = async (event) => {
		event.preventDefault();

		const { email } = userEmail
		window.alert(email)
		const res = await fetch("/forgotpassword", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email })
		})
		
		console.log(res.status);
		if (res.status===200) {
			parseEmail = email;
			navigate("/otp")
		}
		else{
			navigate("/forgot")
		}
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
									<h4 className="card-title">Forgot Password</h4>
									<form className="my-login-validation" noValidate="">
										<div className="form-group">
											<label for="email">E-Mail Address</label>
											<input id="email" type="email" onChange={handleInput} className="form-control" name="email" required autoFocus />
											<div className="invalid-feedback">
												Email is invalid
											</div>
											<div className="form-text text-muted">
												By clicking "Reset Password" we will send a password reset link
											</div>
										</div>
										<p></p>
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

export default Forgot
export {parseEmail}