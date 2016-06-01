const LOAD = 'redux-example/definitions/LOAD';
const LOAD_SUCCESS = 'redux-example/definitions/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/definitions/LOAD_FAIL';

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

export function getDefinitions(word) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/define/${word}`)
	};
}
