import rp from 'request-promise';
import jsonToHttpParams from '../../utils/jsonToHttpParams';

export default function users(req, params) {
	const _params = (params.length !== 0) ? `/${params.join('/')}` : '';
	const uri = `https://api.quizlet.com/2.0/users${_params}?${jsonToHttpParams(req.query)}`;
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
