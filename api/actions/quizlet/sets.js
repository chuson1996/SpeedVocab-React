import jsonToHttpParams from '../../utils/jsonToHttpParams';
import rp from 'request-promise';

export default function sets(req, params) {
	const _params = !!params.length ? `/${params.join('/')}` : '';
	const uri = `https://api.quizlet.com/2.0/sets${_params}?${jsonToHttpParams(req.query)}`;
	const options = {
		method: req.method,
		uri,
		json: true,
		headers: {
			Authorization: req.headers.authorization
		}
	};

	if (req.method === 'POST') {
		options.form = req.body;
	}

	return rp(options);
}
