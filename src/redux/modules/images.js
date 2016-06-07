const LOAD = 'redux-example/images/LOAD';
const LOAD_SUCCESS = 'redux-example/images/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/images/LOAD_FAIL';

const initialState = {
	data: [],
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

export function getImages(query) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/images?q=${query}`)
	};
}
