import update from 'react-addons-update';

const LOAD = 'redux-example/terms/LOAD';
const LOAD_SUCCESS = 'redux-example/terms/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/terms/LOAD_FAIL';
const EDIT_START = 'redux-example/folders/EDIT_START';
const EDIT_STOP = 'redux-example/folders/EDIT_STOP';
const SAVE = 'redux-example/folders/SAVE';
const SAVE_SUCCESS = 'redux-example/folders/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/folders/SAVE_FAIL';


const initialState = {
	loaded: false,
	editing: {
		editing: false,
		word: {}
	}, // You can only edit one term at a time
	saveError: false
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
		case EDIT_START:
			return {
				...state,
				editing: {
					editing: true,
					word: action.word
				}
			};
		case EDIT_STOP:
			return {
				...state,
				editing: {
					editing: false,
					word: {}
				}
			};
		case SAVE:
			return state; // 'saving' flag handled by redux-form
		case SAVE_SUCCESS:
			const data = update(state.data, {
				terms: {
					$push: [action.result]
				}
			});

			return {
				...state,
				data: data,
				editing: {
					editing: false,
					word: {}
				},
				saveError: false
			};
		case SAVE_FAIL:
			return typeof action.error === 'string' ? {
				...state,
				saveError: true
			} : state;
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
		promise: (client) => client.get(`/quizlet/sets/${setId}?whitespace=1`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	};
}

export function editStart(word) {
	return { type: EDIT_START, word };
}

export function editStop() {
	return { type: EDIT_STOP };
}

export function save(word, setId, accessToken) {
	return {
		types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
		promise: (client) => client.post(`/quizlet/sets/${setId}/terms`, {
			data: word,
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	};
}
