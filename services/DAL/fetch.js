function fetch(firebase, userId) {
  const goals = firebase
    .database()
    .ref(`app/${userId}`)
    .once('value')
    .then(goals => goals)
    .catch(error => {
      throw error
    })

  return goals
}

module.exports = fetch
