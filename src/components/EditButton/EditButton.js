import React, {Component} from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class EditButton extends Component {
	render() {
		const styles = require('./EditButton.scss');
		return (<span className={styles.editButton} {...this.props}>
			<Glyphicon glyph="pencil"/>
			<span className={styles.editSpan}>Edit</span>
		</span>);
	}
}
