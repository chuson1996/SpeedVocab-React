import React, {Component, PropTypes} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class DefAndExCard extends Component {
	static propTypes = {
		definitions: PropTypes.array,
		examples: PropTypes.array,
		definitionsLoading: PropTypes.bool,
		examplesLoading: PropTypes.bool,
	};

	render() {
		const { definitions, examples,
			definitionsLoading, examplesLoading } = this.props;
		return (
			<Row>
				{ definitions && !definitionsLoading
				 && <Col md={6}>
					<h2>Definitions: </h2>
					{ definitions && definitions.map(({partOfSpeech, definition}, index) => {
						return <p key={index}>{index + 1}. ({partOfSpeech}) {definition}</p>;
					}) }
				</Col> }

				{ examples && !examplesLoading
				 && <Col md={6}>
					<h2>Examples: </h2>
					{ examples.map((example, index) => {
						return <p key={index}>{index + 1}. {example}</p>;
					}) }
				</Col> }
			</Row>
		);
	}
}
