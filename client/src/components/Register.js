import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {

	const [userData, setUserData] = useState({
		"RollName": "",
		"email": "",
		"password": ""
	})

	const handleInput = (event) => {
		setUserData((preVal) => { return { ...preVal, [event.target.name]: event.target.value } })
	}

	const submitData = async (event) => {
		event.preventDefault();
		const { RollName, email, password } = userData;
		const res = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ RollName, email, password })
		})

		const val = await res.json;
		console.log(val);
	}

	return (
		<div>
			<section className="h-100">
				<div className="container h-100">
					<div className="row justify-content-md-center h-100">
						<div className="card-wrapper">
							<div className="brand">
								<img src="img/logo.png" alt="bootstrap 4 login page" />
							</div>
							<div className="card fat">
								<div className="card-body">
									<h4 className="card-title">Register</h4>
									<form method="POST" className="my-login-validation" noValidate="">
										<div className="form-group">
											<label htmlFor="Role">Role</label>
											<select onChange={handleInput} defaultValue="0" value={userData.RollName} className="form-select slt" name='RollName' id="myslt" aria-label="Default select example">
												<option selected className="inside_text_role opt">--------------Role--------------</option>
												<option value="Police Officer" className="opt">Police Officer</option>
												<option value="S.P" className="opt">S.P</option>
												<option value="Nodal Officer" className="opt">Nodal Officer</option>
											</select>
										</div>

										<div className="form-group">
											<label for="email">E-Mail Address</label>
											<input onChange={handleInput} id="email" type="email" className="form-control" name="email" required />
											<div className="invalid-feedback">
												Your email is invalid
											</div>
										</div>

										<div className="form-group">
											<label for="password">Password</label>
											<input onChange={handleInput} id="password" type="password" className="form-control" name="password" required data-eye />
											<div className="invalid-feedback">
												Password is required
											</div>
										</div>

										<div className="form-group">
											<div className="custom-checkbox custom-control">
												<input type="checkbox" name="agree" id="agree" className="custom-control-input" required="" />
												<label for="agree" className="custom-control-label">I agree to the <NavLink href="#">Terms and Conditions</NavLink></label>
												<div className="invalid-feedback">
													You must agree with our Terms and Conditions
												</div>
											</div>
										</div>

										<div className="form-group m-0">
											<button onClick={submitData} type="submit" className="btn btn-primary btn-block">
												Register
											</button>
										</div>
										<div className="mt-4 text-center">
											Already have an account? <a href="index.html">Login</a>
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

export default Register