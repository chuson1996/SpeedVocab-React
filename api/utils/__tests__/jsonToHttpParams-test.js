import {expect} from 'chai';
import jsonToHttpParams from '../jsonToHttpParams';

describe('jsonToHttpParams', () => {
	it('should convert json object to http parameters', () => {
		expect(jsonToHttpParams({
			abc: '123',
			def: 'blah'
		})).to.equal('abc=123&def=blah');
	});
});
