import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as getDefinitionActions from 'redux/modules/definitions';
import * as getExampleActions from 'redux/modules/examples';
import * as addNewTermFormActions from 'redux/modules/addNewTermForm';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {DefAndExCard} from 'components';

@reduxForm({
	form: 'newTerm',
	fields: ['term', 'definition', 'example']
})
@connect(
	(state) => ({
		definitions: state.definitions.data,
		definitionsLoading: state.definitions.loading,
		examples: state.examples.data,
		examplesLoading: state.examples.loading,
		rTerm: state.form.newTerm.term,
		rDefinition: state.form.newTerm.definition,
		rExample: state.form.newTerm.example
	}),
	dispatch => bindActionCreators({
		...getDefinitionActions,
		...addNewTermFormActions,
		...getExampleActions,
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
		rTerm: PropTypes.object,
		rDefinition: PropTypes.object,
		rExample: PropTypes.object,
		//   Action 2 Props
		getDefinitions: PropTypes.func.isRequired,
		getExamples: PropTypes.func.isRequired,
		lock: PropTypes.func.isRequired,
		unlock: PropTypes.func.isRequired,
	};

	componentDidUpdate(prevProps) {
		const prTerm = prevProps.rTerm;
		const prDefinition = prevProps.rDefinition;
		const prExample = prevProps.rExample;
		const {
			rTerm, rDefinition, rExample,
			getDefinitions, getExamples,
		} = this.props;

		if (prTerm && prTerm.locked && !rTerm.locked) {
			$(this._termInput).focus();
		} else if (prDefinition && prDefinition.locked && !rDefinition.locked) {
			$(this._definitionInput).focus();
		} else if (prExample && prExample.locked && !rExample.locked) {
			$(this._exampleInput).focus();
		}

		if ((!prTerm || !prTerm.locked) && (rTerm && rTerm.locked)) {
			$(this._definitionInput).focus();
			// Get definitions and examples
			getDefinitions(rTerm.value);
			getExamples(rTerm.value);
		} else if ((!prDefinition || !prDefinition.locked) && (rDefinition && rDefinition.locked)) {
			$(this._exampleInput).focus();
		}
	}

	onKeyDown = (event, field) => {
		const { lock } = this.props;
		if (event.key === 'Enter' || event.key === 'Tab') {
			event.preventDefault();
			lock(field);
			if (field === 'term') {
				$(this._definitionInput).focus();
			} else if (field === 'definition') {
				$(this._exampleInput).focus();
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
		}
	}

	render() {
		const {
			fields: {term, definition, example},
			values,
			rTerm, rDefinition, rExample,
			definitions, examples,
			definitionsLoading, examplesLoading,
		} = this.props;

		return (
			<Row>
				<Col md={6}>
					{ !(rTerm && rTerm.locked)
					 && <input
						className="form-control"
						type="text"
						placeholder="Term"
						onKeyDown={(e) => this.onKeyDown(e, 'term')}
						disabled={(rTerm && rTerm.locked) ? 'disabled' : false}
						ref={(elem) => this._termInput = elem}
						{...term} /> }

					{ rTerm && rTerm.locked
						 && <h1 onDoubleClick={() => this.onDoubleClick(this._termInput, 'term')}>
						 		{values.term}
						 	</h1> }

					{ rTerm && rTerm.locked && !(rDefinition && rDefinition.locked)
					 && <input
						className="form-control"
						type="text"
						placeholder="Definition"
						onKeyDown={(e) => this.onKeyDown(e, 'definition')}
						disabled={(rDefinition && rDefinition.locked) ? 'disabled' : false}
						ref={(elem) => this._definitionInput = elem}
						{...definition} /> }

					{ rTerm && rTerm.locked && rDefinition && rDefinition.locked
						 && <h2 onDoubleClick={() => this.onDoubleClick(this._definitionInput, 'definition')}>
						 		{values.definition}
						 	</h2> }

					{ rDefinition && rDefinition.locked && !(rExample && rExample.locked)
					 && <input
						className="form-control"
						type="text"
						placeholder="Example"
						onKeyDown={(e) => this.onKeyDown(e, 'example')}
						disabled={(rExample && rExample.locked) ? 'disabled' : false}
						ref={(elem) => this._exampleInput = elem}
						{...example} /> }

					{ rDefinition && rDefinition.locked && rExample && rExample.locked
						 && <p onDoubleClick={() => this.onDoubleClick(this._exampleInput, 'example')}>
						 		{values.example}
						 	</p> }

					{ rTerm && rTerm.locked && rDefinition && rDefinition.locked && rExample && rExample.locked
					 && <Button bsStyle="success">Add to Quizlet</Button> }
				</Col>
				<Col md={6}>
					{ rTerm && rTerm.locked && <DefAndExCard
						definitions={definitions.definitions}
						definitionsLoading={definitionsLoading}
						examples={examples.examples}
						examplesLoading={examplesLoading}/> }
				</Col>
			</Row>
		);
	}
}
