import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';

@reduxForm({
	form: 'editTerm',
	fields: ['term', 'definition', 'note']
})
@connect(
	(state) => ({editing: state.terms.editing}),
	null
)
export default class EditTermModal extends Component {
	static propTypes = {
		fields: PropTypes.object.isRequired,
		editing: PropTypes.object.isRequired,
		save: PropTypes.func.isRequired,
		values: PropTypes.object.isRequired,
	};

	render() {
		const { fields: {term, definition, note}, editing, save, values } = this.props;

		return (
			<Modal {...this.props}>
				<Modal.Header closeButton>
					<h1>Edit</h1>
				</Modal.Header>
				<Modal.Body>
					<input type="text" className="form-control" placeholder="Term" name="term" {...term} value={editing.word.term}/>
					<input type="text" className="form-control" placeholder="Definition" name="definition" {...definition} value={editing.word.definition}/>
					<input type="text" className="form-control" placeholder="Note" name="note" {...note}/>
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar style={{textAlign: 'center'}}>
						<Button bsStyle="success" style={{float: 'none'}} onClick={() => save({
							...editing.word,
							note: values.note
						})}>
							Next
						</Button>
					</ButtonToolbar>
				</Modal.Footer>
			</Modal>
			);
	}
}
