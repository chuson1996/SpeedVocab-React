const LOAD = 'redux-example/terms/LOAD';
const LOAD_SUCCESS = 'redux-example/terms/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/terms/LOAD_FAIL';

const initialState = {
	loaded: false
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

export function isLoaded(globalState) {
	return globalState.terms && globalState.terms.loaded;
}

export function load(setId, accessToken) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/quizlet/sets/${setId}/terms?access_token=${accessToken}&whitespace=1`)
	};
}
