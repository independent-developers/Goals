
function update(resource, firebase, payload, uuid) {
  var updates = {};
  
  updates[`/${resource}/${uuid}`] = payload;

  return firebase
    .database()
    .ref()
    .update(updates);
}

module.exports = update;
