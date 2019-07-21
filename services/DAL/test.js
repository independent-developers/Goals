const firebase = require("firebase");
const crypto = require("crypto");

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyDkXlt712zMy45qyWpLW3ncTTUIE_p-H0w",
  authDomain: "goals-b8de5.firebaseapp.com",
  databaseURL: "https://goals-b8de5.firebaseio.com",
  projectId: "goals-b8de5",
  storageBucket: "goals-b8de5.appspot.com",
  messagingSenderId: "951154990757",
  appId: "1:951154990757:web:a671fd81863094c5"
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();


const uuid = crypto.randomBytes(20).toString("hex");
console.log(uuid)
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