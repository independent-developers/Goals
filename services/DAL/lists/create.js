const firebase = require("firebase");
const crypto = require("crypto");


function create(firebase, payload){
  const {
    name,
    email,
    imageUrl
  } = payload;
  const uuid = crypto.randomBytes(20).toString("hex");
  
  console.log('Creating user..', payload)
  return firebase
    .database()
    .ref(`users/user-${uuid}`)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
}



module.exports = create;