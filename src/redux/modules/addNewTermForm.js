const LOCK = 'redux-example/addNewTermForm/LOCK';
const UNLOCK = 'redux-example/addNewTermForm/UNLOCK';

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
