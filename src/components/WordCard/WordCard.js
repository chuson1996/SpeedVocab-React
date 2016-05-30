import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

export default class WordCard extends Component {
	static propTypes = {
		word: PropTypes.object
	};

	render() {
		const {word} = this.props;

		return (<Col xs={6} sm={4} md={3} lg={3}>
					<Panel>
						<p>{word.term} : {word.definition}</p>
						{word.image && <img src={word.image.url} style={{'max-width': '100%'}}/>}
					</Panel>
				</Col>);
	}
}
