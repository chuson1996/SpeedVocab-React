const LOAD = 'redux-example/sets/LOAD';
const LOAD_SUCCESS = 'redux-example/sets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/sets/LOAD_FAIL';

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
	return globalState.sets && globalState.sets.loaded;
}

export function load(userId, accessToken) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/quizlet/users/${userId}/sets?access_token=${accessToken}&whitespace=1`)
	};
}
