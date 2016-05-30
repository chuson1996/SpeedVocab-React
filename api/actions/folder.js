import Folder from '../../models/Folder';
export default function folder(req) {
	if (!req.session.passport || !req.session.passport.user) {
		return Promise.reject({
			status: 403,
			message: 'Unauthorized.'
		});
	}

	const { provider, id } = req.session.passport.user;
	const userId = `${id}@${provider}`;

	switch (req.method) {
		case 'GET':
			console.log('GET folders...');
			return new Promise((resolve, reject) => {
				Folder.find({ userId }).then((folders, err) => {
					console.log(folders);
					if (err) return reject(err);
					return resolve(folders);
				});
			});
		case 'POST':
			return new Promise((resolve, reject) => {
				const { fromLang, toLang, name } = req.body;
				new Folder({
					userId,
					name,
					fromLang,
					toLang,
				}).save((err, doc) => {
					if (err) return reject(err);
					return resolve(doc);
				});
			});
		default:
			return Promise.reject({ status: 404 });
	}
}
