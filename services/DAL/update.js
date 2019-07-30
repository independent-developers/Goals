/**
 * Update a goal in database
 * @param {Object} firebase Object for firebase
 * @param {String} userId The user identifier
 * @param {String} goalId The goal identifier
 * @param {Object} payload The goal data to update
 * @returns {Object} The goals data updated
 */
async function goal(firebase, userId, goalId, payload) {
  var updates = {}

  updates[`/app/${userId}/${goalId}/title`] = payload.title;
  updates[`/app/${userId}/${goalId}/isChecked`] = payload.isChecked;
  
  firebase
    .database()
    .ref()
    .update(updates)
  return payload;
}

module.exports = { goal }
