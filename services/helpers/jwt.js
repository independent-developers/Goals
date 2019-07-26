const Boom = require('boom');
const jsonwebtoken = require('jsonwebtoken');

const serverTokenDurationSec = 30;          // our tokens for pubsub expire after 30 seconds

// Create and return a JWT for use by this service.
function makeServerToken(channelId, ownerId, secret) {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + serverTokenDurationSec,
      channel_id: channelId,
      user_id: ownerId, // extension owner ID for the call to Twitch PubSub
      role: 'external',
      pubsub_perms: {
        send: ['*'],
      },
    };
    return jsonwebtoken.sign(payload, secret, { algorithm: 'HS256' });
  }

  // Verify the header and the enclosed JWT.
function verifyAndDecode(header, bearerPrefix, secret) {
    if (header.startsWith(bearerPrefix)) {
      try {
        const token = header.substring(bearerPrefix.length);
        return jsonwebtoken.verify(token, secret, { algorithms: ['HS256'] });
      }
      catch (ex) {
        throw Boom.unauthorized(STRINGS.invalidJwt);
      }
    }
    throw Boom.unauthorized(STRINGS.invalidAuthHeader);
}

module.exports = {
    makeServerToken,
    verifyAndDecode
}