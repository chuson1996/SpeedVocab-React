import React, {Component, PropTypes} from 'react';
import {reduxForm, change, destroy} from 'redux-form';
import * as getDefinitionActions from 'redux/modules/definitions';
import * as getExampleActions from 'redux/modules/examples';
import * as queryImageActions from 'redux/modules/images';
import * as addNewTermFormActions from 'redux/modules/addNewTermForm';
import {save} from 'redux/modules/terms';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Panel from 'react-bootstrap/lib/Panel';
import {DefAndExCard, ImageSelect} from 'components';
import get from 'lodash/get';

@reduxForm({
	form: 'newTerm',
	fields: ['term', 'definition', 'example', 'imageKey', 'selectedImage']
})
@connect(
	(state) => ({
		definitions: state.definitions.data,
		definitionsLoading: state.definitions.loading,
		examples: state.examples.data,
		examplesLoading: state.examples.loading,
		images: state.images.data,
		imagesLoading: state.images.loading,
		rTerm: state.form.newTerm.term,
		rDefinition: state.form.newTerm.definition,
		rExample: state.form.newTerm.example,
		rImageKey: state.form.newTerm.imageKey,
		rSelectedImage: state.form.newTerm.selectedImage,
		accessToken: state.auth.user.access_token
	}),
	dispatch => bindActionCreators({
		...getDefinitionActions,
		...addNewTermFormActions,
		...getExampleActions,
		...queryImageActions,
		changeSelectedImage: (imageUrl) => {
			return change('newTerm', 'selectedImage', imageUrl);
		},
		destroyForm: () => {
			return destroy('newTerm');
		},
		save
	}, dispatch)
)
export default class AddNewTermForm extends Component {
	static propTypes = {
		// From Redux Form
		fields: PropTypes.object.isRequired,
		values: PropTypes.object.isRequired,
		// From @connect
		//   State 2 Props
		definitions: PropTypes.object,
		definitionsLoading: PropTypes.bool,
		examples: PropTypes.object,
		examplesLoading: PropTypes.bool,
		images: PropTypes.array,
		imagesLoading: PropTypes.bool,
		rTerm: PropTypes.object,
		rDefinition: PropTypes.object,
		rExample: PropTypes.object,
		rImageKey: PropTypes.object,
		rSelectedImage: PropTypes.object,
		accessToken: PropTypes.string.isRequired,
		//   Action 2 Props
		getDefinitions: PropTypes.func.isRequired,
		getExamples: PropTypes.func.isRequired,
		getImages: PropTypes.func.isRequired,
		lock: PropTypes.func.isRequired,
		unlock: PropTypes.func.isRequired,
		save: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired,
		changeSelectedImage: PropTypes.func.isRequired,
		destroyForm: PropTypes.func.isRequired,
		// From Attributes
		setId: PropTypes.number.isRequired
	};

	componentDidUpdate(prevProps) {
		const prTerm = prevProps.rTerm;
		const prDefinition = prevProps.rDefinition;
		const prExample = prevProps.rExample;
		const prImageKey = prevProps.rImageKey;
		const {
			rTerm, rDefinition, rExample, rImageKey, rSelectedImage,
			getDefinitions, getExamples, getImages,
		} = this.props;

		if (get(prTerm, 'locked') && !get(rTerm, 'locked')) {
			this._termInput.focus();
		} else if (get(prDefinition, 'locked') && !get(rDefinition, 'locked')) {
			this._definitionInput.focus();
		} else if (get(prExample, 'locked') && !get(rExample, 'locked')) {
			this._exampleInput.focus();
		}

		if (!get(prTerm, 'locked') && get(rTerm, 'locked')) {
			this._definitionInput.focus();
			// Get definitions and examples
			getDefinitions(rTerm.value);
			getExamples(rTerm.value);
		} else if (!get(prDefinition, 'locked') && get(rDefinition, 'locked')) {
			this._exampleInput.focus();
		}

		if (!get(prImageKey, 'locked') && get(rImageKey, 'locked')) {
			getImages(rImageKey.value);
		} else if (!get(prExample, 'locked') && get(rExample, 'locked')) {
			this._imageKeyInput.focus();
		}

		if (get(rTerm, 'locked')
		 && get(rDefinition, 'locked')
		 && get(rExample, 'locked')
		 && get(rImageKey, 'locked')
		 && get(rSelectedImage, 'locked')) {
			this._submitButton.focus();
		}
	}

	onKeyDown = (event, field) => {
		const { lock, values, unlock } = this.props;
		if (event.key === 'Enter' || event.key === 'Tab') {
			event.preventDefault();
			lock(field);
		} else if (event.key === 'Backspace' && !values[field]) {
			if (field === 'example') {
				event.preventDefault();
				unlock('definition');
			} else if (field === 'definition') {
				event.preventDefault();
				unlock('term');
			}
		}
	};

	onDoubleClick = (input, field) => {
		const { unlock } = this.props;
		if (field === 'term') {
			unlock('term');
			unlock('definition');
			unlock('example');
		} else if (field === 'definition') {
			unlock('definition');
			unlock('example');
		} else if (field === 'example') {
			unlock('example');
		} else if (field === 'imageKey') {
			unlock('imageKey');
		}
	}

