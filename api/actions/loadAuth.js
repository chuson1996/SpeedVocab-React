export default function loadAuth(req) {
	if (req.session.passport && req.session.passport.user) {
		return Promise.resolve({
			name: req.session.passport.user.displayName
		});
	}
	return Promise.resolve(req.session.user || null);
}
