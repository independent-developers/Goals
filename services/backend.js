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
const color = require('color')

// Libraries
const apiRoutes = require('./routes/index')

// The developer rig uses self-signed certificates.  Node doesn't accept them
// by default.  Do not use this in production.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Use verbose logging during development.  Set this to false for production.
const verboseLogging = true
const verboseLog = verboseLogging ? console.log.bind(console) : () => {}

const PORT = 3000

const serverOptions = {
  host: 'localhost',
  port: PORT,
  routes: {
    cors: {
      origin: ['*']
    }
  }
}

// Service state variables
const initialColor = color('#6441A4') // super important; bleedPurple, etc.
const userCooldownMs = 1000 // maximum input rate per user to prevent bot abuse
const userCooldownClearIntervalMs = 60000 // interval to reset our tracking object
const channelCooldownMs = 1000 // maximum broadcast rate per channel
const bearerPrefix = 'Bearer ' // HTTP authorization headers have this prefix
const channelColors = {}
const channelCooldowns = {} // rate limit compliance
let userCooldowns = {} // spam prevention

const STRINGS = {
  secretEnv: usingValue('secret'),
  clientIdEnv: usingValue('client-id'),
  ownerIdEnv: usingValue('owner-id'),
  serverStarted: 'Server running at %s',
  secretMissing: missingValue('secret', 'EXT_SECRET'),
  clientIdMissing: missingValue('client ID', 'EXT_CLIENT_ID'),
  ownerIdMissing: missingValue('owner ID', 'EXT_OWNER_ID'),
  messageSendError: 'Error sending message to channel %s: %s',
  pubsubResponse: 'Message to c:%s returned %s',
  cyclingColor: 'Cycling color for c:%s on behalf of u:%s',
  colorBroadcast: 'Broadcasting color %s for c:%s',
  sendColor: 'Sending color %s to c:%s',
  cooldown: 'Please wait before clicking again',
  invalidAuthHeader: 'Invalid authorization header',
  invalidJwt: 'Invalid JWT'
}

ext
  .version(require('../package.json').version)
  .option('-s, --secret <secret>', 'Extension secret')
  .option('-c, --client-id <client_id>', 'Extension client ID')
  .option('-o, --owner-id <owner_id>', 'Extension owner ID')
  .parse(process.argv)

const serverPathRoot = path.resolve(__dirname, '..', 'conf', 'server')
if (
  fs.existsSync(serverPathRoot + '.crt') &&
  fs.existsSync(serverPathRoot + '.key')
) {
  serverOptions.tls = {
    // If you need a certificate, execute "npm run cert".
    cert: fs.readFileSync(serverPathRoot + '.crt'),
    key: fs.readFileSync(serverPathRoot + '.key')
  }
}
console.log('Creating server..')
const server = new Hapi.Server(serverOptions)

;(async () => {
  console.log('--------')
  apiRoutes.forEach(route => {
    console.log(`${route.method} http://localhost:${route.path}`)
    server.route(route)
  })
  console.log('--------')

  // Start the sercolorCycleHandlerver.
  await server.start()
  console.log(STRINGS.serverStarted, server.info.uri)

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
