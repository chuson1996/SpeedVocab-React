import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
// import ApiClient from 'helpers/ApiClient';
import * as authActions from 'redux/modules/auth';

// const client = new ApiClient();
// import { asyncConnect } from 'redux-async-connect';
// import universalFetch from '../../helpers/universalFetch';

// @asyncConnect([{
// 	promise: ({store: {dispatch, getState}}) => {
// 		return universalFetch('https://api.quizlet.com/oauth/token?grant_type=authorization_code&code=GENERATED_CODE', {
// 			method: 'POST',
// 			headers: {
// 				Authorization: 'Basic VTl6R3FnS0J5QjpnY2VVbTM3UmZqa2dlUXc2bkp1UUtq',
// 			}
// 		}).then((res) => {
// 			console.log(res);
// 		});
// 	}
// }])
@connect(
	state => ({ routerState: state.routing.locationBeforeTransitions }),
	authActions
)
export default class QuizletLoginSuccess extends Component {
	static propTypes = {
		routerState: PropTypes.object,
		quizletLogin: PropTypes.func,
	};

	componentDidMount() {
		this.props.quizletLogin(this.props.routerState.query.code)
			.then((res) => {
				console.log(res.access_token);
				window.localStorage.setItem('access_token', res.access_token);
			});
	}

	render() {
		// console.log('Props: ', this.props);
		return <h1>Quizlet Login Success. Hey</h1>;
	}
}
