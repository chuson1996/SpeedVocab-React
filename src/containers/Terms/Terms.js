import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import extractParams from '../../helpers/extractParams';
import {
	isLoaded,
	load as loadTerms} from 'redux/modules/terms';
import * as termActions from 'redux/modules/terms';
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {bindActionCreators} from 'redux';
import last from 'lodash/last';
import {
	WordCard,
	// EditTermModal,
	AddNewTermForm
} from 'components';

@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		const {auth, routing, terms} = getState();
		const user = auth.user;
		const path = routing.locationBeforeTransitions.pathname;
		const id = terms.data ? terms.data.id : '';

		if (!isLoaded(getState()) || last(path.split('/')) !== id.toString()) {
			return dispatch(loadTerms(extractParams('/sets/:setId', path).setId, user.access_token));
		}
	}
}])
@connect(
	(state) => ({
		terms: state.terms.data,
		loading: state.terms.loading,
		editing: state.terms.editing,
	}),
	dispatch => bindActionCreators(termActions, dispatch)
)
export default class Terms extends Component {
	static propTypes = {
		terms: PropTypes.object,
		loading: PropTypes.bool,
		editing: PropTypes.object.isRequired,
		editStop: PropTypes.func.isRequired,
		editStart: PropTypes.func.isRequired,
		save: PropTypes.func.isRequired,
	};

	render() {
		const {terms: words} = this.props.terms || {};
		const {
			// editing,
			// editStop,
			// save,
			loading,
			editStart} = this.props;

		return (<div>
			<Helmet title="Terms"/>
			<Grid>
				<Row>
					<Col xs={12}>
						<AddNewTermForm/>
					</Col>
				</Row>
				<Row>
					<h1>Terms</h1>
					{loading && <h1>Loading!!!</h1>}
					{!loading && words && words.map((word) => {
						return (<WordCard
							key={word.id}
							word={word}
							edit={() => editStart(word)}/>);
					})}
				</Row>
				{/** <EditTermModal show={editing.editing} onHide={editStop} save={save}/> */}
			</Grid>
		</div>);
	}
}
