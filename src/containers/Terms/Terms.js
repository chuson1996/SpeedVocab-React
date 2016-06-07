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
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
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
		accessToken: state.auth.user.access_token,
		pathName: state.routing.locationBeforeTransitions.pathname,
	}),
	dispatch => bindActionCreators(termActions, dispatch)
)
export default class Terms extends Component {
	static propTypes = {
		// State 2 Props
		terms: PropTypes.object,
		loading: PropTypes.bool,
		editing: PropTypes.object.isRequired,
		accessToken: PropTypes.string,
		pathName: PropTypes.string,
		// Actions 2 Props
		editStop: PropTypes.func.isRequired,
		editStart: PropTypes.func.isRequired,
		save: PropTypes.func.isRequired,
		load: PropTypes.func.isRequired,
	};

	refresh = () => {
		const { pathName, accessToken } = this.props;
		this.props.load(extractParams('/sets/:setId', pathName).setId, accessToken);
	};

	render() {
		const {terms: words} = this.props.terms || {};
		const {
			// editing,
			// editStop,
			// save,
			loading,
			editStart} = this.props;
		const setId = (this.props.terms) ? this.props.terms.id : undefined;

		return (<div>
			<Helmet title="Terms"/>
			<Grid>
				<Jumbotron style={{backgroundColor: 'white'}}>
					<Row>
						<Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
							{ setId && <AddNewTermForm setId={setId}/>}
						</Col>
					</Row>
				</Jumbotron>
				<hr/>
				<Row>
					<Col xs={12} style={{textAlign: 'right'}}>
						<Button onClick={this.refresh}>
							<Glyphicon glyph="refresh"/>
						</Button>
					</Col>
				</Row>
				<br/>
				<Row>
					{loading && <h1>Loading!!!</h1>}
					{!loading && words && words.reverse().map((word) => {
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
