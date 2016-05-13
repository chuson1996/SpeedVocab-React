import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import passport from 'passport';
import FacebookPassport from 'passport-facebook';
const FacebookStrategy = FacebookPassport.Strategy;

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
	secret: 'react and redux rule!!!!',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

/** Passport: Start */
// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FacebookStrategy({
		clientID: config.auth.facebook.clientId,
		clientSecret: config.auth.facebook.clientSecret,
		callbackURL: `http://${config.host}:${config.port}/api/login/facebook/return`
	},
	(accessToken, refreshToken, profile, cb) => {
		// In this example, the user's Facebook profile is supplied as the user
		// record.  In a production-quality application, the Facebook profile should
		// be associated with a user record in the application's database, which
		// allows for account linking and authentication with other identity
		// providers.
		return cb(null, profile);
	}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook',
	passport.authenticate('facebook'));

app.get('/login/facebook/return',
	passport.authenticate('facebook', {
		successRedirect: `http://${config.host}:${config.port}/loginSuccess`,
		failureRedirect: '/login'
	}));
/** Password: End */

app.use((req, res, next) => {
	const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

	const {action, params} = mapUrl(actions, splittedUrlPath);

	if (action) {
		action(req, params)
			.then((result) => {
				if (result instanceof Function) {
					result(res, next);
				} else {
					res.json(result);
				}
			})
			.catch((reason) => {
				if (reason && reason.redirect) {
					res.redirect(reason.redirect);
				} else {
					console.error('API ERROR:', pretty.render(reason));
					res.status(reason.status || 500).json(reason);
				}
			});
	} else {
		res.status(404).end('NOT FOUND');
	}
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
	const runnable = app.listen(config.apiPort, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
		console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
	});

	io.on('connection', (socket) => {
		socket.emit('news', {msg: `'Hello World!' from server`});

		socket.on('history', () => {
			for (let index = 0; index < bufferSize; index++) {
				const msgNo = (messageIndex + index) % bufferSize;
				const msg = messageBuffer[msgNo];
				if (msg) {
					socket.emit('msg', msg);
				}
			}
		});

		socket.on('msg', (data) => {
			data.id = messageIndex;
			messageBuffer[messageIndex % bufferSize] = data;
			messageIndex++;
			io.emit('msg', data);
		});
	});
	io.listen(runnable);
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
