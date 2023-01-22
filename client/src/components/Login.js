import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
const Login = () => {

    const [data,setData] = useState({
        "RollName":"",
        "email":"",
        "password":""
    });

    const handleInput = (event)=>{
        setData((preVal)=>{
            return {...preVal,[event.target.name]:event.target.value}
        })
    }
  return (
    <div className='my-login-page'>
    <section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-md-center h-100">
				<div className="card-wrapper">
					<div className="brand">
						<img src="img/logo.png" alt="logo"/>
					</div>
					<div className="card fat">
						<div className="card-body">
							<h4 className="card-title">Login</h4>
							<form method="POST" className="my-login-validation" noValidate="">

								<div className="form-group">
									<label htmlFor="Role">Role</label>
									<select onChange={handleInput} defaultValue="0" value={data.RollName} className="form-select slt" name='RollName' id="myslt" aria-label="Default select example">
										<option selected className="inside_text_role opt">--------------Role--------------</option>
										<option value="1" className="opt">Police Officer</option>
										<option value="2" className="opt">S.P</option>
										<option value="3" className="opt">Nodal Officer</option>
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="email">E-Mail Address</label>
									<input id="email" type="email" value={data.email} onChange={handleInput} className="form-control" name="email"  required autoFocus />
									<div className="invalid-feedback">
										Email is invalid
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="password">Password
										<NavLink to="/forgot" className="float-right">
											Forgot Password?
										</NavLink>
									</label>
									<input id="password" type="password" onChange={handleInput} value={data.password} className="form-control" name="password" required data-eye />
								    <div className="invalid-feedback">
								    	Password is required
							    	</div>
								</div>

								<div className="form-group m-0">
									<button type="submit" className="btn btn-primary btn-block">
										Login
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

export default Login