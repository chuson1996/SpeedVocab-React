export default function extractParams(route, url) {
	const routeArr = route.split('?')[0].split('/').filter(seg => !!seg);
	const urlArr = url.split('?')[0].split('/').filter(seg => !!seg);

	let result = {};
	routeArr.forEach((seg, index) => {
		if (/^:.+/.test(seg)) {
			result = {
				...result,
				[seg.split(':')[1]]: urlArr[index]
			};
		}
	});

	return result;
}
