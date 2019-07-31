/**
 *    Copyright 2018 Amazon.com, Inc. or its affiliates
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
'use strict'

require('dotenv').config()
const fs = require('fs')
const ext = require('commander')
const path = require('path')
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert');

// Libraries
const apiRoutes = require('./routes/index')

// The developer rig uses self-signed certificates.  Node doesn't accept them
// by default.  Do not use this in production.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Use verbose logging during development.  Set this to false for production.
const verboseLogging = true
const verboseLog = verboseLogging ? console.log.bind(console) : () => {}

const PORT = process.env.PORT || 3000

console.log(':: PATH TO PUBLIC', (path.join(__dirname, 'public')));

const serverOptions = {
	host: 'localhost',
	port: PORT,
	routes: {
		cors: {
			origin: ['*'],
		}
	},
}


const userCooldownClearIntervalMs = 60000 // interval to reset our tracking object
let userCooldowns = {} // spam prevention


const serverPathRoot = path.resolve(__dirname, '..', 'conf', 'server')
if (
	fs.existsSync(serverPathRoot + '.crt') &&
	fs.existsSync(serverPathRoot + '.key')
) {
	serverOptions.tls = {
		// If you need a certificate, execute "npm run cert".
		cert: fs.readFileSync(serverPathRoot + '.crt'),
		key: fs.readFileSync(serverPathRoot + '.key'),
	}
}

console.log('Creating server..')


// SOCKET IO
// var server = require("http").createServer(hapiHttpServer);
// const io = require('socket.io')(server);

// io.on('connection', function(socket){
// 	console.log('a user connected', socket);
	
// 	firebase
// 		.database()
// 		.ref(`app/1234`)
// 		.on("value", function(snapshot) {
//         var snap = snapshot.val();
//         console.log(snap)

//         // Print the data object's values
//         console.log("snapshot R: " + snap.title);
//         console.log("snapshot B: " + snap.isChecked);
//         io.emit('TAGGLE', snap);
//     });
// });



;(async () => {
	const hapiHttpServer = new Hapi.Server(serverOptions)
	await hapiHttpServer.register(Inert);
	console.log('--------')
	apiRoutes.forEach(route => {
		console.log(`${route.method} http://localhost:${PORT}${route.path}`)
		hapiHttpServer.route(route)
	})
	console.log('--------')

	// Start the sercolorCycleHandlerver.
	await hapiHttpServer.start()
	console.log(`Server has started on %s !`, hapiHttpServer.info.uri)

	// Periodically clear cool-down tracking to prevent unbounded growth due to
	// per-session logged-out user tokens.
	setInterval(() => {
		userCooldowns = {}
	}, userCooldownClearIntervalMs)
})()



function usingValue(name) {
	return `Using environment variable for ${name}`
}

function missingValue(name, variable) {
	const option = name.charAt(0)
	return `Extension ${name} required.\nUse argument "-${option} <${name}>" or environment variable "${variable}".`
}

process.on('unhandledRejection', err => {
	console.log(err)
	process.exit(1)
})
