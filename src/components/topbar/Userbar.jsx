import React, {Component} from 'react';
import LoginForm from './LoginForm';
import UploadModal from './UploadModal/UploadModal';
import api from '../../api';
import {connect} from 'react-redux';
import {login, logout} from '../../actions/auth';

class Userbar extends Component {

	state = {
		status: '',
		showUpload: false,
		showContext: false
	}

	openModal = (e) => 
		this.setState({ status: e.target.value });

	closeModal = () => 
		this.setState({ status: '' });

	openUpload = () => 
		this.setState({ showUpload: true });

	closeUpload = () => 
		this.setState({ showUpload: false });

	showContext = () =>
		this.setState({ showContext: true });

	hideContext = () => 
		this.setState({ showContext: false });
	
	signIn = (data) => 
		this.props.login(data)

	signUp = (data) =>
		api.user.signup(data);

	render() {
		const {status, showUpload, showContext} = this.state
		const {isAuth, user} = this.props

		return (
			<div className="userbar">
				{!isAuth 
				?	<React.Fragment>
						<button value="Sign in" className="userbar__link-button" onClick={this.openModal}>Sign in</button>
						<button value="Sign up" className="userbar__link-button" onClick={this.openModal}>Sign up</button>
						{status &&
							<LoginForm status={status} close={this.closeModal} signin={this.signIn} signup={this.signUp}/>
						}
					</React.Fragment>
				:	<React.Fragment>
						<div className="userbar__avatar" onMouseEnter={this.showContext} 
							onMouseLeave={this.hideContext} style={{  backgroundImage: 'url(' + user.photo + ')'}}>

							{showContext &&
							<div className="profile-menu">
								<ul>
									<li>My profile</li>
									<li>My galleries</li>
									<li>My collections</li>
									<li onClick={this.props.logout}>Log out</li>
								</ul>
							</div>
							}
						</div>
						<div className="userbar__username">{user.firstname} {user.surname}</div>
						<button className="userbar__upload" onClick={this.openUpload}>Upload</button>
					</React.Fragment>
				}
				{showUpload && <UploadModal closeModal={this.closeUpload} user={this.props.user}/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return({
		isAuth: !!state.user.token,
		user:	state.user
	})
}
 
export default connect(mapStateToProps, {login, logout})(Userbar);