const uid = "b88a9ed059cd99fe35010be53a9dc328bf6f27be";

function update(resource, firebase, payload) {
  // A post entry.
  var postData = payload;

  // Get a key for a new Post.
//   var newPostKey = firebase
//     .database()
//     .ref()
//     .child("users")
//     .push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates[`/${resource}/${uid}`] = postData;
//   updates["/user-posts/" + uid + "/" + newPostKey] = postData;

  return firebase
    .database()
    .ref()
    .update(updates);
}

module.exports = update;
