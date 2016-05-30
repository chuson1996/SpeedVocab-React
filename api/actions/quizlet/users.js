import request from 'request';
import jsonToHttpParams from '../../utils/jsonToHttpParams';

export default function users(req, [username, detail]) {
	return new Promise((resolve, reject) => {
		console.log(req.query);
		request.get(`https://api.quizlet.com/2.0/users/${username}${detail ? ('/' + detail) : ''}?${jsonToHttpParams(req.query)}`, {
			headers: {
				Authorization: req.headers.Authorization
			}
		}, (error, httpResponse, bodyString) => {
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
