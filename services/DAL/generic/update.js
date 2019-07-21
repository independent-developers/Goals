const uid = "b88a9ed059cd99fe35010be53a9dc328bf6f27be";

function update(resource, firebase, payload) {
 
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates[`/${resource}/${uid}`] = payload;

  return firebase
    .database()
    .ref()
    .update(updates);
}

module.exports = update;
