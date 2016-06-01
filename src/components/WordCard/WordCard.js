import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
// import Row from 'react-bootstrap/lib/Row';
// import Glyphicon from 'react-bootstrap/lib/Glyphicon';
// import {EditButton} from 'components';

export default class WordCard extends Component {
	static propTypes = {
		word: PropTypes.object,
		edit: PropTypes.func
	};

	render() {
		const {word} = this.props;

		return (<Col xs={6} sm={4} md={3} lg={3}>
					<Panel
						onMouseEnter={() => this.setState({ mouseover: true })}
						onMouseLeave={() => this.setState({ mouseover: false })}>
						<h2>{word.term}</h2>
						<p>{word.definition}</p>
						{word.image && <img src={word.image.url} style={{maxWidth: '100%'}}/>}
						{/**
						<Row style={{display: (this.state && this.state.mouseover) ? 'block' : 'none'}}>
							<hr/>
							<Col xs={6}><EditButton onClick={this.props.edit}/></Col>
							<Col xs={6} className="text-right"><Glyphicon glyph="trash"/></Col>
						</Row>
						 */}
					</Panel>
				</Col>);
	}
}
