import {expect} from 'chai';
import extractParams from '../extractParams';

describe('extractParams', () => {
	it('should extract params based on the route definition (1)', () => {
		const route = '/foo/:param1';
		const url = '/foo/haha';
		expect(extractParams(route, url)).to.deep.equal({
			param1: 'haha'
		});
	});

	it('should extract params based on the route definition (2)', () => {
		const route = 'foo/:param1';
		const url = '/foo/haha';
		expect(extractParams(route, url)).to.deep.equal({
			param1: 'haha'
		});
	});
});
