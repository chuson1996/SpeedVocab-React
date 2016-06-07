/** This file does NOT contain a reducer. Kinda an exception. :( */
const REDUX_FORM_CHANGE = 'redux-form/CHANGE';

export function changeSelectedImage(imageUrl) {
	return {
		type: REDUX_FORM_CHANGE,
		field: 'selectedImage',
		value: imageUrl,
		touch: true,
		form: 'newTerm'
	};
}
