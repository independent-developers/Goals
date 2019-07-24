function all(firebase) {
  console.log(`:: Removing all users..`)
  return firebase
    .database()
    .ref(`app/`)
    .remove()
}

function user(firebase, userId) {
  console.log(`:: Removing user ${userId}..`)
  return firebase
    .database()
    .ref(`app/${userId}`)
    .remove()
}

module.exports = {
  all,
  user
}
