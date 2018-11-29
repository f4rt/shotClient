import React, { Component } from 'react';

class LoginForm extends Component {
	state = { 
		data: {
			photo: '',
			firstname: '',
			surname: '',
			email: '',
			password: ''
		},
		errors: {}
	}

	onChange = (e) => {
		this.setState({ 
			data: { 
				...this.state.data, 
				[e.target.name]: e.target.value 
				},
			errors: {
				...this.state.errors,
				[e.target.name]: ''
				}
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });

		if (Object.keys(errors).length === 2 && this.props.status === 'Sign in') {
			this.props.signin(this.state.data).catch(err => this.setState({errors: err.response.data.errors}));
		}

		if(Object.keys(errors).length === 0 && this.props.status === 'Sign up') {
			this.props.signup(this.state.data).catch(err => this.setState({errors: err.response.data.errors}));
		}
	};

	validate = (data) => {
		const errors = {};
		if (!data.firstname) errors.firstname = 'First name is required';
		if (!data.surname) errors.surname = "Surname is required";
		if (!data.email) errors.email = "Email is required";
		if (!data.password) errors.password = "Password is required";
		return errors;
	};

	render() {
		const {errors} = this.state
		const {status} = this.props
		console.log(errors)

		return (
			<div className="form-container">
				<div className="form-close" onClick={this.props.close}></div>
				<div className="form">
					<form autoComplete="off">

						{errors.global && <label className="form__global-error">{errors.global}</label>}
					
						{status === 'Sign up' && 
						<React.Fragment>
							<input name="photo" type="text" placeholder="Photo url" onChange={this.onChange}/>

							{errors.firstname && <label className="form__error">{errors.firstname}</label>}
							<input name="firstname" type="text" placeholder="First name" onChange={this.onChange}/>

							{errors.surname && <label className="form__error">{errors.surname}</label>}
							<input name="surname" type="text" placeholder="Surname" onChange={this.onChange}/>
						</React.Fragment>
						}

						{errors.email && <label className="form__error">{errors.email}</label>}
						<input name="email" type="email" placeholder="Email" onChange={this.onChange}/>

						{errors.password && <label className="form__error">{errors.password}</label>}
						<input name="password" type="password" placeholder="Password" onChange={this.onChange}/>

						<button className="form__button" onClick={this.onSubmit}>{status}</button>
					</form>
				</div>
			</div>
		);
	}
}
 
export default LoginForm;