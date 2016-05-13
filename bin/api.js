#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
	if (!require('piping')({
		hook: true,
		ignore: /(\/\.|~$|\.json$)/i
	})) {
		return;
	}
}
console.log('Restarting api server!');
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
