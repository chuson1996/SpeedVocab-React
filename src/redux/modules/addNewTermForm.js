const LOCK = 'redux-example/addNewTermForm/LOCK';
const UNLOCK = 'redux-example/addNewTermForm/UNLOCK';
const CLEAR = 'redux-example/addNewTermForm/CLEAR';

export default function reducer(state, action) {
	switch (action.type) {
		case LOCK:
			return {
				...state,
				[action.field]: {
					...state[action.field],
					locked: true
				}
			};
		case UNLOCK:
			return {
				...state,
				[action.field]: {
					...state[action.field],
					locked: false
				}
			};
		case CLEAR:
			return {
				...state,
				[action.field]: {}
			};
		default:
			return state;
	}
}

export function lock(field) {
	return {
		type: LOCK,
		field
	};
}

export function unlock(field) {
	return {
		type: UNLOCK,
		field
	};
}

export function clear(field) {
	return {
		type: CLEAR,
		field
	};
}
