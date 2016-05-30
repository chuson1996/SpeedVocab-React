import request from 'request';
import jsonToHttpParams from '../../utils/jsonToHttpParams';

export default function sets(req, [setId]) {
	return new Promise((resolve, reject) => {
		request.get(
			`https://api.quizlet.com/2.0/sets/${setId}?${jsonToHttpParams(req.query)}`,
			{
				headers: {
					Authorization: req.headers.Authorization
				}
			},
			(error, httpRes, bodyString) => {
				const body = JSON.parse(bodyString);
				if (body.http_code === 400) {
					return reject({
						status: 400,
						message: body
					});
				}

				return resolve(body);
		});
	});
}
