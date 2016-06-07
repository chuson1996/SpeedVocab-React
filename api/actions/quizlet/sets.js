import jsonToHttpParams from '../../utils/jsonToHttpParams';
import rp from 'request-promise';
import last from 'lodash/last';
import findIndex from 'lodash/findIndex';
import Term from '../../../models/Term';
import update from 'react-addons-update';

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
		const {term, definition} = req.body;
		options.form = {
			term, definition
		};
	}

	return rp(options).then((data) => {
		if (req.method === 'POST' && last(params) === 'terms') {
			return new Promise((resolve, reject) => {
				new Term({
					setId: params[0],
					quizletTermId: data.id,
					imageSrc: req.body.selectedImage
				}).save((err) => {
					if (err) return reject(err);

					resolve({
						...data,
						image: data.image || {
							url: req.body.selectedImage
						}
					});
				});
			});
		}

		if (req.method === 'GET' && params.length === 1) {
			return new Promise((resolve) => {
				Term.find({ setId: params[0] }).exec().then((docs) => {
					if (!docs.length) return resolve(data);

					let newTerms = data.terms;
					docs.forEach((doc) => {
						const i = findIndex(newTerms, { id: parseInt(doc.quizletTermId, 10) });
						if (i !== -1) {
							newTerms = update(newTerms, {
								[i]: {
									image: {
										$set: {url: doc.imageSrc} || newTerms[i].image
									}
								}
							});
						}
					});

					return resolve({
						...data,
						terms: newTerms
					});
				});
			});
		}

		return data;
	});
}
