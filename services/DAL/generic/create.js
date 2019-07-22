const crypto = require("crypto");

/**
 * Create entry in database
 * @param {string} resource 
 * @param {Object} firebase 
 * @param {Object} payload 
 */
function create(resource, firebase, payload) {

  const uuid = crypto.randomBytes(20).toString("hex");
  return firebase
    .database()
    .ref(`${resource}/${uuid}`)
    .set(payload, (error) => {
      if(error) {
        console.log('An error occurred while creating data', error)
      }
      console.log(`Data successfully registered for resource ${resource} !`)
    });
}

module.exports = create;
