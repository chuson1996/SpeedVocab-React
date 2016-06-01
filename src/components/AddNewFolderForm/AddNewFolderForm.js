import React, { PropTypes, Component } from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as folderActions from 'redux/modules/folders';

@connect(
	state => ({
		saveError: state.folders.saveError,
		userId: state.auth.user.user_id,
		accessToken: state.auth.user.access_token
	}),
	dispatch => bindActionCreators(folderActions, dispatch)
)
@reduxForm({
	form: 'folder',
	fields: ['name', 'fromLang', 'toLang']
})
export default class AddNewFolderForm extends Component {
	static propTypes = {
		fields: PropTypes.object.isRequired,
		save: PropTypes.func.isRequired,
		editStop: PropTypes.func.isRequired,
		values: PropTypes.object.isRequired,
		submitting: PropTypes.bool.isRequired,
		saveError: PropTypes.object,
		userId: PropTypes.string,
		accessToken: PropTypes.string,
	};

	render() {
		const { values, save, fields: {name, fromLang, toLang} } = this.props;
		return (
			<div>
				<button onClick={this.getUsers}>Get users</button>
				<h1>A list of folders will be here.</h1>
				<input className="form-control" type="text" placeholder="Folder Name" name="name" {...name}/>
				<input className="form-control" type="text" placeholder="From Lang" name="fromLang" {...fromLang}/>
				<input className="form-control" type="text" placeholder="To Lang" name="toLang" {...toLang}/>
				<ButtonToolbar>
					<Button onClick={() => save(values)}>Add</Button>
				</ButtonToolbar>
			</div>
			);
	}
}
