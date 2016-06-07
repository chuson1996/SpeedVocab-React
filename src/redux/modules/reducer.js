import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import sets from './sets';
import terms from './terms';
import definitions from './definitions';
import examples from './examples';
import images from './images';

// Form plugins
import newTermFormPlugin from './addNewTermForm';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	auth,
	form: form.plugin({
		newTerm: newTermFormPlugin
	}),
	multireducer: multireducer({
		counter1: counter,
		counter2: counter,
		counter3: counter
	}),
	info,
	widgets,
	sets,
	terms,
	definitions,
	examples,
	images,
});
