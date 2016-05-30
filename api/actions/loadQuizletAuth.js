import request from 'request';

export default function loadQuizletAuth(req) {
	console.log('LOAD QUIZLET AUTH');
	return new Promise((resolve, reject) => {
		request.post({
			url: 'https://api.quizlet.com/oauth/token',
			form: {
				grant_type: 'authorization_code',
				code: req.body.code
			},
			headers: {
				Authorization: 'Basic VTl6R3FnS0J5QjpnY2VVbTM3UmZqa2dlUXc2bkp1UUtq',
			}
		}, (err, res, bodyString) => {
			if (err) {
				return reject({
					status: 400,
					message: JSON.parse(err)
				});
			}
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
