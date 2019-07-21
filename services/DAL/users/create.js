const firebase = require("firebase");
const crypto = require("crypto");

function create(firebase, payload) {
  const {
    name,
    email,
    imageUrl
  } = payload;

  const uuid = crypto.randomBytes(20).toString("hex");
  return firebase
    .database()
    .ref(`users/${uuid}`)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
}

module.exports = create;
