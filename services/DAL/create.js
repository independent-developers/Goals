const crypto = require("crypto");

/**
 * Create entry in database
 * @param {string} resource 
 * @param {Object} firebase 
 * @param {Object} payload 
 */
function create(resource, firebase, payload) {
  if(payload && payload.streamerId) {
    console.log('StreamerId not found !')
  }
  const uuid = payload.streamerId || crypto.randomBytes(20).toString("hex");
  firebase
    .database()
    .ref(`${resource}/${uuid}`)
    .set(payload, (error) => {
      if(error) {
        console.log('An error occurred while creating data', error)
      }
      console.log(`Data successfully registered for resource ${resource} !`)
    });
  return {
    uuid,
    payload
  }
}

module.exports = create;
