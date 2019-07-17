const colorWheelRotation = 30;

function colorCycleHandler(req) {
    // Verify all requests.
    const payload = verifyAndDecode(req.headers.authorization, bearerPrefix, secret);
    const { channel_id: channelId, opaque_user_id: opaqueUserId } = payload;
  
    // Store the color for the channel.
    let currentColor = channelColors[channelId] || initialColor;
  
    // Bot abuse prevention:  don't allow a user to spam the button.
    if (userIsInCooldown(opaqueUserId)) {
      throw Boom.tooManyRequests(STRINGS.cooldown);
    }
  
    // Rotate the color as if on a color wheel.
    verboseLog(STRINGS.cyclingColor, channelId, opaqueUserId);
    currentColor = color(currentColor).rotate(colorWheelRotation).hex();
  
    // Save the new color for the channel.
    channelColors[channelId] = currentColor;
  
    // Broadcast the color change to all other extension instances on this channel.
    attemptColorBroadcast(channelId);
  
    return currentColor;
  }
  
function colorQueryHandler(req) {
    // Verify all requests.
    const payload = verifyAndDecode(req.headers.authorization);

    // Get the color for the channel from the payload and return it.
    const { channel_id: channelId, opaque_user_id: opaqueUserId } = payload;
    const currentColor = color(channelColors[channelId] || initialColor).hex();
    verboseLog(STRINGS.sendColor, currentColor, opaqueUserId);
    return currentColor;
}

module.exports = {
    colorCycleHandler,
    colorQueryHandler
}