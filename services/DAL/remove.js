function all(firebase) {
  console.log(`:: Removing all users..`)
  return firebase
    .database()
    .ref()
    .remove()
}

function user(firebase, userId) {
  console.log(`:: Removing user ${userId}..`)
  return firebase
    .database()
    .ref(`${userId}/`)
    .remove()
}

module.exports = {
  all,
  user
}