	selectDefinition = (answer) => {
		const { definitions: {definitions} } = this.props;
		if (/[a-zA-Z]/i.test(answer)) {
			return answer;
		}

		const selectedNumber = parseInt(answer, 10);
		if (selectedNumber > 0 && selectedNumber <= definitions.length) {
			return definitions[selectedNumber - 1].definition;
		}

		return answer;
	};

	selectExample = (answer) => {
		const { examples: {examples} } = this.props;
		if (/[a-zA-Z]/i.test(answer)) {
			return answer;
		}

		const selectedNumber = parseInt(answer, 10);
		if (selectedNumber > 0 && selectedNumber <= examples.length) {
			return examples[selectedNumber - 1];
		}

		return answer;
	};

	addTermToQuizletSet = (term) => {
		const {setId, save: saveTerm, accessToken, destroyForm} = this.props;
		saveTerm(term, setId, accessToken).then(() => {
			destroyForm();
		});
	};

	render() {
		const {
			fields: {term, definition, example, imageKey},
			values,
			rTerm, rDefinition, rExample, rImageKey,
			definitions, examples, images,
			definitionsLoading, examplesLoading, imagesLoading,
			changeSelectedImage,
			lock, unlock,
		} = this.props;

		const header = (<h2 style={{textAlign: 'center'}}>Add a new term</h2>);

		return (
			<Row>
				<Col md={6}>
					<Panel header={header} bsStyle="success">
						{ !get(rTerm, 'locked')
						 && <input
							className="form-control"
							type="text"
							placeholder="Term"
							onKeyDown={(e) => this.onKeyDown(e, 'term')}
							ref={(elem) => this._termInput = elem}
							{...{...term, value: term.value || ''}} /> }

						{ get(rTerm, 'locked')
						 && <h1 onDoubleClick={() => this.onDoubleClick(this._termInput, 'term')}>
						 		{values.term}
						 	</h1> }

						{ get(rTerm, 'locked') && !get(rDefinition, 'locked')
						 && <input
							className="form-control"
							type="text"
							placeholder="Definition"
							onKeyDown={(e) => this.onKeyDown(e, 'definition')}
							ref={(elem) => this._definitionInput = elem}
							{...{...definition, value: definition.value || ''}} /> }

						{ get(rTerm, 'locked') && get(rDefinition, 'locked')
						 && <h2 onDoubleClick={() => this.onDoubleClick(this._definitionInput, 'definition')}>
						 		{this.selectDefinition(values.definition)}
						 	</h2> }

						{ get(rDefinition, 'locked') && !get(rExample, 'locked')
						 && <input
							className="form-control"
							type="text"
							placeholder="Example"
							onKeyDown={(e) => this.onKeyDown(e, 'example')}
							ref={(elem) => this._exampleInput = elem}
							{...{...example, value: example.value || ''}} /> }

						{ get(rDefinition, 'locked') && get(rExample, 'locked')
						 && <p onDoubleClick={() => this.onDoubleClick(this._exampleInput, 'example')}>
						 		{ this.selectExample(values.example)}
						 	</p> }

						{ !get(rImageKey, 'locked')
						 && get(rExample, 'locked')
						 && <input
							type="text"
							placeholder="Image key"
							className="form-control"
							ref={(elem) => this._imageKeyInput = elem}
							onKeyDown={(e) => this.onKeyDown(e, 'imageKey')}
							name="imageKey"
							{...{...imageKey, value: imageKey.value || ''}} /> }

						{ get(rImageKey, 'locked')
						 && <code onDoubleClick={() => this.onDoubleClick(this._exampleInput, 'imageKey')}>Image key: {values.imageKey}</code> }

						{ get(rImageKey, 'locked')
						 && get(rExample, 'locked')
						 && !!images.length
						 && !imagesLoading
						 && !values.selectedImage
						 && <ImageSelect
						 	images={images}
						 	onImageSelected={(image) => {
						 		changeSelectedImage(image);
						 		lock('selectedImage');
						 	}} />}

						{ get(rImageKey, 'locked') && values.selectedImage
						 && get(rExample, 'locked')
						 && <Image
						 	src={values.selectedImage}
						 	onClick={() => {
						 		changeSelectedImage(null);
						 		unlock('selectedImage');
						 	}} />
						}

						{ get(rTerm, 'locked')
						 && get(rDefinition, 'locked')
						 && get(rExample, 'locked')
						 && <div>
						 	<button
						 		className="btn btn-success"
						 		ref={(elem) => this._submitButton = elem}
						 		onClick={() => this.addTermToQuizletSet({
						 			term: values.term,
						 			definition: `${this.selectDefinition(values.definition)} (${this.selectExample(values.example)})`,
						 			selectedImage: values.selectedImage
						 		})}>Add to Quizlet</button>
						 	Or Press Enter!
					 	</div> }
					</Panel>
				</Col>
				<Col md={6}>
					{ get(rTerm, 'locked')
					 && <DefAndExCard
						definitions={definitions.definitions}
						definitionsLoading={definitionsLoading}
						examples={examples.examples}
						examplesLoading={examplesLoading}/> }
				</Col>
			</Row>
		);
	}
}
