import React from 'react'

const Forgot = () => {
  return (
    <div>
    <section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-md-center align-items-center h-100">
				<div className="card-wrapper">
					<div className="brand">
						<img src="img/logo.png" alt="bootstrap 4 login page"/>
					</div>
					<div className="card fat">
						<div className="card-body">
							<h4 className="card-title">Forgot Password</h4>
							<form method="POST" className="my-login-validation" noValidate="">
								<div className="form-group">
									<label for="email">E-Mail Address</label>
									<input id="email" type="email" className="form-control" name="email" required autoFocus />
									<div className="invalid-feedback">
										Email is invalid
									</div>
									<div className="form-text text-muted">
										By clicking "Reset Password" we will send a password reset link
									</div>
								</div>

								<div className="form-group m-0">
									<button type="submit" className="btn btn-primary btn-block">
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