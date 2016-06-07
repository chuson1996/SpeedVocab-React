import rp from 'request-promise';
import apiConfig from '../config';

export default function images(req) {
	const options = {
		uri: `https://bingapis.azure-api.net/api/v5/images/search?q=${encodeURI(req.query.q)}&mkt=en-us`,
		method: 'GET',
		headers: apiConfig.BingHeaders,
		json: true
	};

	return rp(options).then((data) => data.value.map((image) => image.thumbnailUrl));
}
