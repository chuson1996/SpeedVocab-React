const LOAD = 'redux-example/examples/LOAD';
const LOAD_SUCCESS = 'redux-example/examples/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/examples/LOAD_FAIL';

const initialState = {
	data: {},
	loaded: false,
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.result,
				error: null
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				data: null,
				error: action.error
			};
		default:
			return state;
	}
}

export function getExamples(word) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/examples/${word}`)
	};
}
