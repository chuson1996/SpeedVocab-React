export default function jsonToHttpParams(jsonObject) {
	const result = [];
	Object.keys(jsonObject).forEach((key) => {
		result.push(`${key}=${jsonObject[key]}`);
	});
	return result.join('&');
}
