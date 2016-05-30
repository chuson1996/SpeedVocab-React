import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import extractParams from '../../helpers/extractParams';
import {isLoaded, load as loadTerms} from 'redux/modules/terms';
import * as termActions from 'redux/modules/terms';
import Helmet from 'react-helmet';
import {WordCard} from 'components';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		const {auth, routing} = getState();
		const user = auth.user;
		const path = routing.locationBeforeTransitions.pathname;

		// if (!isLoaded(getState())) {
		return dispatch(loadTerms(extractParams('/sets/:setId', path).setId, user.access_token));
		// }
	}
}])
@connect(
	(state) => ({
		terms: state.terms.data,
		loading: state.terms.loading
	}),
	{ ...termActions }
)
export default class Terms extends Component {
	static propTypes = {
		terms: PropTypes.object,
		loading: PropTypes.bool,
	};

	render() {
		const {terms: words} = this.props.terms || {};
		const {loading} = this.props;
		console.log(words);
		return (<div>
			<Helmet title="Terms"/>
			<Grid>
				<Row>
					<h1>Terms</h1>
					{loading && <h1>Loading!!!</h1>}
					{!loading && words && words.map((word) => {
						return (<WordCard key={word.id} word={word}/>);
					})}
				</Row>
			</Grid>
		</div>);
	}
}
