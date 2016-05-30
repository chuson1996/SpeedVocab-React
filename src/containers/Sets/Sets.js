import React, { PropTypes, Component } from 'react';
import { asyncConnect } from 'redux-async-connect';
import {isLoaded, load as loadSets} from 'redux/modules/sets';
import {connect} from 'react-redux';
import * as setActions from 'redux/modules/sets';
// import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		const user = getState().auth.user;
		if (!isLoaded(getState())) {
			return dispatch(loadSets(user.user_id, user.access_token));
		}
	}
}])
@connect(
	(state) => ({
		sets: state.sets.data,
		loading: state.sets.loading
	}),
	{ ...setActions }
)
export default class Sets extends Component {
	static propTypes = {
		sets: PropTypes.array,
		loading: PropTypes.bool
	};

	render() {
		const { sets } = this.props;

		return (<div>
			<Helmet title="Sets"/>
			<Grid>
				<Row>
					<Col xs={12}>
						<h1>Hey yo Sets</h1>
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={8} lg={6}>
						{ sets && sets.map((set) => {
							return (<LinkContainer key={set.id} to={`/sets/${set.id}`}>
								<Panel>
									<Row>
										<Col xs={9}>
											<h3>{set.title}</h3>
										</Col>
										<Col xs={3}>
											<h4>{set.lang_terms}->{set.lang_definitions}</h4>
										</Col>
									</Row>
								</Panel>
							</LinkContainer>);
						})}
					</Col>
				</Row>
			</Grid>
		</div>);
	}
}
