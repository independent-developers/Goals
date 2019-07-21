const firebase = require("firebase");
const crypto = require("crypto");

function create(firebase) {
  // Get a reference to the database service
  const database = firebase.database();

  const uuid = crypto.randomBytes(20).toString("hex");
  console.log(uuid);
  function writeUserData(userId, name, email, imageUrl) {
    firebase
      .database()
      .ref(`users/user-${userId}`)
      .set({
        username: name,
        email: email,
        profile_picture: imageUrl
      });
  }

  writeUserData(uuid, "Ugo", "ugo.arzur@gmail.com", "http://ugoarzur.fr");
}

module.exports = create;
