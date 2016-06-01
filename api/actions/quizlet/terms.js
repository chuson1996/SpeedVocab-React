import Term from '../../../models/Term';

export default function terms(req, [termId]) {
	if (req.method === 'PUT' || req.method === 'POST') {
		return new Promise((resolve, reject) => {
			const word = req.body;
			Term.find({ quizletId: termId}, (error, docs) => {
				if (error) {
					return reject({
						status: 500,
						message: error
					});
				}

				const mongoTerm = (docs.length === 0) ? new Term({
					quizletId: word.id,
					note: word.note
				}) : docs[0];

				mongoTerm.save((saveError) => {
					if (saveError) {
						return reject({
							status: 500,
							message: saveError
						});
					}

					return resolve(word);
				});
			});
		});
	}

	return Promise.reject({
		status: 404
	});
}
