import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import config from '../../config';
@connect(
	state => ({user: state.auth.user}),
	authActions) // authAcount: { login: void, logout: void, ... }
export default class Login extends Component {
	static propTypes = {
		user: PropTypes.object,
		login: PropTypes.func,
		logout: PropTypes.func,
		facebookLogin: PropTypes.func
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const input = this.refs.username;
		this.props.login(input.value);
		input.value = '';
	}

	quizletLogin = () => {
		const redirectUri = config.auth.quizlet.redirectUri;
		const scope = ['read', 'write_set', 'write_group'].join(' ');
		const clientId = config.auth.quizlet.clientId;
		window.location.href = `https://quizlet.com/authorize?scope=${scope}&client_id=${clientId}&response_type=code&state=authenticated&redirect_uri=${redirectUri}`;
	}

	render() {
		const {user, logout} = this.props;
		const styles = require('./Login.scss');
		return (
			<div className={styles.loginPage + ' container'}>
				<Helmet title="Login"/>
				<h1>Login</h1>
				{!user &&
				<div>
					<a className="btn btn-success" onClick={this.props.facebookLogin}>Login with Facebook</a>
					<a className="btn btn-success" onClick={this.quizletLogin}>Login with Quizlet</a>
					<form className="login-form form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
						</div>
						<button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
						</button>
					</form>
					<p>This will "log you in" as this user, storing the username in the session of the API server.</p>
				</div>
				}
				{user &&
				<div>
					<p>You are currently logged in as {user.name}.</p>

					<div>
						<button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
					</div>
				</div>
				}
			</div>
		);
	}
}
