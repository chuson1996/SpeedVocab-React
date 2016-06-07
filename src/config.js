require('babel-polyfill');

const environment = {
	development: {
		isProduction: false
	},
	production: {
		isProduction: true
	}
}[process.env.NODE_ENV || 'development'];

const websiteUrl = (process.env.NODE_ENV === 'development') ?
	(process.env.HOST || 'localhost') + ':' + (process.env.PORT || 3000) :
	'http://chuson1996.herokuapp.com';

module.exports = Object.assign({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT,
	apiHost: process.env.APIHOST || 'localhost',
	apiPort: process.env.APIPORT,
	app: {
		title: 'SpeedVocab',
		description: 'All the modern best practices in one example.',
		head: {
			titleTemplate: 'React Redux Example: %s',
			meta: [
				{name: 'description', content: 'All the modern best practices in one example.'},
				{charset: 'utf-8'},
				{property: 'og:site_name', content: 'React Redux Example'},
				{property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
				{property: 'og:locale', content: 'en_US'},
				{property: 'og:title', content: 'React Redux Example'},
				{property: 'og:description', content: 'All the modern best practices in one example.'},
				{property: 'og:card', content: 'summary'},
				{property: 'og:site', content: '@erikras'},
				{property: 'og:creator', content: '@erikras'},
				{property: 'og:image:width', content: '200'},
				{property: 'og:image:height', content: '200'}
			]
		}
	},
	websiteUrl,
	auth: {
		facebook: {
			clientId: '446558085519275',
			clientSecret: 'bacc127ffc433bba8475459dd469334c'
		},
		quizlet: {
			clientId: 'U9zGqgKByB',
			clientSecret: 'gceUm37RfjkgeQw6nJuQKj',
			redirectUri: websiteUrl + '/loginQuizletSuccess'
		}
	},
	mongo: {
		endpoint: 'mongodb://admin:admin@ds011369.mlab.com:11369/speedvocab2'
		// endpoint: 'mongodb://localhost:27017/speedvocab2'
	}
}, environment);
