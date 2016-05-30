import React, { PropTypes, Component } from 'react';

export default class AddNewFolderForm extends Component {
	static propTypes = {
		folder: PropTypes.object.isRequired,
	};

	render() {
		const {name, fromLang, toLang, createdAt} = this.props.folder;
		return (
			<div className="row">
				<div className="col-md-4">
					{ name }
				</div>
				<div className="col-md-4">
					{ fromLang } -> { toLang }
				</div>
				<div className="col-md-4">
					{ createdAt }
				</div>
			</div>
		);
	}
}
