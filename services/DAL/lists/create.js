const firebase = require("firebase");
const crypto = require("crypto");


function create(firebase, payload){
  const {
    name,
    email,
    imageUrl
  } = payload;
  const uuid = crypto.randomBytes(20).toString("hex");
  
  console.log('Creating a list in database..')
  return firebase
    .database()
    .ref(`lists/${uuid}`)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    }, (error) => {
      if(error) {
        console.log('An error occured while creating a list')
        throw error;
      }
      console.log('List created !')
    });
}



module.exports = create;