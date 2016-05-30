/** This require the window.fetch polyfill */
export default function universalFetch(url, config) {
	if (__SERVER__) {
		return require('request-promise')({
			uri: url,
			...config
		});
	}

	return window.fetch(url, config);
}
