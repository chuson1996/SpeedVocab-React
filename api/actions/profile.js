export default function profile(req) {
	if (req.session.passport && req.session.passport.user) {
		return Promise.resolve(req.session.passport.user);
	}

	return Promise.reject({
		status: 403
	});
}
