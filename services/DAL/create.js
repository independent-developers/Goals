const crypto = require("crypto");

const DAL = require("./index");

/**
 * Create entry in database
 * @param {string} resource 
 * @param {Object} firebase 
 * @param {Object} payload 
 */
function create(payload, userId) {
  const uuid = payload.userId || crypto.randomBytes(20).toString("hex");
  DAL.firebase
    .database()
    .ref(`users/${uuid}`)
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
