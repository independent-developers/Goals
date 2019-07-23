
function update(resource, firebase, payload, userId) {
  var updates = {};
  
  updates[`/${resource}/${userId}`] = payload;

  return firebase
    .database()
    .ref()
    .update(updates);
}

module.exports = update;
