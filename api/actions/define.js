import rp from 'request-promise';
import apiConfig from '../config';

export default function define(req, [word]) {
	const options = {
		uri: `https://wordsapiv1.p.mashape.com/words/${word}/definitions`,
		method: 'GET',
		headers: apiConfig.MashapeHeaders,
		json: true
	};
	return rp(options);
}
